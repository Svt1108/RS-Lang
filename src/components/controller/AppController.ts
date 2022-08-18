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

    this.main = new MainController(this.mainDiv);
    // this.auth = new AuthController(this.mainDiv);
    // this.book = new BookController(this.mainDiv);
    // this.audio = new AudioGameController(this.mainDiv);
    // this.sprint = new SprintGameController(this.mainDiv);
    // this.drag = new DragAndDropController(this.mainDiv);
    // this.stats = new StatsController(this.mainDiv);
  }

  public start() {
    const [route, difficulty, page] = window.location.hash.slice(1).split('#');
    // simple - ['auth', undefined, undefined]
    // game - ['sprint', '3', undefined]
    // book - ['book', '2', '19']
    this.appView.render(route);

    this.renderNewPage([route, difficulty, page]);
    this.enableRouting();
  }

  private enableRouting() {
    window.addEventListener('hashchange', () => {
      const [route, difficulty, page] = window.location.hash.slice(1).split('#');
      this.renderNewPage([route, difficulty, page]);
    });
  }

  private renderNewPage([route, difficulty = '', page = '']: string[]) {
    this.mainDiv.innerHTML = '';
    console.log('del log from AppController', difficulty, page);

    if (route === 'main' || route === '') {
      this.main.show();
      this.appView.showFooter();
    } else if (route === 'auth') {
      // this.auth.show();
      this.appView.showFooter();
    } else if (route === 'book') {
      // difficulty ?
      // this.book.show(Number(difficulty), Number(page)) :
      // this.book.show();
      //
      // this.appView.showFooter();
    } else if (route === 'audio') {
      // difficulty ?
      // this.audio.show(Number(difficulty)) :
      // this.audio.show();
      //
      // this.appView.hideFooter();
    } else if (route === 'sprint') {
      // difficulty ?
      // this.sprint.show(Number(difficulty)) :
      // this.sprint.show();
      //
      // this.appView.hideFooter();
    } else if (route === 'drag') {
      // difficulty ?
      // this.drag.showGame(Number(difficulty)) :
      // this.drag.showSettings();
      //
      // this.appView.hideFooter();
    } else if (route === 'stats') {
      // this.stats.show();
      // this.appView.showFooter();
    } else {
      // this.error.show();
      // this.appView.showFooter();
    }
  }
}
