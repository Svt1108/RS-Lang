import { UserData } from '../types/loginTypes';
import { LoginView } from '../view/LoginView';
import { LoginModel } from '../model/LoginModel';

export class LoginController {
  view;
  model;

  constructor(mainDiv: HTMLElement) {
    this.view = new LoginView(mainDiv);
    this.model = new LoginModel();

    this.view.handleSignIn = this.handleSignIn.bind(this);
    this.view.handleCreateUser = this.handleCreateUser.bind(this);
  }

  public show(route: 'login' | 'register') {
    if (route === 'login') {
      this.view.renderLogin();
    } else {
      this.view.renderRegistry();
    }
  }

  private async handleSignIn(mail: string, pass: string) {
    const res = await this.model.sendSignIn(mail, pass);
    console.log(res);

    if (res.data) {
      this.model.saveLoginData(res.data, mail);
      window.location.hash = 'main';
      this.view.showToast('Успешный вход в аккаунт :)');
    } else {
      this.view.showToast('Неверный логин/пароль :(');
    }
  }

  private async handleCreateUser(user: UserData) {
    const res = await this.model.sendCreateUser(user);
    console.log(res);

    if (res.data) {
      this.view.showToast('Успешная регистрация :)');
      await this.handleSignIn(user.mail, user.pass);
    } else {
      this.view.showToast('Этот E-mail уже зарегистрирован');
    }
  }
}
