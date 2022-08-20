import { getWords } from './helpers/apiHelpers';

export class BookModel {
  async getBookWords(level = 1, page = 1) {
    const res = await getWords(level, page);
    return res;
  }
}
