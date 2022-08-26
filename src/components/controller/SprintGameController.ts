import { getWordsFromBook } from '../model/helpers/apiHelpers';
import { SprintGameModel } from '../model/SprintGameModel';
import { SprintGameView } from '../view/SprintGameView';

export class SprintGameController {
  view;
  model;

  constructor(main: HTMLElement) {
    this.view = new SprintGameView(main);
    this.model = new SprintGameModel();
  }
  
  async show(page?: number, level?: number) {
    if(page && level) {
    const data = await this.model.getGameData(page, level);
    this.view.render(data);
    } else {
    const data = await getWordsFromBook(0, 4);  
    this.view.render(data);
    }
  }

  stopSprintGame() {
    this.view.stopGame()
  }
}
