import { getAllUserWords, getWordsFromBook } from '../model/helpers/apiHelpers';
import { UserWordPlus, WordPlusUserWord } from '../types';
import { LoginData } from '../types/loginTypes';
import { getMixWordForDrag, getMixWordsForPhrase } from './helpers/appMixWords';
import { combineWords } from './helpers/combineArr';
import { Phrase } from './helpers/PhraseView';
import { createElement } from './helpers/renderHelpers';

export class PhraseGameView {
  mainDiv: HTMLElement;
  stateGame: HTMLElement;
  againGame: HTMLElement;
  sound: boolean;
  fullscreen: boolean;
  points: number;
  pointsTotal: number;
  controlBlock: HTMLElement;
  pointsResult: number[];
  pointsTotalResult: number[];
  learnedWords: string[][];
  unlearnedWords: string[][];
  itemT?: HTMLElement;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.stateGame = createElement('div', 'phrase_game-content');
    this.controlBlock = createElement('div', 'phrase_controll');
    this.againGame = createElement('button', 'waves-effect waves-light btn right-phrase-btn end', 'сыграть еще раз');
    this.sound = true;
    this.fullscreen = false;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
  }

  public render(data?: WordPlusUserWord[], user?: LoginData): void {
    // console.log('user');
    // console.log(user);

    this.controlBlock.innerHTML = '';
    this.mainDiv.innerHTML = '';
    const adioGame = createElement('div', 'phrase-game');
    const mainImg = createElement('div', 'img-phrase');
    const soundImg = createElement('button', 'phrase_sound');
    const fullscreenImg = createElement('button', 'phrase_fullscreen');
    const crossImg = createElement('button', 'phrase_cross');
    //  mainImg.src = './assets/images/tower.jpg';

    fullscreenImg.onclick = () => {
      if (!this.fullscreen) {
        this.mainDiv.requestFullscreen();
        this.fullscreen = true;
      } else {
        document.exitFullscreen();
        this.fullscreen = false;
      }
    };

    soundImg.onclick = () => {
      if (this.sound) {
        this.sound = false;
        soundImg.classList.add('phrase_not-sound');
      } else {
        this.sound = true;
        soundImg.classList.remove('phrase_not-sound');
      }
      this.createSounds(this.sound);
    };

    crossImg.onclick = () => {
      window.location.hash = 'main';
      this.stopGame();
    };

    this.againGame.tabIndex = 0;
    crossImg.tabIndex = 0;
    soundImg.tabIndex = 0;
    fullscreenImg.tabIndex = 0;
    adioGame.append(mainImg);
    this.controlBlock.appendChild(soundImg);
    this.controlBlock.append(fullscreenImg);
    this.controlBlock.appendChild(crossImg);
    this.mainDiv.append(this.controlBlock);
    this.mainDiv.append(adioGame);
    if (data && user) {
      this.mainDiv.append(this.startGameFromBook(data, user));
      this.againGame.onclick = () => {
        this.startGameFromBook(data, user);
      };
    } else if (data && !user) {
      this.mainDiv.append(this.startGameFromBook(data));
      this.againGame.onclick = () => {
        this.startGameFromBook(data);
      };
    } else if (!data && user) {
      this.mainDiv.append(this.startGameFromMenu(user));
      this.againGame.onclick = () => {
        this.startGameFromMenu(user);
      };
    } else if (!data && !user) {
      this.mainDiv.append(this.startGameFromMenu());
      this.againGame.onclick = () => {
        this.startGameFromMenu();
      };
    }
  }

  private startGameFromMenu(user?: LoginData): HTMLElement {
    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const title: HTMLElement = createElement('h1', 'title-phrase h1-lang', 'Фразы');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-phrase h5-lang',
      'Соедини слова и фразы в правильном порядке',
    );
    const levelBlock: HTMLElement = createElement('div', 'level-phrase');

    const levelArr: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    const classArr: string[] = [
      'waves-purple violet-border',
      'waves-yellow yellow-border',
      'waves-green green-border',
      'waves-teal blue-border',
      'waves-orange orange-border',
      'waves-red red-border',
    ];

    for (let i = 0; i <= 5; i += 1) {
      const btnLevel = createElement(
        'button',
        `phrase-level-btn z-depth-2 waves-effect ${classArr[i]}`,
        `${levelArr[i]}`,
      );
      btnLevel.tabIndex = 0;
      btnLevel.onclick = async () => {
        const randomPage = Math.floor(Math.random() * 29);
        const words = await getWordsFromBook(randomPage, i);
        // console.log('words');
        // console.log(words);
        this.stateGame.innerHTML = '';
        if (user) {
          const userWords: UserWordPlus[] = await getAllUserWords(user.id, user.token);
          // console.log('userWords')
          // console.log(userWords)
          const tempObj = combineWords(words, userWords);
          const userRes: WordPlusUserWord[] = tempObj.combinedArr;
          this.mainDiv.append(this.showGame(userRes, user));
        } else this.mainDiv.append(this.showGame(words));
      };

      levelBlock.append(btnLevel);
    }

    this.stateGame.append(title);
    this.stateGame.append(subTitle);
    this.stateGame.append(levelBlock);
    return this.stateGame;
  }

  private startGameFromBook(data: WordPlusUserWord[], user?: LoginData): HTMLElement {
    this.sound = true;
    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const title: HTMLElement = createElement('h1', 'title-phrase h1-lang', 'Фразы');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-phrase h5-lang',
      'Соедини слова и фразы в правильном порядке',
    );

    const btnStart = createElement('button', `phrase_start-btn z-depth-1 waves-effect`, 'НАЧАТЬ');
    btnStart.tabIndex = 0;
    btnStart.onclick = () => {
      this.stateGame.innerHTML = '';
      if (user) this.showGame(data, user);
      else this.showGame(data);
    };

    this.stateGame.append(title);
    this.stateGame.append(subTitle);
    this.stateGame.append(btnStart);
    return this.stateGame;
  }

  private showGame(data: WordPlusUserWord[], user?: LoginData): HTMLElement {
    // console.log(1111111111111);
    console.log(user);
    // console.log(data);

    if (data.length < 10) {
      // console.log('Недостаточно слов для игры!');
      const noDifficultCard = createElement('p', 'no-difficult-card', 'Недостаточно слов для игры! :)');
      this.stateGame.appendChild(noDifficultCard);
      return this.stateGame;
    }

    const mixDataPhrase = getMixWordsForPhrase(data);

    const phraseTitle = createElement('h5', 'h5-lang phrase-all-title', 'Перетяни слова в правильные фразы');
    this.stateGame.appendChild(phraseTitle);

    const content = createElement('div', 'phrase-all-wrap');
    this.stateGame.appendChild(content);

    const wordArr = [];

    const itemArr = new Array(10);
    itemArr.fill(undefined);

    for (let i = 0; i < mixDataPhrase.length; i += 1) {
      wordArr.push({ numb: i, word: mixDataPhrase[i].word });
    }

    const mixWordForDrag = getMixWordForDrag(wordArr);

    for (let i = 0; i < mixDataPhrase.length; i += 1) {
      const phrase = new Phrase(content, mixDataPhrase[i].textExample, mixWordForDrag[i], i);
      // phrase.onLearn = () => {};

      phrase.onDragenter = () => phrase.back.classList.add('hovered');

      phrase.onDragleave = () => phrase.back.classList.remove('hovered');
      phrase.onDrop = () => {
        // const flag = phrase.back.getAttribute("data-occupate");
        if (this.itemT) {
          // phrase.back.setAttribute("data-occupate", `yes`);
          const numbBack = Number(phrase.back.getAttribute('data-numb'));
          const numbItem = Number(this.itemT.getAttribute('data-numb'));
          if (itemArr[numbBack] === undefined) {
            for (let j = 0; j < itemArr.length; j += 1) {
              if (itemArr[j] === numbItem) itemArr[j] = undefined;
            }
            itemArr[numbBack] = numbItem;
            phrase.back.append(this.itemT);
          }

          // console.log(numbBack, numbItem)
          // console.log(itemArr);
        }
        phrase.back.classList.remove('hovered');
        if (itemArr.filter((value, index) => value === index).length === 10) {
          console.log('Вы выиграли!');
          phraseTitle.style.border = '2px solid #ff85e4';
        }
      };

      phrase.onDragenterS = () => phrase.backStart.classList.add('hovered');
      phrase.onDragleaveS = () => phrase.backStart.classList.remove('hovered');
      phrase.onDropS = () => {
        // const flag = phrase.backStart.getAttribute("data-occupate");
        if (this.itemT) {
          // phrase.backStart.setAttribute("data-occupate", `yes`);
          const numbItem = Number(this.itemT.getAttribute('data-numb'));
          // console.log(numbItem)
          // console.log(itemArr)
          for (let j = 0; j < itemArr.length; j += 1) {
            // console.log(itemArr[j])
            // console.log(numbItem)
            if (itemArr[j] === numbItem) {
              console.log(11111);
              itemArr[j] = undefined;
            }
          }
          phrase.backStart.append(this.itemT);
        }
        phrase.backStart.classList.remove('hovered');
      };

      phrase.onDragstart = () => {
        this.itemT = phrase.item;
        phrase.item.classList.add('hold');
        setTimeout(() => phrase.item.classList.add('hide'), 0);
      };
      phrase.onDragend = () => phrase.item.classList.remove('hide', 'hold');
    }

    // console.log(mixDataPhrase);

    return this.stateGame;
  }

  // private endGame(): void {
  //   this.stateGame.innerHTML = '';
  //   const winBlock = createElement('div', 'sprint_over card');
  //   const showTotalRes = createElement('div', 'sprint_result');
  //   const showExperience = createElement('div', 'sprint_show-resultexperience');
  //   const gameOver = <HTMLAudioElement>new Audio('../../assets/images/audio/over.mp3');
  //   const learnWords = createElement('ul', 'sprint_list-words');
  //   const unlearnWords = createElement('ul', 'sprint_list-words');
  //   const headerBlock = createElement('div', 'sprint_header-result');
  //   const allWords = createElement('ul', 'sprint_all-words');
  //   const headerListLerned = createElement(
  //     'div',
  //     'sprint_header-learn',
  //     `Изученные слова - ${this.learnedWords.length}`,
  //   );
  //   const headerListUnlerned = createElement(
  //     'div',
  //     'sprint_header-unlearn',
  //     `Слова с ошибками - ${this.unlearnedWords.length}`,
  //   );
  //   showTotalRes.innerHTML = `Набрано ${this.pointsTotal} очков`;
  //   showExperience.innerHTML = `Получено +${this.learnedWords.length + this.unlearnedWords.length} опыта`;
  //   const blockBtn = createElement('div', 'sprint_btn-block-over');
  //   const endGame = createElement('button', 'waves-effect waves-light btn left-sptint-btn end', 'перейти в учебник');
  //   gameOver.pause();
  //   endGame.tabIndex = 0;

  //   if (this.learnedWords.length) {
  //     Promise.all(this.learnedWords).then((res) => {
  //       for (let i = 0; i < res.length; i += 1) {
  //         const audio = new Audio();
  //         const audioBlock = createElement(
  //           'i',
  //           'tiny grey-text text-darken-2 material-icons volume-up sprint-phrase',
  //           'volume_up',
  //         );
  //         audioBlock.onclick = () => {
  //           audio.play();
  //         };
  //         const list = createElement('li', 'sprint_list', `${res[i][0]} ${res[i][1]} - ${res[i][2]}`);
  //         audio.src = `${HOST}/${res[i][3]}`;
  //         list.append(audioBlock);
  //         learnWords.append(list);
  //       }
  //     });
  //   }

  //   if (this.unlearnedWords.length) {
  //     Promise.all(this.unlearnedWords).then((res) => {
  //       for (let i = 0; i < res.length; i += 1) {
  //         const audio = new Audio();
  //         const audioBlock = createElement(
  //           'i',
  //           'tiny grey-text text-darken-2 material-icons volume-up sprint-phrase',
  //           'volume_up',
  //         );
  //         audioBlock.onclick = () => {
  //           audio.play();
  //         };
  //         const list = createElement('li', 'sprint_list', `${res[i][0]} ${res[i][1]} - ${res[i][2]}`);
  //         audio.src = `${HOST}/${res[i][3]}`;
  //         list.append(audioBlock);
  //         unlearnWords.append(list);
  //       }
  //     });
  //   }

  //   endGame.onclick = () => {
  //     window.location.hash = 'book';
  //     this.stopGame();
  //   };

  //   if (this.sound) gameOver.play();
  //   blockBtn.append(endGame);
  //   blockBtn.append(this.againGame);
  //   headerBlock.append(showTotalRes);
  //   headerBlock.append(showExperience);
  //   winBlock.append(headerBlock);
  //   learnWords.append(headerListLerned);
  //   unlearnWords.append(headerListUnlerned);
  //   allWords.append(unlearnWords);
  //   allWords.append(learnWords);
  //   winBlock.append(allWords);
  //   winBlock.append(blockBtn);
  //   this.stateGame.append(winBlock);
  // }

  private createSounds(sound: boolean, flag?: string): void {
    const rightAnswer: HTMLAudioElement = new Audio('../../assets/images/audio/cool.mp3');
    const wrongAnswer: HTMLAudioElement = new Audio('../../assets/images/audio/bug.mp3');
    if (!sound) {
      rightAnswer.pause();
      wrongAnswer.pause();
    } else {
      if (flag === 'true') rightAnswer.play();
      if (flag === 'false') wrongAnswer.play();
    }
  }

  stopGame() {
    this.sound = false;
    this.fullscreen = false;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
    if (document.fullscreenElement) document.exitFullscreen();
  }
}
