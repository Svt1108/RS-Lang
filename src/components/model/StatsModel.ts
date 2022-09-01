import { getUserStats, postUserStats } from './helpers/apiStats';
import { LoginData } from '../types/loginTypes';
import { Stats } from '../types/statsTypes';
import { WordPlusUserWord } from '../types';

class StatsModel {
  // BOOK_________________________________________
  public async addLearned() {
    const { id, token } = this.getStorageUserData();

    const newStats = await this.getOrCreateUserStats();

    const dateToday = this.createDateStr();
    newStats.optional.long[dateToday].learnedWords += 1;

    await postUserStats(id, token, newStats);
  }

  public async substractLearned({ optional }: WordPlusUserWord) {
    if (!optional) return;
    const { learnDate } = optional;
    const oldDateStr = this.createDateStr(learnDate);

    const stats = await this.getOrCreateUserStats();

    stats.optional.long[oldDateStr].learnedWords -= 1;
    const { id, token } = this.getStorageUserData();
    await postUserStats(id, token, stats);
  }

  // GAMES_Sprint_Audio_Phrase_____________________
  public async postWrong(oldWord?: WordPlusUserWord) {
    let dateStr: string; // oldDate / today
    let wordIsNew = true;

    const newStats = await this.getOrCreateUserStats();

    if (oldWord) {
      const { optional } = oldWord;
      if (!optional) return;
      const { learnDate, markedAsNew, learned } = optional;

      dateStr = this.createDateStr(learnDate); // oldDate
      if (markedAsNew) wordIsNew = false;
      if (learned === 'yes') newStats.optional.long[dateStr].learnedWords -= 1;
    } else {
      dateStr = this.createDateStr(); // today
      // wordIsNew = true;
    }

    const [game] = window.location.hash.slice(1).split('#');
    if (wordIsNew) {
      const dateToday = this.createDateStr(); // today
      newStats.optional.today[game].newWords += 1;
      newStats.optional.long[dateToday].newWords += 1;
    }
    newStats.optional.today[game].total += 1; // wins += 0

    const { id, token } = this.getStorageUserData();
    await postUserStats(id, token, newStats);
  }

  public async postCorrectLearned(oldWord?: WordPlusUserWord) {
    const dateToday = this.createDateStr(); // today
    let wordIsNew = true;

    if (oldWord) {
      const { optional } = oldWord;
      if (!optional) return;
      const { markedAsNew } = optional;

      if (markedAsNew) wordIsNew = false;
    }

    const newStats = await this.getOrCreateUserStats();

    newStats.optional.long[dateToday].learnedWords += 1; // Learned

    const [game] = window.location.hash.slice(1).split('#');
    if (wordIsNew) {
      newStats.optional.today[game].newWords += 1;
      newStats.optional.long[dateToday].newWords += 1;
    }
    newStats.optional.today[game].wins += 1;
    newStats.optional.today[game].total += 1;

    const { id, token } = this.getStorageUserData();
    await postUserStats(id, token, newStats);
  }

  public async postCorrect(oldWord?: WordPlusUserWord) {
    const dateToday = this.createDateStr(); // today
    let wordIsNew = true;

    if (oldWord) {
      const { optional } = oldWord;
      if (!optional) return;
      const { markedAsNew } = optional;

      if (markedAsNew) wordIsNew = false;
    }

    const newStats = await this.getOrCreateUserStats();

    const [game] = window.location.hash.slice(1).split('#');
    if (wordIsNew) {
      newStats.optional.today[game].newWords += 1;
      newStats.optional.long[dateToday].newWords += 1;
    }
    newStats.optional.today[game].wins += 1;
    newStats.optional.today[game].total += 1;

    const { id, token } = this.getStorageUserData();
    await postUserStats(id, token, newStats);
  }

  public async postBestSeries(num: number) {
    const stats = await this.getOrCreateUserStats();

    stats.optional.dateToday = this.createDateStr();
    const [game] = window.location.hash.slice(1).split('#');

    const max = Math.max(num, stats.optional.today[game].bestSeries);
    stats.optional.today[game].bestSeries = max;

    const { id, token } = this.getStorageUserData();
    await postUserStats(id, token, stats);
  }

  // PRIVATE_______________________________________
  private createDateStr(timestamp?: number) {
    let date: Date;
    if (timestamp) {
      date = new Date(timestamp);
    } else {
      date = new Date();
    }
    const year = `${date.getFullYear()}`.slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateKey = `${day}.${month}.${year}`;
    return dateKey;
  }

  private createDefaultStatsObj() {
    const dateStrToday = this.createDateStr();

    const defaultStats = {
      learnedWords: 0,
      optional: {
        dateToday: dateStrToday,
        today: {
          sprint: { newWords: 0, bestSeries: 0, wins: 0, total: 0 },
          audio: { newWords: 0, bestSeries: 0, wins: 0, total: 0 },
          phrase: { newWords: 0, bestSeries: 0, wins: 0, total: 0 },
        },
        long: {
          [dateStrToday]: { newWords: 0, learnedWords: 0 },
        },
      },
    };

    return defaultStats;
  }

  private getStorageUserData() {
    const userJSON = localStorage.getItem('user');
    const user = JSON.parse(`${userJSON}`) as LoginData;
    return user;
  }

  private async getOrCreateUserStats() {
    const { id, token } = this.getStorageUserData();
    const { stats } = await getUserStats(id, token);
    let newStats: Stats;
    if (stats) {
      newStats = stats;
      this.checkDateToDropDayStats(newStats);
    } else {
      newStats = this.createDefaultStatsObj();
    }

    return newStats;
  }

  private checkDateToDropDayStats(obj: Stats) {
    const stats = obj;
    const today = this.createDateStr();
    if (stats.optional.dateToday !== today) {
      stats.optional.today.sprint = { newWords: 0, bestSeries: 0, wins: 0, total: 0 };
      stats.optional.today.audio = { newWords: 0, bestSeries: 0, wins: 0, total: 0 };
      stats.optional.today.phrase = { newWords: 0, bestSeries: 0, wins: 0, total: 0 };
      stats.optional.long[today] = { newWords: 0, learnedWords: 0 };
    }
    stats.optional.dateToday = today;
  }
  // StatsView_______________________________________
  public async getStats() {
    const stats = await this.getOrCreateUserStats();
    return stats;
  }

  public getDefaultStats() {
    return this.createDefaultStatsObj();
  }
}

export const statsModel = new StatsModel();
