// import { AppState } from '../types';
import { createElement } from './helpers/renderHelpers';

export class AppView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(page: string) {
    console.log(page);

    // const header = this.renderHeader();
    const header = createElement('div', 'header');
    header.innerHTML = this.renderHeader();
    // const footer = this.renderFooter();

    const footer = createElement('div', 'footer');
    footer.innerHTML = this.renderFooter();

    document.body.append(header, this.mainDiv, footer);
  }

  hideFooter() {}
  showFooter() {}

  renderHeader() {
    return `<header class = "header-lang">
    <ul id="dropdown1" class="dropdown-content">
    <li><a href="#!">На главную</a></li>
    <li class="divider"></li>
    <li><a href="#!">Словарь</a></li>
    <li class="divider"></li>
    <li><a href="#!">Игры</a></li>
    <li class="divider"></li>
    <li><a href="#!">Статистика</a></li>
  </ul>
  <nav class = "nav-lang">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo logo-lang"></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="sass.html">Login</a></li>
        <!-- Dropdown Trigger -->
        <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Меню<i class="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </div>
  </nav>
  </header>`;
  }

  renderFooter() {
    return `<footer class="page-footer page-footer-lang">
    <span id="contacts"></span>
    <div class="footer-copyright">
        <div class="container">
            <a href="https://rs.school/js/" class="grey-text text-lighten-4 left">
                <div class="page-footer__logo"></div>
            </a>
            <div class="page-footer__github-wrap right">
            <a href="https://github.com/Svt1108">
            <div class="page-footer__github"></div>
        </a>
        <p>Alexander Krasovskiy</p>
            <a href="https://github.com/Svt1108">
            <div class="page-footer__github"></div>
        </a>
        <p>Alla Tkachuk</p>
                <a href="https://github.com/Svt1108">
                    <div class="page-footer__github"></div>
                </a>
                <p>Svetlana Pozina, 2022</p>
            </div>
        </div>
    </div>
</footer>`;
  }
}
