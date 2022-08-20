import { BookView } from '../view/BookView';
import { BookModel } from '../model/BookModel';

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
    const res = await this.model.getBookWords(level, page);
    this.view.render(res);
  }
}
