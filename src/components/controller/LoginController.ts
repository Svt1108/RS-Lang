import { LoginView } from '../view/LoginView';

export class LoginController {
  view;

  constructor(mainDiv: HTMLElement) {
    this.view = new LoginView(mainDiv);
  }

  public show(route: 'login' | 'register') {
    if (route === 'login') {
      this.view.renderLogin();
    } else {
      this.view.renderRegister();
    }
  }
}
