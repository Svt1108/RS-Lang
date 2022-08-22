export class LoginView {
  main;

  constructor(main: HTMLElement) {
    this.main = main;
  }

  renderLogin() {
    this.main.innerHTML = `
<div class="lang_login">
  <div class="lang_login_img_container">
    <img src="./assets/images/login-door.png" class="lang_login_img">
  </div>
  <div class="lang_login_form_container">
    <h2>FORM Title</h2>
    <form>FORM DIV</form>
  </div>
</div>
    `;
  }

  renderRegister() {
    this.main.innerHTML = `<h1>Registry</h1>
    <a href="#login">to Login</a>`;
  }
}
