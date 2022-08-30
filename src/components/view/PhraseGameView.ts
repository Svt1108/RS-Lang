import { getAllUserWords, getWordsFromBook, HOST } from '../model/helpers/apiHelpers';
import { MixWordsAudio, UserWordPlus, Word, WordPlusUserWord } from '../types';
import { LoginData } from '../types/loginTypes';
import { getMixWordsForAudio, getMixWordsForPhrase } from './helpers/appMixWords';
import { combineWords } from './helpers/combineArr';
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
    console.log('user');
    console.log(user);

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
        console.log('words');
        console.log(words);
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

  // private showGame (data: WordPlusUserWord[], user?: LoginData): HTMLElement {
  //   console.log(data);
  //   console.log(user);
  //   return 1;
  // }

  private showGame(data: WordPlusUserWord[], user?: LoginData): HTMLElement {
    console.log(1111111111111);
    console.log(user);
    console.log(data);

    const mixDataPhrase = getMixWordsForPhrase(data);

    console.log(mixDataPhrase);

    const mixData = getMixWordsForAudio(data);

    const word = createElement('div', 'phrase_word card');
    const wordName = createElement('div', 'phrase_word-name');
    const audioBlock = createElement(
      'i',
      'tiny grey-text text-darken-2 material-icons volume-up phrase_game-phrase',
      'volume_up',
    );
    const blockBtn = createElement('div', 'phrase_btn-block');
    const mainBtn = <HTMLButtonElement>createElement('button', `phrase_main-btn z-depth-1 waves-effect`, `НЕ ЗНАЮ`);
    const mainBlock = createElement('div', 'phrase_main-block');
    const volumeBtn = createElement(
      'i',
      'tiny grey-text text-darken-2 material-icons volume-up phrase_volume',
      'volume_up',
    );
    const imgDiv = createElement('div', 'phrase_img-word');
    const audio = new Audio();
    const volume = new Audio();
    let index = 0;
    imgDiv.style.backgroundImage = `url(${HOST}/${mixData[0].image})`;
    audio.src = `${HOST}/${mixData[index].audio}`;
    volume.src = `${HOST}/${mixData[index].audio}`;
    audioBlock.onclick = () => {
      audio.play();
    };
    volumeBtn.onclick = () => {
      volume.play();
    };
    volume.play();
    wordName.innerHTML = `${mixData[index].en}  ${mixData[index].tr}`;
    let flag = true;
    let flagRes = true;
    const blockWodsArr: HTMLButtonElement[] = [];

    for (let i = 0; i < mixData[index].ruRandom.length; i += 1) {
      const wordContainer = <HTMLButtonElement>(
        createElement('button', `phrase_block-word z-depth-1 waves-effect`, `${i + 1} ${mixData[index].ruRandom[i]}`)
      );
      blockWodsArr.push(wordContainer);
      blockBtn.append(wordContainer);
    }

    setTimeout(() => {
      mainBtn.disabled = false;
    }, 500);
    mainBtn.disabled = true;
    mainBtn.onclick = () => {
      mainBtn.disabled = true;
      setTimeout(() => {
        mainBtn.disabled = false;
      }, 500);
      if (index <= mixData.length) {
        if (flag) {
          mainBtn.innerText = 'ДАЛЬШЕ';
          mainBlock.innerHTML = '';
          this.renderWordCard(mixData, index, imgDiv, wordName, audio);
          mainBlock.innerHTML = '';
          wordName.appendChild(audioBlock);
          mainBlock.append(word);
          blockWodsArr.forEach((v) => {
            if (v.textContent?.split(' ').slice(1).join(' ') === mixData[index].ru) {
              v.classList.add('correct');
              this.createWrongResult(data, mixData[index].en);
            }
          });
          flag = false;
        } else {
          blockWodsArr.forEach((el) => {
            el.classList.remove('correct');
            el.classList.remove('wrong');
          });
          mainBtn.innerText = 'НЕ ЗНАЮ';
          index += 1;
          this.renderRandomWors(blockWodsArr, mixData, index, volume);
          mainBlock.innerHTML = '';
          mainBlock.append(volumeBtn);
          flag = true;
          flagRes = true;
          blockWodsArr.forEach((v) => {
            const btn = v;
            btn.disabled = false;
          });
        }
      }
      if (index === mixData.length) {
        this.endGame();
        index = 0;
      }
    };

    blockWodsArr.forEach((el) => {
      const btn = el;
      btn.onclick = () => {
        blockWodsArr.forEach((v) => {
          if (v.textContent?.split(' ').slice(1).join(' ') === mixData[index].ru) v.classList.add('correct');
        });
        const text = btn.textContent?.split(' ').slice(1).join(' ');
        if (flagRes) {
          if (text !== mixData[index].ru) {
            btn.classList.add('wrong');
            this.createWrongResult(data, mixData[index].en);
            this.createSounds(this.sound, 'false');
          } else {
            this.createCorrectResult(data, mixData[index].en);
            this.createSounds(this.sound, 'true');
            this.pointsTotal += 10;
          }
          flagRes = false;
        }
        mainBtn.innerText = 'ДАЛЬШЕ';
        mainBlock.innerHTML = '';
        this.renderWordCard(mixData, index, imgDiv, wordName, audio);
        mainBlock.innerHTML = '';
        wordName.appendChild(audioBlock);
        mainBlock.append(word);
        flag = false;
        if (index === mixData.length) {
          this.endGame();
          index = 0;
        }
        blockWodsArr.forEach((v) => {
          const btnActiv = v;
          btnActiv.disabled = true;
        });
      };
    });

    wordName.appendChild(audioBlock);
    word.append(imgDiv);
    word.append(wordName);
    mainBlock.append(volumeBtn);
    this.stateGame.append(mainBlock);
    this.stateGame.append(blockBtn);
    this.stateGame.append(mainBtn);
    return this.stateGame;
  }

  private renderRandomWors(
    blockWodsArr: HTMLButtonElement[],
    data: MixWordsAudio[],
    index: number,
    volumeEl: HTMLAudioElement,
  ) {
    const volume = new Audio();
    const volumeBtn = volumeEl;
    if (index < data.length) {
      for (let i = 0; i < blockWodsArr.length; i += 1) {
        const word = blockWodsArr[i];
        word.innerHTML = `${i + 1} ${data[index].ruRandom[i]}`;
      }
    }
    if (index < data.length) {
      volumeBtn.src = `${HOST}/${data[index].audio}`;
      volume.src = `${HOST}/${data[index].audio}`;
      volume.play();
    }
  }

  private renderWordCard(
    data: MixWordsAudio[],
    index: number,
    imgDiv: HTMLElement,
    wordName: HTMLElement,
    audio: HTMLAudioElement,
  ) {
    const audioEl = audio;
    const wordBlock = wordName;
    const img = imgDiv;
    audioEl.src = `${HOST}/${data[index].audio}`;
    img.style.backgroundImage = `url(${HOST}/${data[index].image})`;
    wordBlock.innerHTML = `${data[index].en}  ${data[index].tr}`;
  }

  private endGame(): void {
    this.stateGame.innerHTML = '';
    const winBlock = createElement('div', 'sprint_over card');
    const showTotalRes = createElement('div', 'sprint_result');
    const showExperience = createElement('div', 'sprint_show-resultexperience');
    const gameOver = <HTMLAudioElement>new Audio('../../assets/images/audio/over.mp3');
    const learnWords = createElement('ul', 'sprint_list-words');
    const unlearnWords = createElement('ul', 'sprint_list-words');
    const headerBlock = createElement('div', 'sprint_header-result');
    const allWords = createElement('ul', 'sprint_all-words');
    const headerListLerned = createElement(
      'div',
      'sprint_header-learn',
      `Изученные слова - ${this.learnedWords.length}`,
    );
    const headerListUnlerned = createElement(
      'div',
      'sprint_header-unlearn',
      `Слова с ошибками - ${this.unlearnedWords.length}`,
    );
    showTotalRes.innerHTML = `Набрано ${this.pointsTotal} очков`;
    showExperience.innerHTML = `Получено +${this.learnedWords.length + this.unlearnedWords.length} опыта`;
    const blockBtn = createElement('div', 'sprint_btn-block-over');
    const endGame = createElement('button', 'waves-effect waves-light btn left-sptint-btn end', 'перейти в учебник');
    gameOver.pause();
    endGame.tabIndex = 0;

    if (this.learnedWords.length) {
      Promise.all(this.learnedWords).then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          const audio = new Audio();
          const audioBlock = createElement(
            'i',
            'tiny grey-text text-darken-2 material-icons volume-up sprint-phrase',
            'volume_up',
          );
          audioBlock.onclick = () => {
            audio.play();
          };
          const list = createElement('li', 'sprint_list', `${res[i][0]} ${res[i][1]} - ${res[i][2]}`);
          audio.src = `${HOST}/${res[i][3]}`;
          list.append(audioBlock);
          learnWords.append(list);
        }
      });
    }

    if (this.unlearnedWords.length) {
      Promise.all(this.unlearnedWords).then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          const audio = new Audio();
          const audioBlock = createElement(
            'i',
            'tiny grey-text text-darken-2 material-icons volume-up sprint-phrase',
            'volume_up',
          );
          audioBlock.onclick = () => {
            audio.play();
          };
          const list = createElement('li', 'sprint_list', `${res[i][0]} ${res[i][1]} - ${res[i][2]}`);
          audio.src = `${HOST}/${res[i][3]}`;
          list.append(audioBlock);
          unlearnWords.append(list);
        }
      });
    }

    endGame.onclick = () => {
      window.location.hash = 'book';
      this.stopGame();
    };

    if (this.sound) gameOver.play();
    blockBtn.append(endGame);
    blockBtn.append(this.againGame);
    headerBlock.append(showTotalRes);
    headerBlock.append(showExperience);
    winBlock.append(headerBlock);
    learnWords.append(headerListLerned);
    unlearnWords.append(headerListUnlerned);
    allWords.append(unlearnWords);
    allWords.append(learnWords);
    winBlock.append(allWords);
    winBlock.append(blockBtn);
    this.stateGame.append(winBlock);
  }

  private createCorrectResult(data: Word[], word: string): void {
    data.filter((el) =>
      el.word === word ? this.learnedWords.push([el.word, el.transcription, el.wordTranslate, el.audio]) : [],
    );
  }

  private createWrongResult(data: Word[], word: string): void {
    data.filter((el) =>
      el.word === word ? this.unlearnedWords.push([el.word, el.transcription, el.wordTranslate, el.audio]) : [],
    );
  }

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
