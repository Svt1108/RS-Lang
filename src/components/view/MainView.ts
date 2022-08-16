// import { createElement } from './helpers/renderHelpers';

export class MainView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render() {
    this.mainDiv.innerHTML = 'I AM MAIN !';
    // const x = this.renderX
    // const y = this.renderY
    // this.mainDiv.append(x, y);
  }
}
