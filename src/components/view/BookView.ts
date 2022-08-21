import { Word } from '../types';
import Card from './CardView';
import { createElement } from './helpers/renderHelpers';

export class BookView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(res: Word[]) {
    console.log(res);
    this.mainDiv.innerHTML = '';

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

    const cardsWrap = createElement('div', 'col s12 m8');
    row.appendChild(cardsWrap);

    const cards = createElement('div', 'cards');
    cardsWrap.appendChild(cards);
    this.renderCards(cards, res);

    const games = createElement('div', 'col s12 m2 games');
    row.appendChild(games);
    this.renderGames(games);

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

    const level0 = createElement('div', 'level-btn z-depth-1 waves-effect waves-purple', 'LEVEL 0');
    level0.style.border = `solid 1px #7851A9`;
    level0.style.borderLeft = `solid 3px #7851A9`;
    levels.appendChild(level0);
    level0.onclick = () => this.switchImages(0);

    const level1 = createElement('div', 'level-btn z-depth-1 waves-effect waves-yellow', 'LEVEL 1');
    level1.style.border = `solid 1px #F0E891`;
    level1.style.borderLeft = `solid 3px #F0E891`;
    levels.appendChild(level1);
    level1.onclick = () => this.switchImages(1);

    const level2 = createElement('div', 'level-btn z-depth-1 waves-effect waves-green', 'LEVEL 2');
    level2.style.border = `solid 1px #386646`;
    level2.style.borderLeft = `solid 3px #386646`;
    levels.appendChild(level2);
    level2.onclick = () => this.switchImages(2);

    const level3 = createElement('div', 'level-btn z-depth-1 waves-effect waves-teal', 'LEVEL 3');
    level3.style.border = `solid 1px #4169E1`;
    level3.style.borderLeft = `solid 3px #4169E1`;
    levels.appendChild(level3);
    level3.onclick = () => this.switchImages(3);

    const level4 = createElement('div', 'level-btn z-depth-1 waves-effect waves-orange', 'LEVEL 4');
    level4.style.border = `solid 1px #DEB768`;
    level4.style.borderLeft = `solid 3px #DEB768`;
    levels.appendChild(level4);
    level4.onclick = () => this.switchImages(4);

    const level5 = createElement('div', 'level-btn z-depth-1 waves-effect waves-red', 'LEVEL 5');
    level5.style.border = `solid 1px #9B111E`;
    level5.style.borderLeft = `solid 3px #9B111E`;
    levels.appendChild(level5);
    level5.onclick = () => this.switchImages(5);

    const level6 = createElement('div', 'level-btn z-depth-1 waves-effect waves-light', 'СЛОЖНЫЕ СЛОВА');
    level6.style.border = `solid 1px #FCFCFD`;
    level6.style.borderLeft = `solid 3px #FCFCFD`;
    levels.appendChild(level6);
    level6.onclick = () => this.switchImages(6);
  }

  renderGames(games: HTMLElement) {
    const gamesTitle = createElement('h6', 'games-title center', 'Игры');
    games.appendChild(gamesTitle);

    const game0 = createElement('a', 'games-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    game0.href = '#sprint';
    games.appendChild(game0);
    const game0Title = createElement('div', 'game-title', 'Спринт');
    game0.appendChild(game0Title);
    const game0Picture = createElement('div', 'game-picture btn-sprint');
    game0.appendChild(game0Picture);

    const game1 = createElement('a', 'games-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    game1.href = '#audio';
    games.appendChild(game1);
    const game1Title = createElement('div', 'game-title', 'Аудиовызов');
    game1.appendChild(game1Title);
    const game1Picture = createElement('div', 'game-picture btn-audio');
    game1.appendChild(game1Picture);

    const game2 = createElement('a', 'games-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    game2.href = '#drag';
    games.appendChild(game2);
    const game2Title = createElement('div', 'game-title', 'Коллекции');
    game2.appendChild(game2Title);
    const game2Picture = createElement('div', 'game-picture btn-collection');
    game2.appendChild(game2Picture);
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

  renderCards(cards: HTMLElement, res: Word[]) {
    console.log(res);
    for (let i = 0; i < res.length; i += 1) {
      const card = new Card(cards, res[i]);

      card.onDifficult = () => {};
    }
  }
}
