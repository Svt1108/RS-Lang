import { AppView } from '../view/AppView';
import { AppModel } from '../model/AppModel';
import { MainController } from './MainController';
import { BookController } from './BookController';
import { createElement } from '../view/helpers/renderHelpers';
import { Route } from '../types/appRoutes';
import { LoginController } from './LoginController';

export class AppController {
  mainDiv;
  appView;
  appModel;
  main;
  book;
  header?: HTMLElement | null;
  loader = createElement('div', 'progress');
  login;

  constructor() {
    this.mainDiv = createElement('main');

    this.appView = new AppView(this.mainDiv);
    this.appModel = new AppModel();

    this.main = new MainController(this.mainDiv);
    this.login = new LoginController(this.mainDiv);
    this.book = new BookController(this.mainDiv);
    // this.audio = new AudioGameController(this.mainDiv);
    // this.sprint = new SprintGameController(this.mainDiv);
    // this.drag = new DragAndDropController(this.mainDiv);
    // this.stats = new StatsController(this.mainDiv);
  }

  public async start() {
    const [route, level, page] = window.location.hash.slice(1).split('#');
    this.appView.render(route);

    // this.loader.init()
    this.header = document.querySelector('.header-lang');
    this.loader.innerHTML = '<div class="indeterminate"></div>';

    this.enableRouting();
    await this.renderNewPage([route, level, page]);
  }

  private enableRouting() {
    window.addEventListener('hashchange', () => {
      const [route, level, page] = window.location.hash.slice(1).split('#');
      this.renderNewPage([route, level, page]);
    });
  }

  private async renderNewPage([route, level = '', page = '']: string[]) {
    this.header?.append(this.loader);
    const status = await this.login.updateLoginStatus();
    this.appView.updateLoginBtnText(status);

    if (route === Route.main || route === '') {
      this.main.show();
      this.appView.showFooter();
    } else if (route === Route.login || route === Route.register) {
      this.login.show(route);
      this.appView.showFooter();
    } else if (route === Route.book) {
      if (level) {
        await this.book.show(Number(level), Number(page));
      } else {
        await this.book.show(0, 0);
      }
      this.appView.showFooter();
    } else if (route === Route.audio) {
      // level ?
      // await this.audio.show(Number(level), Number(page)) :
      // await this.audio.show();
      //
      this.appView.hideFooter();
    } else if (route === Route.sprint) {
      // level ?
      // await this.sprint.show(Number(level), Number(page)) :
      // await this.sprint.show();
      //
      this.appView.hideFooter();
    } else if (route === Route.drag) {
      // level ?
      // await this.drag.show(Number(level), Number(page)) :
      // await this.drag.show();
      //
      this.appView.hideFooter();
    } else if (route === Route.stats) {
      // await this.stats.show();
      this.appView.showFooter();
    } else {
      // await this.error.show();
      this.appView.showFooter();
    }
    this.loader.remove();
    document.documentElement.scrollTop = 0;
    M.AutoInit();
  }
}
