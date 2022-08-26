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
    if(page !== undefined && level !== undefined) {   
    const data = await this.model.getGameData(level, page);
    this.view.render(data);
    } else {
    this.view.render();
    }
  }

  stopSprintGame() {
    this.view.stopGame()
  }
}
