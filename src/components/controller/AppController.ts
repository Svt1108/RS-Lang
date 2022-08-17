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
    // this.stats = new StatsController(this.mainDiv);
  }

  public start() {
    const [page, num] = window.location.hash.slice(1).split('#'); // [page, num] // [ '', undefined ]
    this.appView.render(page); // for footer display

    this.renderNewPage([page, num]);
    this.enableRouting();
  }

  private enableRouting() {
    window.addEventListener('hashchange', () => {
      const [page, num] = window.location.hash.slice(1).split('#');
      this.renderNewPage([page, num]);
    });
  }

  private renderNewPage([page, num = '']: string[]) {
    this.mainDiv.innerHTML = '';
    console.log('del log from AppController', num);

    if (page === 'main' || page === '') {
      this.main.show();
      this.appView.showFooter();
    } else if (page === 'auth') {
      // this.auth.show();
      this.appView.showFooter();
    } else if (page === 'book') {
      // num ?
      // this.book.show(Number(num)) :
      // this.book.show();
      //
      // this.appView.showFooter();
    } else if (page === 'audio') {
      // num ?
      // this.audio.showGame(Number(num)) :
      // this.audio.showSettings();
      //
      // this.appView.hideFooter();
    } else if (page === 'sprint') {
      // num ?
      // this.sprint.showGame(Number(num)) :
      // this.sprint.showSettings();
      //
      // this.appView.hideFooter();
    } else if (page === 'stats') {
      // this.stats.show();
      // this.appView.showFooter();
    } else {
      // this.error.show();
      // this.appView.showFooter();
    }
  }
}
