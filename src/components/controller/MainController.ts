import { AppInstance } from '../types';
import { MainView } from '../view/MainView';

export class MainController {
  app;
  mainDiv;
  view;

  constructor(mainDiv: HTMLElement, appInstance: AppInstance) {
    this.mainDiv = mainDiv;
    this.app = appInstance;

    this.view = new MainView(mainDiv);
  }

  show() {
    this.view.render();
  }
  hide() {}
}
