import { Word } from '../types';
import { createElement } from './helpers/renderHelpers';

export class BookView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(res: Word[]) {
    console.log(res);

    const bookWrap = createElement('div', 'book-wrap');
    this.mainDiv.appendChild(bookWrap);
    const title = createElement('div', 'parallax-container valign-wrapper title-lang');
    title.innerHTML = `    <div class="section no-pad-bot">
    <div class="container">
        <h5 class="header center white-text h5-lang">Учебник</h5>
      </div>
    </div>
 
     <div class="parallax"><img src="assets/images/violet-1.jpg" alt="violet" class = "img-parallax"></div>`;

    bookWrap.appendChild(title);

    const section = createElement('div', 'section');
    bookWrap.appendChild(section);

    const row = createElement('div', 'row');
    section.appendChild(row);

    const levels = createElement('div', 'col s12 m2');
    row.appendChild(levels);

    this.renderLevels(levels);

    const cards = createElement('div', 'col s12 m8 cards');
    row.appendChild(cards);

    const games = createElement('div', 'col s12 m2');
    row.appendChild(games);

    const pagination = createElement('div', 'pagination');
    bookWrap.appendChild(pagination);

    const bottom = createElement('div', 'parallax-container valign-wrapper bottom-lang');
    bottom.innerHTML = `
     <div class="parallax"><img src="assets/images/violet-3.jpg" alt="violet" class = "img-parallax"></div>`;

    bookWrap.appendChild(bottom);

    M.AutoInit();
  }

  renderLevels(levels: HTMLElement) {
    const level1 = createElement('div', 'btn-large waves-effect waves-light grey lighten-3 z-depth-3 btn-lang');
    levels.appendChild(level1);
  }
}
