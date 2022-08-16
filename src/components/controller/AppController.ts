import { AppView } from '../view/AppView';
import { AppModel } from '../model/AppModel';
import { MainController } from './MainController';
import { createElement } from '../view/helpers/renderHelpers';

export class AppController {
  mainDiv;
  appView;
  appModel;
  main;

  constructor() {
    this.mainDiv = createElement('main');

    this.appView = new AppView(this.mainDiv);
    this.appModel = new AppModel();

    this.main = new MainController(this.mainDiv, this);
  }

  start() {
    const state = this.appModel.getState(); // { lastPage, isAuthorised }
    this.appView.render(state); // Header, Footer

    // SWITCH
    this.main.show();
  }
}
