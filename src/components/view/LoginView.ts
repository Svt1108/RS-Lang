export class LoginView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  renderLogin() {
    this.mainDiv.innerHTML = `
<div class="lang_login">
  <div class="lang_login_img_container lang_door"></div>

  <div class="lang_login_form_container">

    <div class="lang_login_heading">Уже с нами?<br>&<br>Войди в аккаунт!</div>

    <div class="row">
      <form class="col lang_login_form">

        <div class="row">

          <div class="input-field col s12 lang_login_input">
            <i class="grey-text text-darken-1 material-icons prefix">mail</i>
            <input id="mail" type="email" class="validate" name="mail" required>
            <label for="mail">e-mail *</label>
          </div>

          <div class="input-field col s12 lang_login_input lang_login_input_last">
            <i class="grey-text text-darken-1 material-icons prefix">vpn_key</i>
            <input id="pass" type="password" class="validate" name="pass" minlength="8" required>
            <label for="pass">пароль *</label>
          </div>

          <button class="btn waves-effect waves-green grey lighten-3 z-depth-3 btn-lang lang_login_btn" type="submit">ВОЙТИ
            <i class="material-icons right">check</i>
          </button>
          
        </div>
          
      </form>
    </div>
          
    <p>Впервые тут? <a class="red-text text-accent-4" href="#register">Зарегистрируйся!</a></p>

  </div>
</div>
    `;
  }

  renderRegister() {
    this.mainDiv.innerHTML = `
  <div class="lang_login">
    <div class="lang_login_img_container lang_telephone"></div>
  
    <div class="lang_login_form_container">
  
      <div class="lang_login_heading">Впервые тут?<br>&<br>Зарегистрируйся!</div>
  
      <div class="row">
        <form class="col lang_login_form">
  
          <div class="row">
  
            <div class="input-field col s12 lang_login_input">
              <i class="grey-text text-darken-1 material-icons prefix">person</i>
              <input id="name" type="text" class="validate" name="name">
              <label for="name">имя</label>
            </div>
  
            <div class="input-field col s12 lang_login_input">
              <i class="grey-text text-darken-1 material-icons prefix">mail</i>
              <input id="mail_2" type="email" class="validate" name="mail" required>
              <label for="mail_2">e-mail *</label>
            </div>
  
            <div class="input-field col s12 lang_login_input">
              <i class="grey-text text-darken-1 material-icons prefix">vpn_key</i>
              <input id="pass_2" type="password" class="validate" name="pass_2" minlength="8" required>
              <label for="pass_2">пароль (от 8 символов) *</label>
            </div>
  
            <div class="input-field col s12 lang_login_input lang_login_input_last">
              <i class="grey-text text-darken-1 material-icons prefix">vpn_key</i>
              <input id="pass_3" type="password" class="validate" name="pass_3" minlength="8" required>
              <label for="pass_3">повторить пароль *</label>
            </div>
  
            <button class="btn waves-effect waves-green grey lighten-3 z-depth-3 btn-lang lang_login_btn" type="submit">РЕГИСТРАЦИЯ
              <i class="material-icons right">check</i>
            </button>
            
          </div>
            
        </form>
      </div>
            
      <p>Уже с нами? <a class="red-text text-accent-4" href="#login">Войди в аккаунт!</a></p>
  
    </div>
  </div>
`;
  }
}
