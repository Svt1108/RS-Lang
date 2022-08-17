import { AppState } from '../types';
import { createElement } from './helpers/renderHelpers';

export class AppView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(stateObj: AppState) {
    const { lastPage } = stateObj;

    // const header = this.renderHeader();
    const header = createElement('div', 'header');
    header.innerHTML = this.renderHeader();
    // const footer = this.renderFooter();

    const footer = createElement('div', 'footer');
    footer.innerHTML = this.renderFooter();

    // зачем нужна эта строка?
    this.mainDiv.innerHTML = `<h1>AppView Render: Header, Main, Footer</h1><h3>Last PAGE = ${lastPage} </h3><h3>if lastPage = game -> hide Footer</h3>`;

    document.body.append(header, this.mainDiv, footer);
  }

  hideFooter() {}

  renderHeader() {
    return `<header >
    <ul id="dropdown1" class="dropdown-content">
    <li><a href="#!">Dictionary</a></li>
    <li><a href="#!">Games</a></li>
    <li class="divider"></li>
    <li><a href="#!">Statistics</a></li>
  </ul>
  <nav class = "teal darken-4 nav-lang">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">English train<i class="material-icons">train</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="sass.html">Login</a></li>
        <!-- Dropdown Trigger -->
        <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Menu<i class="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </div>
  </nav>
  </header>`;
  }

  renderFooter() {
    return `  <footer class="page-footer teal darken-4">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Company Bio</h5>
          <p class="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>


        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Settings</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Connect</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      Made by <a class="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>
      </div>
    </div>
  </footer>`;
  }
}
