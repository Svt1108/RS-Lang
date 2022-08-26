import { BookView } from '../view/BookView';
import { BookModel } from '../model/BookModel';
import { Word } from '../types';

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

    // const user = JSON.parse(localStorage.getItem('user') as string); // если его нет, то вернется NULL
    // поэтому можно писать
    let res: Word[];

    if (userJSON) {
      const user = JSON.parse(localStorage.getItem('user') as string);
      res = await this.model.getBookWords(level, page);
      this.view.render(res, level, page, user);
      // console.log(user.id);
      // console.log(user.token);
    } else {
      res = await this.model.getBookWords(level, page);
      this.view.render(res, level, page);
    }
  }
}
