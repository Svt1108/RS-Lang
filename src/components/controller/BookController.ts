import { BookView } from '../view/BookView';
import { BookModel } from '../model/BookModel';
import { UserWordPlus, Word, WordPlusUserWord } from '../types';
import { getAllUserWords, getWord } from '../model/helpers/apiHelpers';
import { LoginData } from '../types/loginTypes';
import { combineWords } from '../view/helpers/combineArr';

export class BookController {
  mainDiv;
  view: BookView;
  model: BookModel;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.model = new BookModel();
    this.view = new BookView(mainDiv);
  }

  async show(level?: number, page?: number) {
    const userJSON = localStorage.getItem('user');

    let res: Word[];

    if (userJSON) {
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (level === 6) {
        const userWordsTemp: UserWordPlus[] = await getAllUserWords((<LoginData>user).id, (<LoginData>user).token);
        const userWords = userWordsTemp.filter((item) => item.difficulty === 'difficult');
        userWords.sort((a, b) => b.optional.learnDate - a.optional.learnDate);
        const arr1 = await Promise.all(userWords.map((item) => getWord(item.wordId)));
        this.view.render(arr1, level, page, user);
      } else {
        res = await this.model.getBookWords(level, page);

        const userWords: UserWordPlus[] = await getAllUserWords((<LoginData>user).id, (<LoginData>user).token);
        const tempObj = combineWords(res, userWords);
        const userRes: WordPlusUserWord[] = tempObj.combinedArr;
        const learnAndDifficult: number = tempObj.num;

        this.view.render(userRes, level, page, user, learnAndDifficult);
      }
    } else {
      res = await this.model.getBookWords(level, page);
      this.view.render(res, level, page);
    }
  }
}
