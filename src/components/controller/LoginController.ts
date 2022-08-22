import { LoginView } from '../view/LoginView';

export class LoginController {
  view;

  constructor(main: HTMLElement) {
    this.view = new LoginView(main);
  }

  public show(route: 'login' | 'register') {
    if (route === 'login') {
      this.view.renderLogin();
    } else {
      this.view.renderRegister();
    }
  }
}
