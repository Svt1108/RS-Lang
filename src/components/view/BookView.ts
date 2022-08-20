import { Word } from '../types';
import { createElement } from './helpers/renderHelpers';

export class BookView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(res: Word[]) {
    console.log(res);

    const bookWrap = createElement('div', 'book-wrap', '', 'book-wrap');
    this.mainDiv.appendChild(bookWrap);
    const title = createElement('div', 'parallax-container valign-wrapper title-lang');
    title.innerHTML = `    <div class="section no-pad-bot">
    <div class="container">
        <h5 class="header center white-text h5-lang">Учебник</h5>
      </div>
    </div>
 
     <div class="parallax"><img src="assets/images/violet-1.jpg" alt="violet" class = "img-parallax" id = "img-1"></div>`;

    bookWrap.appendChild(title);

    const section = createElement('div', 'section');
    bookWrap.appendChild(section);

    const row = createElement('div', 'row');
    section.appendChild(row);

    const levels = createElement('div', 'col s12 m2 levels');
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
     <div class="parallax"><img src="assets/images/violet-3.jpg" alt="violet" class = "img-parallax" id = "img-3"></div>`;

    bookWrap.appendChild(bottom);
  }

  renderLevels(levels: HTMLElement) {
    const levelsTitle = createElement('h6', 'levels-title center', 'Разделы');
    levels.appendChild(levelsTitle);

    const level0 = createElement('div', 'level-btn z-depth-1 waves-effect waves-purple', 'Level 0');
    level0.style.border = `solid 1px #7851A9`;
    levels.appendChild(level0);
    level0.onclick = () => this.switchImages(0);

    const level1 = createElement('div', 'level-btn z-depth-1 waves-effect waves-yellow', 'Level 1');
    level1.style.border = `solid 1px #F0E891`;
    levels.appendChild(level1);
    level1.onclick = () => this.switchImages(1);

    const level2 = createElement('div', 'level-btn z-depth-1 waves-effect waves-green', 'Level 2');
    level2.style.border = `solid 1px #317F43`;
    levels.appendChild(level2);
    level2.onclick = () => this.switchImages(2);

    const level3 = createElement('div', 'level-btn z-depth-1 waves-effect waves-teal', 'Level 3');
    level3.style.border = `solid 1px #1CA9C9`;
    levels.appendChild(level3);
    level3.onclick = () => this.switchImages(3);

    const level4 = createElement('div', 'level-btn z-depth-1 waves-effect waves-orange', 'Level 4');
    level4.style.border = `solid 1px #F9991A`;
    levels.appendChild(level4);
    level4.onclick = () => this.switchImages(4);

    const level5 = createElement('div', 'level-btn z-depth-1 waves-effect waves-red', 'Level 5');
    level5.style.border = `solid 1px #9B111E`;
    levels.appendChild(level5);
    level5.onclick = () => this.switchImages(5);

    const level6 = createElement('div', 'level-btn z-depth-1 waves-effect waves-light', 'Level 6');
    level6.style.border = `solid 1px #FCFCFD`;
    levels.appendChild(level6);
    level6.onclick = () => this.switchImages(6);
  }

  switchImages(level: number) {
    let color = '';
    const picture1 = document.getElementById('img-1') as HTMLImageElement;
    const picture3 = document.getElementById('img-3') as HTMLImageElement;
    const bookWrap = document.getElementById('book-wrap') as HTMLElement;

    if (level === 0) color = 'violet';
    if (level === 1) color = 'yellow';
    if (level === 2) color = 'green';
    if (level === 3) color = 'blue';
    if (level === 4) color = 'orange';
    if (level === 5) color = 'red';
    if (level === 6) color = 'white';

    picture1.src = `assets/images/${color}-1.jpg`;
    picture3.src = `assets/images/${color}-3.jpg`;
    bookWrap.style.backgroundImage = `url(../assets/images/${color}-2.jpg)`;
  }
}
