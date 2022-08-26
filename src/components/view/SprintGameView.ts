import { getRandomWords, HOST} from '../model/helpers/apiHelpers';
import {  Word } from '../types';
import { getMixWords } from './helpers/appMixWords';
import { createElement } from './helpers/renderHelpers';

export class SprintGameView {
  mainDiv: HTMLElement;
  stateGame: HTMLElement;
  sound: boolean;
  fullscreen: boolean;
  timeleft: number;
  points: number;
  pointsTotal: number;
  controlBlock: HTMLElement;
  pointsResult: number[];
  pointsTotalResult: number[];
  learnedWords: string[][];
  unlearnedWords: string[][];

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.stateGame = createElement('div', 'sprint_game-content');
    this.controlBlock = createElement('div', 'sprint_controll');
    this.sound = true;
    this.fullscreen = false;
    this.timeleft = 60;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
  }

  public render(data?: Word[]): void {
    this.controlBlock.innerHTML = '';
    this.sound = true;
    this.mainDiv.innerHTML = '';
    const sprint = createElement('div', 'sprint');
    const mainImg = <HTMLImageElement>createElement('img', 'img-sprint');
    const soundImg = createElement('div', 'sprint_sound');
    const fullscreenImg = createElement('div', 'sprint_fullscreen');
    const crossImg = createElement('div', 'sprint_cross');
    mainImg.src = './assets/images/bridge.jpg';

    fullscreenImg.onclick = () => {
      if (!this.fullscreen) {
        this.mainDiv.requestFullscreen();
        this.fullscreen = true;
      } else {
        document.exitFullscreen();
        this.fullscreen = false;
      }
    };

    soundImg.onclick = () => {
      if (this.sound) {
        this.sound = false;
        soundImg.classList.add('sprint_not-sound');
      } else {
        this.sound = true;
        soundImg.classList.remove('sprint_not-sound');
      }
      this.createSounds(this.sound);
    };

    crossImg.onclick = () => {
      window.location.hash = 'main';
      this.stopGame();
    };

    sprint.append(mainImg);
    this.controlBlock.appendChild(soundImg);
    this.controlBlock.append(fullscreenImg);
    this.controlBlock.appendChild(crossImg);
    this.mainDiv.append(this.controlBlock);
    this.mainDiv.append(sprint);
    if (data) this.mainDiv.append(this.startGameFromBook(data));
    else this.mainDiv.append(this.startGameFromMenu());
  }

  private startGameFromMenu(): HTMLElement {
    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const randomPageArr: number[] = [];
    const title: HTMLElement = createElement('h1', 'title-sprint h1-lang', 'Sprint');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-sprint h5-lang',
      'Попробуй угадать как можно больше слов за минуту',
    );
    const levelBlock: HTMLElement = createElement('div', 'level-sprint');

    while (randomPageArr.length < 15) {
      const randomPage = Math.floor(Math.random() * 29);
      if (!randomPageArr.includes(randomPage)) {
        randomPageArr.push(randomPage);
      }
    }

    const levelArr: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    // изменение цветов границ кнопок

    const classArr: string[] = [
      'waves-purple violet-border',
      'waves-yellow yellow-border',
      'waves-green green-border',
      'waves-teal blue-border',
      'waves-orange orange-border',
      'waves-red red-border',
    ];
    // const classArr: string[] = ['waves-purple', 'waves-yellow', 'waves-green',
    //                             'waves-teal', 'waves-orange','waves-red'];

    for (let i = 0; i <= 5; i += 1) {
      const btnLevel = createElement(
        'button',
        `sprint-level-btn z-depth-2 waves-effect ${classArr[i]}`,
        `${levelArr[i]}`,
      );

      btnLevel.onclick = async () => {
        const words = await getRandomWords(randomPageArr, i);
        this.stateGame.innerHTML = '';
        this.mainDiv.append(this.showGame(words));
      };

      levelBlock.append(btnLevel);
    }

    this.stateGame.append(title);
    this.stateGame.append(subTitle);
    this.stateGame.append(levelBlock);
    return this.stateGame;

  }

  private startGameFromBook(data: Word[]): HTMLElement {

    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const title: HTMLElement = createElement('h1', 'title-sprint', 'Sprint');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-sprint',
      'Попробуй угадать как можно больше слов за минуту',
    );

    const btnStart = createElement('button', `sprint-level-btn z-depth-1 waves-effect`, 
                       'начать');
    btnStart.onclick = () => {
      this.stateGame.innerHTML = '';
      this.showGame(data)
    }   

    this.stateGame.append(title);
    this.stateGame.append(subTitle);
    this.stateGame.append(btnStart);
    return this.stateGame;
  }
  private showGame(data: Word[]): HTMLElement {
    this.timeleft = 60;
    const mixData = getMixWords(data);
    const word = createElement('div', 'sprint_word card');
    const wordName = createElement('div', 'sprint_word-name');
    const audioBlock = createElement('i', 'tiny grey-text text-darken-2 material-icons volume-up sprint-audio', 'volume_up');
    const crowsBlock = createElement('div', 'sprint_crows');
    const points = createElement('div', 'sprint_points', `+${this.points} очков за слово`);
    const totalPoints = createElement('div', 'sprint_total-points', `${0}`);
    const blockBtn = createElement('div', 'sprint_btn-block');
    const timeBlock = createElement('div', 'sprint_time');
    const timeImg = createElement('div', 'sprint_clock');
    const seconds = createElement('div', 'sprint_seconds card', `:${this.timeleft}`);
    const btnRight = <HTMLButtonElement>(
      createElement('button', 'waves-effect waves-light btn right-sptint-btn', 'верно')
    );
    const btnWrong = <HTMLButtonElement>(
      createElement('button', 'waves-effect waves-light btn left-sptint-btn', 'неверно')
    );
    const crow1 = createElement('div', `sprint_crow`);
    const crow2 = createElement('div', `sprint_crow`);
    const crow3 = createElement('div', `sprint_crow`);
    const audio = new Audio()
    let index = 1;
    
    audio.src = `${HOST}/${mixData[0].audio}`
    audioBlock.onclick = () => {audio.play()}
    
    wordName.innerHTML = `${mixData[0].en}   -   ${mixData[0].ru}`;
    wordName.appendChild(audioBlock)

    const downloadTimer = setInterval(() => {
      seconds.innerHTML = `:${this.timeleft}`;
      if (this.timeleft <= 0) {
        this.endGame();
        clearInterval(downloadTimer);
      }
      this.timeleft -= 1;
    }, 1000);
   
    btnRight.onclick = async () => {
      console.log(index);
      
      if(index < mixData.length) {
      if(!mixData[index-1].match) {
        this.createSounds(this.sound, 'false');
        this.createWrongResult(data, mixData[index - 1].en);
        this.pointsTotalResult = [];
        this.points = 10;
        this.styleCrow([crow1, crow2, crow3], true);
        points.innerHTML = `+${this.points} очков за слово`;
      } else {
        this.createSounds(this.sound, 'true');
        this.createCorrectResult(data, mixData[index - 1].en);
        this.countResult(totalPoints, points);
        this.styleCrow([crow1, crow2, crow3]);
      }
    } 
    else this.endGame()
      wordName.innerHTML = `${mixData[index].en}   -   ${mixData[index].ru}`;
      wordName.appendChild(audioBlock)
      audio.src = `${HOST}/${mixData[index].audio}`
      index += 1;
    };

    btnWrong.onclick = () => {
      if(mixData[mixData.length]) this.endGame();
      if(!mixData[index-1].match) {
        this.createSounds(this.sound, 'true');
        this.createCorrectResult(data, mixData[index - 1].en);
        this.countResult(totalPoints, points);
        this.styleCrow([crow1, crow2, crow3]);
      } else {
        this.createSounds(this.sound, 'false');
        this.createWrongResult(data, mixData[index - 1].en);
        this.pointsTotalResult = [];
        this.points = 10;
        points.innerHTML = `+${this.points} очков за слово`;
        this.styleCrow([crow1, crow2, crow3], true);
      }

      wordName.innerHTML = `${mixData[index].en}   -   ${mixData[index].ru}`;
      wordName.appendChild(audioBlock)
      audio.src = `${HOST}/${mixData[index].audio}`
      index += 1;
    };

    crowsBlock.append(crow1);
    crowsBlock.append(crow2);
    crowsBlock.append(crow3);
    timeBlock.append(timeImg);
    timeBlock.append(seconds);
    blockBtn.append(btnWrong);
    blockBtn.append(btnRight);
    word.append(crowsBlock);
    word.append(points);
    word.append(wordName);
    this.stateGame.append(totalPoints);
    this.stateGame.append(timeBlock);
    this.stateGame.append(word);
    this.stateGame.append(blockBtn);
    return this.stateGame;
  }

  private endGame(): void {
    this.stateGame.innerHTML = '';
    const winBlock = createElement('div', 'sprint_over card');
    const showTotalRes = createElement('div', 'sprint_result');
    const showExperience = createElement('div', 'sprint_show-resultexperience');
    const gameOver = <HTMLAudioElement>new Audio('../../assets/images/audio/over.mp3');
    const learnWords = createElement('ul', 'sprint_list-words');
    const unlearnWords = createElement('ul', 'sprint_list-words');
    const headerBlock = createElement('div', 'sprint_header-result');
    const allWords = createElement('ul', 'sprint_all-words');
    const headerListLerned = createElement(
      'div',
      'sprint_header-learn',
      `Изученные слова - ${this.learnedWords.length}`,
    );
    const headerListUnlerned = createElement(
      'div',
      'sprint_header-unlearn',
      `Слова с ошибками - ${this.unlearnedWords.length}`,
    );
    showTotalRes.innerHTML = `Набрано ${this.pointsTotal} очков`;
    showExperience.innerHTML = `Получено +${this.learnedWords.length + this.unlearnedWords.length} опыта`;
    const blockBtn = createElement('div', 'sprint_btn-block-over');
    const moreGame = createElement('button', 'waves-effect waves-light btn right-sptint-btn end', 'сыграть еще раз');
    const endGame = createElement('button', 'waves-effect waves-light btn left-sptint-btn end', 'перейти в учебник');
    gameOver.pause();
    

    if (this.learnedWords.length) {
      Promise.all(this.learnedWords).then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          const audio = new Audio()
          const audioBlock = createElement('i', 
            'tiny grey-text text-darken-2 material-icons volume-up sprint-audio', 'volume_up');
          audioBlock.onclick = () => {audio.play()}
          const list = createElement('li', 'sprint_list', 
            `${res[i][0]} ${res[i][1]} - ${res[i][2]}`)       
          audio.src = `${HOST}/${res[i][3]}`
          list.append(audioBlock)    
          learnWords.append(list)
        }
      })
    } 
    
    if(this.unlearnedWords.length) {
      Promise.all(this.unlearnedWords).then(res => {
        for (let i = 0; i < res.length; i += 1) {
          const audio = new Audio()
          const audioBlock = createElement('i', 
            'tiny grey-text text-darken-2 material-icons volume-up sprint-audio', 'volume_up');
          audioBlock.onclick = () => {audio.play()}
          const list = createElement('li', 'sprint_list', 
            `${res[i][0]} ${res[i][1]} - ${res[i][2]}`)
          audio.src = `${HOST}/${res[i][3]}`  
          list.append(audioBlock) 
          unlearnWords.append(list)
        }
      })
    }
    
    moreGame.onclick = () => {this.startGameFromMenu()}
    endGame.onclick = () => {
      window.location.hash = 'book';
      this.stopGame();
    };
    if (this.sound) gameOver.play();

    blockBtn.append(endGame);
    blockBtn.append(moreGame);
    headerBlock.append(showTotalRes);
    headerBlock.append(showExperience);
    winBlock.append(headerBlock);
    learnWords.append(headerListLerned);
    unlearnWords.append(headerListUnlerned);
    allWords.append(unlearnWords);
    allWords.append(learnWords);
    winBlock.append(allWords);
    winBlock.append(blockBtn);
    this.stateGame.append(winBlock);
  }

  private createCorrectResult(data: Word[], word: string): void {
    data.filter((el) =>
      el.word === word ? this.learnedWords.push([el.word, el.transcription, el.wordTranslate, el.audio]) : [],
    );
  }

  private createWrongResult(data: Word[], word: string): void {
    data.filter((el) =>
      el.word === word ? this.unlearnedWords.push([el.word, el.transcription, el.wordTranslate, el.audio]) : [],
    );
  }

  private createSounds(sound: boolean, flag?: string): void {
    const rightAnswer: HTMLAudioElement = new Audio('../../assets/images/audio/cool.mp3');
    const wrongAnswer: HTMLAudioElement = new Audio('../../assets/images/audio/bug.mp3');
    if (!sound) {
      rightAnswer.pause();
      wrongAnswer.pause();
    } else {
      if (flag === 'true') rightAnswer.play();
      if (flag === 'false') wrongAnswer.play();
    }
  }

  private styleCrow(crowArr: HTMLElement[], removeClass?: boolean): void {
    if (removeClass) {
      crowArr.forEach((el) => el.classList.remove('active'));
      this.pointsResult = [];
    } else {
      if (this.pointsResult.length) crowArr[this.pointsResult.length - 1].classList.add('active');
      if (this.pointsResult.length === 1) {
        crowArr.forEach((el) => el.classList.remove('active'));
        crowArr[this.pointsResult.length - 1].classList.add('active');
      }
    }
  }

  private countResult(totalPointsDiv: HTMLElement, pointsDiv: HTMLElement): void {
    const totalPoints = totalPointsDiv;
    const points = pointsDiv;

    if (this.pointsResult.length >= 3) this.pointsResult = [];
    this.pointsTotalResult.push(this.points);
    this.pointsTotal += this.points;

    if (this.pointsTotalResult.length === 3) this.points = 20;
    if (this.pointsTotalResult.length === 6) this.points = 40;
    if (this.pointsTotalResult.length === 9) this.points = 80;

    totalPoints.innerHTML = `${this.pointsTotal}`;
    this.pointsResult.push(this.points);
    points.innerHTML = `+${this.points} очков за слово`;
  }

  stopGame() {
    this.sound = false;
    this.fullscreen = false;
    this.timeleft = 60;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
    if(document.fullscreenElement) document.exitFullscreen();
  }
}

// const start = <HTMLButtonElement>createElement('button', 'waves-effect waves-light btn-large start', 'Начать');
// start.disabled = true;
// start.onclick = async () => {
//   this.stateGame.innerHTML = '';
//   const words = await getWords(0, level[level.length - 1]);
//   this.mainDiv.append(this.showGame(words));
// };
