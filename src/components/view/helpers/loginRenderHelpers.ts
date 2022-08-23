import { createElement } from './renderHelpers';

export const createHeading = (firstLine: string, secondLine: string) => {
  const heading = createElement('div', 'lang_login_heading');
  heading.innerHTML = `${firstLine}<br>&<br>${secondLine}`;
  return heading;
};

export const createParagraphWithLink = (simpleText: string, linkText: string) => {
  const p = createElement('p');
  p.innerHTML = `${simpleText} <a class="red-text text-accent-4" href="#register">${linkText}</a>`;
  return p;
};

export const createLoginFormContent = () => {
  const row = createElement('div', 'row');
  row.innerHTML = `
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

  <button class="btn waves-effect waves-green grey lighten-3 z-depth-3 btn-lang lang_login_btn" type="submit">
    ВОЙТИ
    <i class="material-icons right">check</i>
  </button>
  `;
  return row;
};
