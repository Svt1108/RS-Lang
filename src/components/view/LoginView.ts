export class LoginView {
  main;

  constructor(main: HTMLElement) {
    this.main = main;
  }

  renderLogin() {
    this.main.innerHTML = `<h1>Login</h1>
    <a href="#register">to Registry</a>`;
  }

  renderRegister() {
    this.main.innerHTML = `<h1>Registry</h1>
    <a href="#login">to Login</a>`;
  }
}
