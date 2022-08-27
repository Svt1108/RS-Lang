import { getAllUserWords, getWord } from '../model/helpers/apiHelpers';
import { SprintGameModel } from '../model/SprintGameModel';
import { UserWordPlus } from '../types';
import { LoginData } from '../types/loginTypes';
import { SprintGameView } from '../view/SprintGameView';

export class SprintGameController {
  view;
  model;

  constructor(main: HTMLElement) {
    this.view = new SprintGameView(main);
    this.model = new SprintGameModel();
  }
  
  async show(level?: number, page?: number) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if(page !== undefined && level !== undefined) { 
      if(level === 6) {
        const userWordsTemp: UserWordPlus[] = await getAllUserWords((<LoginData>user).id, (<LoginData>user).token);
        const userWords = userWordsTemp.filter((item) => item.difficulty === 'difficult');
        const data = await Promise.all(userWords.map((item) => getWord(item.wordId)));
        this.view.render(data);
      } 
      else {
      const data = await this.model.getGameData(page, level);
      this.view.render(data);
      }
    } 
    else {
    this.view.render();
    }
  }

  stopGame() {
    this.view.stopGame()
  }
}
