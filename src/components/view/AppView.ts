import { createElement } from './helpers/renderHelpers';
import { renderHeader, renderFooter } from './helpers/appRenderHelpers';

export class AppView {
  header;
  main;
  footer;
  loginBtn?: HTMLElement | null;

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

    this.loginBtn = this.header.querySelector('#lang_login_btn') as HTMLElement;
    this.loginBtn.onclick = (e) => this.handleExitClick(e);
  }

  public updateLoginBtnText(loginStatus: { logged: boolean; kicked: boolean }) {
    if (this.loginBtn && loginStatus.logged) {
      this.loginBtn.innerText = 'Выйти';
    } else if (this.loginBtn) {
      this.loginBtn.innerText = 'Вход';
    }
  }

  private handleExitClick(e: Event) {
    let { innerText } = this.loginBtn as HTMLElement;
    if (innerText === 'Выйти') {
      e.preventDefault();
      localStorage.removeItem('user');
      innerText = 'Вход';
      window.location.hash = '';
      M.toast({ html: 'Уже уходишь? Очень жаль :(' });
    }
  }

  public hideFooter() {
    this.footer.style.display = 'none';
  }
  public showFooter() {
    this.footer.style.display = 'block';
  }
}
