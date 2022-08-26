import { createUserWord, deleteUserWord, getAllUserWords, updateUserWord } from '../model/helpers/apiHelpers';
import { UserWordPlus, Word, WordPlusUserWord } from '../types';
import { Route } from '../types/appRoutes';
import { LoginData } from '../types/loginTypes';
import Card from './helpers/CardView';
import { combineWords } from './helpers/combineArr';
import { createElement } from './helpers/renderHelpers';

const LAST_PAGE = 29;
const WORD_ON_PAGE = 20;

export class BookView {
  mainDiv;
  pageNumber: number;
  pageNumberViewBottom?: HTMLElement;
  lastPageNumber: number;
  levelNumber: number;
  pageNumberViewTop?: HTMLElement;
  learnAndDifficult: number;
  userRes: WordPlusUserWord[] = [];
  // user?: LoginData;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.pageNumber = 0;
    this.levelNumber = 0;
    this.learnAndDifficult = 0;
    this.lastPageNumber = LAST_PAGE;
  }

  async render(res: Word[], level?: number, page?: number, user?: LoginData) {
    // console.log(user);
    // console.log(res);
    //  if (user) this.user = user;
    const audioTags = document.querySelectorAll('audio');
    const audioArr = [...audioTags];
    for (let i = 0; i < audioArr.length; i += 1) {
      audioArr[i].removeAttribute('src');
      audioArr[i].srcObject = null;
      audioArr[i].remove();
    }

    this.mainDiv.innerHTML = '';

    // let userRes: WordPlusUserWord[];

    if (user) {
      const userWords: UserWordPlus[] = await getAllUserWords((<LoginData>user).id, (<LoginData>user).token);
      const tempObj = combineWords(res, userWords);
      this.userRes = tempObj.combinedArr;
      this.learnAndDifficult = tempObj.num;
      // if(tempObj.combinedArr ===  WORD_ON_PAGE)
      // this.renderCards(cards, userRes, user);
    } // else this.renderCards(cards, res);

    // console.log(`level: ${level}`);
    // console.log(`page: ${page}`);

    if (level !== undefined) this.levelNumber = level;
    if (page !== undefined) this.pageNumber = page;

    const bookWrap = createElement('div', 'book-wrap', '', 'book-wrap');
    this.mainDiv.appendChild(bookWrap);
    const title = createElement('div', 'parallax-container valign-wrapper title-lang');
    title.innerHTML = `    <div class="section no-pad-bot">
    <div class="container">
        <h6 class="header center white-text h6-lang">Учебник. Multilevel coursebook</h6>
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

    const cardsWrap = createElement('div', 'col s12 m8 cards-wrap');
    row.appendChild(cardsWrap);

    const paginationTop = createElement('div', 'pagination-top');
    cardsWrap.appendChild(paginationTop);
    this.renderPagination(paginationTop, 'top');

    const cards = createElement('div', 'cards');
    cardsWrap.appendChild(cards);
    if (user) this.renderCards(cards, this.userRes, user);
    else this.renderCards(cards, res);

    const games = createElement('div', 'col s12 m2 games');
    row.appendChild(games);
    this.renderGames(games);

    const pagination = createElement('div', 'pagination');
    bookWrap.appendChild(pagination);
    this.renderPagination(pagination, 'bottom');

    const bottom = createElement('div', 'parallax-container valign-wrapper bottom-lang');
    bottom.innerHTML = `
     <div class="parallax"><img src="assets/images/violet-3.jpg" alt="violet" class = "img-parallax" id = "img-3"></div>`;

    bookWrap.appendChild(bottom);

    if (level && level !== 0) this.switchImages(level);
    if (user && this.learnAndDifficult === WORD_ON_PAGE) bookWrap.style.backgroundColor = `#F0E891`;

    // else this.switchImages(0);
  }

  renderLevels(levels: HTMLElement) {
    const levelsTitle = createElement('h6', 'levels-title center', 'Разделы');
    levels.appendChild(levelsTitle);

    const level0 = createElement('div', 'level-btn z-depth-2 waves-effect waves-purple', 'Level 0');
    level0.style.borderTop = `solid 1px #7851A9`;
    level0.style.borderLeft = `solid 3px #7851A9`;
    levels.appendChild(level0);
    level0.onclick = () => this.switchLevel(0);

    const level1 = createElement('div', 'level-btn z-depth-2 waves-effect waves-yellow', 'Level 1');
    level1.style.borderTop = `solid 1px #F0E891`;
    level1.style.borderLeft = `solid 3px #F0E891`;
    levels.appendChild(level1);
    level1.onclick = () => this.switchLevel(1);

    const level2 = createElement('div', 'level-btn z-depth-2 waves-effect waves-green', 'Level 2');
    level2.style.borderTop = `solid 1px #386646`;
    level2.style.borderLeft = `solid 3px #386646`;
    levels.appendChild(level2);
    level2.onclick = () => this.switchLevel(2);

    const level3 = createElement('div', 'level-btn z-depth-2 waves-effect waves-teal', 'Level 3');
    level3.style.borderTop = `solid 1px #4169E1`;
    level3.style.borderLeft = `solid 3px #4169E1`;
    levels.appendChild(level3);
    level3.onclick = () => this.switchLevel(3);

    const level4 = createElement('div', 'level-btn z-depth-2 waves-effect waves-orange', 'Level 4');
    level4.style.borderTop = `solid 1px #DEB768`;
    level4.style.borderLeft = `solid 3px #DEB768`;
    levels.appendChild(level4);
    level4.onclick = () => this.switchLevel(4);

    const level5 = createElement('div', 'level-btn z-depth-2 waves-effect waves-red', 'Level 5');
    level5.style.borderTop = `solid 1px #FF1493`;
    level5.style.borderLeft = `solid 3px #FF1493`;
    levels.appendChild(level5);
    level5.onclick = () => this.switchLevel(5);

    const level6 = createElement('div', 'level-btn z-depth-2 waves-effect waves-light', 'Сложные слова');
    level6.style.borderTop = `solid 1px #FCFCFD`;
    level6.style.borderLeft = `solid 3px #FCFCFD`;
    levels.appendChild(level6);
    level6.onclick = () => this.switchLevel(6);
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

  switchLevel(level: number) {
    if (this.levelNumber === level) return;
    window.location.hash = `${Route.book}#${level}#0`;
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

  renderPagination(pagination: HTMLElement, position: string) {
    const pageWrap = createElement('div', 'page-wrap');
    pagination.appendChild(pageWrap);

    const first = createElement('div', 'page-btn z-depth-1 waves-effect first', '<<');
    pageWrap.appendChild(first);
    first.onclick = () => this.changePageNumber('first');

    const previous = createElement('div', 'page-btn z-depth-1 waves-effect previous', '<');
    pageWrap.appendChild(previous);
    previous.onclick = () => this.changePageNumber('prev');

    if (position === 'top') {
      this.pageNumberViewTop = createElement('div', 'page-number', `${this.pageNumber}`);
      this.pageNumberViewTop.setAttribute('readonly', 'readonly');
      pageWrap.appendChild(this.pageNumberViewTop);
      (<HTMLElement>this.pageNumberViewTop).innerHTML = (this.pageNumber + 1).toString();
    } else {
      this.pageNumberViewBottom = createElement('div', 'page-number', `${this.pageNumber}`);
      this.pageNumberViewBottom.setAttribute('readonly', 'readonly');
      pageWrap.appendChild(this.pageNumberViewBottom);
      (<HTMLElement>this.pageNumberViewBottom).innerHTML = (this.pageNumber + 1).toString();
    }

    const next = createElement('div', 'page-btn z-depth-1 waves-effect next', '>');
    pageWrap.appendChild(next);
    next.onclick = () => this.changePageNumber('next');

    const last = createElement('div', 'page-btn z-depth-1 waves-effect last', '>>');
    pageWrap.appendChild(last);
    last.onclick = () => this.changePageNumber('last');

    if (this.pageNumber === 0) {
      first.classList.add('btn-blocked');
      first.classList.remove('waves-effect');
      previous.classList.add('btn-blocked');
      previous.classList.remove('waves-effect');
    }
    if (this.pageNumber === this.lastPageNumber) {
      last.classList.add('btn-blocked');
      last.classList.remove('waves-effect');
      next.classList.add('btn-blocked');
      next.classList.remove('waves-effect');
    }
  }

  changePageNumber(marker: string) {
    if (marker === 'next' && this.pageNumber < this.lastPageNumber) this.pageNumber += 1;
    if (marker === 'prev' && this.pageNumber > 0) this.pageNumber -= 1;
    if (marker === 'first') this.pageNumber = 0;
    if (marker === 'last') this.pageNumber = this.lastPageNumber;

    (<HTMLElement>this.pageNumberViewTop).innerHTML = (this.pageNumber + 1).toString();
    (<HTMLElement>this.pageNumberViewBottom).innerHTML = (this.pageNumber + 1).toString();

    window.location.hash = `${Route.book}#${this.levelNumber}#${this.pageNumber}`;
  }

  renderCards(cards: HTMLElement, res: WordPlusUserWord[], user?: LoginData) {
    for (let i = 0; i < res.length; i += 1) {
      const card = new Card(cards, res[i]);

      card.onVolume = () => {
        // card.audio.addEventListener('canplaythrough', () => card.audio.play());
        if (card.audio.paused === false) {
          card.audio.pause();
          card.audio.currentTime = 0;
          card.volume.classList.remove('volume-active');
          return;
        }
        if (card.audioMeaning.paused === false) {
          card.audioMeaning.pause();
          card.audioMeaning.currentTime = 0;
          card.volume.classList.remove('volume-active');
          return;
        }
        if (card.audioExample.paused === false) {
          card.audioExample.pause();
          card.audioExample.currentTime = 0;
          card.volume.classList.remove('volume-active');
          return;
        }

        card.volume.classList.add('volume-active');
        card.audio.play();
        card.audio.onended = () => card.audioMeaning.play();
        card.audioMeaning.onended = () => card.audioExample.play();
        card.audioExample.onended = () => card.volume.classList.remove('volume-active');
      };

      card.onDifficult = async () => {
        if (!res[i].difficulty) {
          await createUserWord((<LoginData>user).id, res[i].id, (<LoginData>user).token, {
            difficulty: 'difficult',
            optional: { learned: 'no', learnDate: new Date() },
          });
          res[i].difficulty = 'difficult';
          res[i].optional = { learned: 'no' };
          card.difficult.style.backgroundImage = `url(../assets/svg/difficult-colored.svg)`;
          card.learn.style.backgroundImage = `url(../assets/svg/learn.svg)`;
          this.learnAndDifficult += 1;
          //  if (this.learnAndDifficult === WORD_ON_PAGE) bookWrap.style.backgroundColor = `#F0E891`;
        } else if (res[i].difficulty && res[i].difficulty === 'difficult') {
          await deleteUserWord((<LoginData>user).id, res[i].id, (<LoginData>user).token);
          delete res[i].difficulty;
          delete res[i].optional;
          card.difficult.style.backgroundImage = `url(../assets/svg/difficult.svg)`;
          card.learn.style.backgroundImage = `url(../assets/svg/learn.svg)`;
          this.learnAndDifficult -= 1;
        } else if (res[i].difficulty && res[i].difficulty === 'easy') {
          await updateUserWord((<LoginData>user).id, res[i].id, (<LoginData>user).token, {
            difficulty: 'difficult',
            optional: { learned: 'no', learnDate: new Date() },
          });
          res[i].difficulty = 'difficult';
          res[i].optional = { learned: 'no' };
          card.difficult.style.backgroundImage = `url(../assets/svg/difficult-colored.svg)`;
          card.learn.style.backgroundImage = `url(../assets/svg/learn.svg)`;
        }
      };

      card.onLearn = async () => {
        if (!res[i].optional) {
          //  console.log('create');
          await createUserWord((<LoginData>user).id, res[i].id, (<LoginData>user).token, {
            difficulty: 'easy',
            optional: { learned: 'yes', learnDate: new Date() },
          });
          res[i].difficulty = 'easy';
          res[i].optional = { learned: 'yes' };
          card.difficult.style.backgroundImage = `url(../assets/svg/difficult.svg)`;
          card.learn.style.backgroundImage = `url(../assets/svg/learn-colored.svg)`;
          this.learnAndDifficult += 1;
          //  if (this.learnAndDifficult === WORD_ON_PAGE) bookWrap.style.backgroundColor = `#F0E891`;
        } else if (res[i].optional && res[i].optional?.learned === 'yes') {
          await deleteUserWord((<LoginData>user).id, res[i].id, (<LoginData>user).token);
          delete res[i].difficulty;
          delete res[i].optional;
          card.difficult.style.backgroundImage = `url(../assets/svg/difficult.svg)`;
          card.learn.style.backgroundImage = `url(../assets/svg/learn.svg)`;
          this.learnAndDifficult -= 1;
        } else if (res[i].optional && res[i].optional?.learned === 'no') {
          await updateUserWord((<LoginData>user).id, res[i].id, (<LoginData>user).token, {
            difficulty: 'easy',
            optional: { learned: 'yes', learnDate: new Date() },
          });
          res[i].difficulty = 'easy';
          res[i].optional = { learned: 'yes' };
          card.difficult.style.backgroundImage = `url(../assets/svg/difficult.svg)`;
          card.learn.style.backgroundImage = `url(../assets/svg/learn-colored.svg)`;
        }
      };
    }
  }
}
