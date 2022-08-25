import { getWords } from './helpers/apiHelpers';

export class SprintGameModel {
  async getGameData(page: number, level: number) {
    const res = await getWords(page, level);
    return res;
  }
}
