import { createElement } from './helpers/renderHelpers';
import { createHeading, createParagraphWithLink, createLoginFormContent } from './helpers/loginRenderHelpers';

export class LoginView {
  mainDiv;
  form?: HTMLFormElement;
  handleSignIn?: (mail: string, pass: string) => Promise<void>;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  public renderLogin() {
    const loginPageDiv = createElement('div', 'lang_login');
    const imgContainer = createElement('div', 'lang_login_img_container lang_door');
    const formContainer = createElement('div', 'lang_login_form_container');
    loginPageDiv.append(imgContainer, formContainer);

    const heading = createHeading('Уже с нами?', 'Войди в аккаунт!');
    const row = createElement('div', 'row');
    const linkText = createParagraphWithLink('Впервые тут?', 'Зарегистрируйся!');
    formContainer.append(heading, row, linkText);

    this.form = createElement('form', 'col lang_login_form') as HTMLFormElement;
    const formContent = createLoginFormContent();
    this.form.append(formContent);
    row.append(this.form);

    this.form.onsubmit = (e) => this.handleLogin(e);

    this.mainDiv.innerHTML = '';
    this.mainDiv.append(loginPageDiv);
  }

  private async handleLogin(e: Event) {
    e.preventDefault();
    const formData = new FormData(this.form);

    const mail = formData.get('mail');
    const pass = formData.get('pass');

    await this.handleSignIn?.(`${mail}`, `${pass}`);
  }

  public showToast(text: string) {
    M.toast({ html: text });
  }

  public renderRegister() {
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
              <input id="pass_1" type="password" class="validate" name="pass_1" minlength="8" required>
              <label for="pass_1">пароль (от 8 символов) *</label>
            </div>
  
            <div class="input-field col s12 lang_login_input lang_login_input_last">
              <i class="grey-text text-darken-1 material-icons prefix">vpn_key</i>
              <input id="pass_2" type="password" class="validate" name="pass_2" minlength="8" required>
              <label for="pass_2">повторить пароль *</label>
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
