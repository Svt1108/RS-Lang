import { AudioGameModel } from '../model/AudioGameModel';
import { getAllUserWords, getWord } from '../model/helpers/apiHelpers';
import { UserWordPlus } from '../types';
import { LoginData } from '../types/loginTypes';
import { AudioGameView } from '../view/AudioGameView';

export class AudioGameController {
  view;
  model;

  constructor(main: HTMLElement) {
    this.view = new AudioGameView(main);
    this.model = new AudioGameModel();
  }
  
  async show(level?: number, page?: number) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if(page !== undefined && level !== undefined) {   
    const data = await this.model.getGameData(page, level);
    this.view.render(data);
    } 
    if(level === 6) {
      const userWordsTemp: UserWordPlus[] = await getAllUserWords((<LoginData>user).id, (<LoginData>user).token);
      const userWords = userWordsTemp.filter((item) => item.difficulty === 'difficult');
      const data = await Promise.all(userWords.map((item) => getWord(item.wordId)));
      this.view.render(data);
    }
    else {
    this.view.render();
    }
  }

  // stopAudioGame() {
  //   this.view.stopGame()
  // }
}
