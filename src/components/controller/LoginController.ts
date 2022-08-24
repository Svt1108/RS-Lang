import { LoginView } from '../view/LoginView';
import { LoginModel } from '../model/LoginModel';

export class LoginController {
  view;
  model;

  constructor(mainDiv: HTMLElement) {
    this.view = new LoginView(mainDiv);
    this.model = new LoginModel();

    this.view.handleSignIn = this.handleSignIn.bind(this);
  }

  public show(route: 'login' | 'register') {
    if (route === 'login') {
      this.view.renderLogin();
    } else {
      this.view.renderRegister();
    }
  }

  private async handleSignIn(mail: string, pass: string) {
    const res = await this.model.sendSignIn(mail, pass);

    if (res.data) {
      this.model.saveLoginData(res.data, mail);
      window.location.hash = 'main';
    } else {
      this.view.showToast('You shall not pass!<br> Неверный логин/пароль');
    }
  }
}
