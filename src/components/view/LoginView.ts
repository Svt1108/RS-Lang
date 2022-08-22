export class LoginView {
  main;

  constructor(main: HTMLElement) {
    this.main = main;
  }

  renderLogin() {
    this.main.innerHTML = `
<div class="lang_login">
  <div class="lang_login_img_container"></div>

  <div class="lang_login_form_container">

    <div class="lang_login_heading">Уже с нами?<br>&<br>Войди в аккаунт!</div>

    <div class="row">
      <form class="col lang_login_form">

        <div class="row">

          <div class="input-field col s12 lang_login_input">
            <i class="grey-text text-darken-1 material-icons prefix">person</i>
            <input id="name" type="text" class="validate">
            <label for="name">имя</label>
          </div>

          <div class="input-field col s12 lang_login_input">
            <i class="grey-text text-darken-1 material-icons prefix">mail</i>
            <input id="email" type="email" class="validate">
            <label for="email">e-mail *</label>
          </div>

          <div class="input-field col s12 lang_login_input">
            <i class="grey-text text-darken-1 material-icons prefix">vpn_key</i>
            <input id="password" type="password" class="validate">
            <label for="password">пароль *</label>
          </div>

          <div class="input-field col s12 lang_login_input">
            <i class="grey-text text-darken-1 material-icons prefix">vpn_key</i>
            <input id="password" type="password" class="validate">
            <label for="password">подтвердите пароль *</label>
          </div>

          <button class="teal darken-3 amber-text text-lighten-5 btn waves-effect waves-teal" type="submit" name="action">ВОЙТИ
            <i class="material-icons right">check</i>
          </button>
          
        </div>

      </form>
    </div>

  </div>
</div>
    `;
  }

  renderRegister() {
    this.main.innerHTML = `<h1>Registry</h1>
    <a href="#login">to Login</a>`;
  }
}

// class="lang_login_form"
// teal darken-4 amber-text text-lighten-5
// <h2 class="lang_login_heading">Уже с нами?</h2>
// <h2 class="lang_login_heading">&</h2>
// <h2 class="lang_login_heading">Войди в аккаунт!</h2>
