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
    return `<header class = "header">
    <nav class="indigo darken-4" role="navigation">
    <div class="nav-wrapper container">
      <a id="logo-container" href="#" class="brand-logo">English train<i class="material-icons">train</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="#">Navbar Link</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
  </header>`;
  }

  renderFooter() {
    return `  <footer class="page-footer teal">
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
