// import { AppState } from '../types';
import { createElement, renderHeader, renderFooter } from './helpers/renderHelpers';

export class AppView {
  header;
  main;
  footer;

  constructor(main: HTMLElement) {
    this.header = createElement('header', 'header');
    this.main = main;
    this.footer = createElement('footer', 'footer');
  }

  public render(route: string) {
    this.header.innerHTML = renderHeader();
    this.footer.innerHTML = renderFooter();

    const gamesList = ['audio', 'sprint', 'drag'];
    if (gamesList.includes(route)) {
      this.hideFooter();
    }

    document.body.append(this.header, this.main, this.footer);
  }

  public hideFooter() {
    this.footer.style.display = 'none';
  }
  public showFooter() {
    this.footer.style.display = 'block';
  }
}
