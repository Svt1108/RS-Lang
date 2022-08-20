import { AppView } from '../view/AppView';
import { AppModel } from '../model/AppModel';
import { MainController } from './MainController';
import { BookController } from './BookController';
import { createElement } from '../view/helpers/renderHelpers';

export class AppController {
  mainDiv;
  appView;
  appModel;
  main;
  book;

  constructor() {
    this.mainDiv = createElement('main');

    this.appView = new AppView(this.mainDiv);
    this.appModel = new AppModel();

    this.main = new MainController(this.mainDiv);
    // this.auth = new AuthController(this.mainDiv);
    this.book = new BookController(this.mainDiv);
    // this.audio = new AudioGameController(this.mainDiv);
    // this.sprint = new SprintGameController(this.mainDiv);
    // this.drag = new DragAndDropController(this.mainDiv);
    // this.stats = new StatsController(this.mainDiv);
  }

  public start() {
    const [route, level, page] = window.location.hash.slice(1).split('#');
    // simple - ['stats', undefined, undefined]
    // game - ['sprint', '3', undefined]
    // book - ['book', '2', '19']
    this.appView.render(route);

    this.renderNewPage([route, level, page]);
    this.enableRouting();
  }

  private enableRouting() {
    window.addEventListener('hashchange', () => {
      const [route, level, page] = window.location.hash.slice(1).split('#');
      this.renderNewPage([route, level, page]);
    });
  }

  private renderNewPage([route, level = '', page = '']: string[]) {
    this.mainDiv.innerHTML = '';
    console.log('del log from AppController', route, level, page);

    if (route === 'main' || route === '') {
      this.main.show();
      this.appView.showFooter();
    } else if (route === 'auth') {
      // this.auth.show();
      this.appView.showFooter();
    } else if (route === 'book') {
      if (level) this.book.show(Number(level), Number(page));
      else this.book.show();
      this.appView.showFooter();
    } else if (route === 'audio') {
      // level ?
      // this.audio.show(Number(level)) :
      // this.audio.show();
      //
      this.appView.hideFooter();
    } else if (route === 'sprint') {
      // level ?
      // this.sprint.show(Number(level)) :
      // this.sprint.show();
      //
      this.appView.hideFooter();
    } else if (route === 'drag') {
      // level ?
      // this.drag.showGame(Number(level)) :
      // this.drag.showSettings();
      //
      this.appView.hideFooter();
    } else if (route === 'stats') {
      // this.stats.show();
      this.appView.showFooter();
    } else {
      // this.error.show();
      this.appView.showFooter();
    }
    M.AutoInit();
  }
}
