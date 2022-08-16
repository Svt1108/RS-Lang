import { AppState } from '../types';
// import { createElement } from './helpers/renderHelpers';

export class AppView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(stateObj: AppState) {
    const { lastPage } = stateObj;

    const header = this.renderHeader();
    const footer = this.renderFooter();
    this.mainDiv.innerHTML = `<h1>AppView Render: Header, Main, Footer</h1><h3>Last PAGE = ${lastPage} </h3><h3>if lastPage = game -> hide Footer</h3>`;

    document.body.append(header, this.mainDiv, footer);
  }

  hideFooter() {}

  renderHeader() {
    return '<header>HEADER</header>';
  }

  renderFooter() {
    return '<footer>FOOTER</footer>';
  }
}
