import { createUserWord, getAllUserWords, getWords, HOST, updateUserWord} from '../model/helpers/apiHelpers';
import {  MixWordsAudio, UserWordPlus, Word, WordPlusUserWord } from '../types';
import { LoginData } from '../types/loginTypes';
import { getMixWordsForAudio } from './helpers/appMixWords';
import { combineWords } from './helpers/combineArr';
import { createElement } from './helpers/renderHelpers';

export class AudioGameView {
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
  audio: HTMLAudioElement

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.stateGame = createElement('div', 'audio_game-content');
    this.controlBlock = createElement('div', 'audio_controll');
    this.againGame = createElement('button', 
      'waves-effect waves-light btn right-audio-btn end', 'сыграть еще раз');
    this.sound = true;
    this.fullscreen = false;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
    this.audio = new Audio()
  }

  public render(data?: Word[], user?: LoginData): void { 
    this.controlBlock.innerHTML = '';
    this.mainDiv.innerHTML = '';
    const adioGame = createElement('div', 'audio-game');
    const mainImg = <HTMLImageElement>createElement('img', 'img-audio');
    const soundImg = createElement('button', 'audio_sound');
    const fullscreenImg = createElement('button', 'audio_fullscreen');
    const crossImg = createElement('button', 'audio_cross');

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
        soundImg.classList.add('audio_not-sound');
      } else {
        this.sound = true;
        soundImg.classList.remove('audio_not-sound');
      }
      this.createSounds(this.sound);
    };

    crossImg.onclick = () => {
      window.location.hash = 'main';
      this.stopGame();
    };
     
    soundImg.onmouseout = () => {
      soundImg.blur()
    }
    fullscreenImg.onmouseout = () => {
      fullscreenImg.blur()
    }
    this.againGame.tabIndex = 0
    crossImg.tabIndex = 0
    soundImg.tabIndex = 0
    fullscreenImg.tabIndex = 0
    adioGame.append(mainImg);
    this.controlBlock.appendChild(soundImg);
    this.controlBlock.append(fullscreenImg);
    this.controlBlock.appendChild(crossImg);
    this.mainDiv.append(this.controlBlock);
    this.mainDiv.append(adioGame);
    if (data && user) {
      this.mainDiv.append(this.startGameFromBook(data, user));
      this.againGame.onclick = () => {
      this.startGameFromBook(data, user)
      }       
    } 
    else if (data && !user) {
      this.mainDiv.append(this.startGameFromBook(data));
      this.againGame.onclick = () => {
        this.startGameFromBook(data)
        this.audio.remove()
      }  
    }
    else if (!data && user) {
      this.mainDiv.append(this.startGameFromMenu(user));
      this.againGame.onclick = () => {
        this.startGameFromMenu(user)
        this.audio.remove()
      } 
    }    
    else if (!data && !user){
      this.mainDiv.append(this.startGameFromMenu());
      this.againGame.onclick = () => {
        this.startGameFromMenu()
        this.audio.remove()
      } 
    }
  }

  private startGameFromMenu(user?: LoginData): HTMLElement {
    this.sound = true;
    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const title: HTMLElement = createElement('h1', 'title-audio h1-lang', 'Аудиовызов');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-audio h5-lang',
      'Попробуй угадать как можно больше слов на слух',
    );

    const navHeader: HTMLElement = createElement('ul', 'nav-audio h6-lang',
      'Инструкция для игры на клавиатуре:');
    const navList1: HTMLElement = createElement('li', 'nav_list-audio ul-lang', 
      ' - цифровые клавиши от 1 до 5 для выбора ответа');
    const navList2: HTMLElement = createElement('li', 'nav_list-audio ul-lang',
      ' - клавиша Enter для подсказки или для перехода к следующему слову');   
    const navList3: HTMLElement = createElement('li', 'nav_list-audio ul-lang', 
      ' - пробел для повтроного звучания слова');
    
    const levelBlock: HTMLElement = createElement('div', 'level-audio');


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
        `audio-level-btn z-depth-2 waves-effect ${classArr[i]}`,
        `${levelArr[i]}`,
      );
      btnLevel.tabIndex = 0
      btnLevel.onclick = async () => {
        const randomPage = Math.floor(Math.random() * 29)
        const words = await getWords(randomPage, i);
        this.stateGame.innerHTML = '';
        if(user){
          const userWords: UserWordPlus[] = await getAllUserWords(user.id, user.token);
          const tempObj = combineWords(words, userWords);
          const userRes: WordPlusUserWord[] = tempObj.combinedArr;
          this.mainDiv.append(this.showGame(userRes, user));
        }
        else this.mainDiv.append(this.showGame(words));
      };

      levelBlock.append(btnLevel);
    }
    
    navHeader.append(navList1)
    navHeader.append(navList2)
    navHeader.append(navList3)
    this.stateGame.append(title);
    this.stateGame.append(subTitle);
    this.stateGame.append(navHeader);
    this.stateGame.append(levelBlock);
    return this.stateGame;
  }

  private startGameFromBook(data: Word[], user?: LoginData): HTMLElement {
    this.sound = true;
    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const title: HTMLElement = createElement('h1', 'title-audio h1-lang', 'Аудиовызов');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-audio h5-lang',
      'Попробуй угадать как можно больше слов на слух',
    );

    const navHeader: HTMLElement = createElement('ul', 'nav-audio h6-lang',
      'Инструкция для игры на клавиатуре:');
    const navList1: HTMLElement = createElement('li', 'nav_list-audio ul-lang', 
      ' - цифровые клавиши от 1 до 5 для выбора ответа');
    const navList2: HTMLElement = createElement('li', 'nav_list-audio ul-lang',
      ' - клавиша Enter для подсказки или для перехода к следующему слову');   
    const navList3: HTMLElement = createElement('li', 'nav_list-audio ul-lang', 
      ' - пробел для повтроного звучания слова');

    const btnStart = createElement('button', `audio_start-btn z-depth-1 waves-effect`, 
                       'НАЧАТЬ');
    btnStart.tabIndex = 0                   
    btnStart.onclick = () => {
      this.stateGame.innerHTML = '';
      if(user)this.showGame(data, user)
      else this.showGame(data)
    }   
    
    navHeader.append(navList1)
    navHeader.append(navList2)
    navHeader.append(navList3)
    this.stateGame.append(title);
    this.stateGame.append(subTitle);
    this.stateGame.append(navHeader);
    this.stateGame.append(btnStart);
    return this.stateGame;
  }

  private showGame(data: Word[], user?: LoginData): HTMLElement {
    const mixData = getMixWordsForAudio(data);
    const word = createElement('div', 'audio_word card');
    const wordName = createElement('div', 'audio_word-name');
    const audioBlock = createElement('i', 'tiny grey-text text-darken-2 material-icons volume-up audio_game-audio', 'volume_up');
    const blockBtn = createElement('div', 'audio_btn-block');
    const mainBtn = <HTMLButtonElement>createElement('button', `audio_main-btn z-depth-1 waves-effect`, 
      `НЕ ЗНАЮ`);
    const mainBlock =  createElement('div', 'audio_main-block'); 
    const volumeBtn = createElement('i', 'tiny grey-text text-darken-2 material-icons volume-up audio_volume', 'volume_up');
    const imgDiv = createElement('div', 'audio_img-word')
    volumeBtn.tabIndex = 0;
    let index = 0;
    imgDiv.style.backgroundImage = `url(${HOST}/${mixData[0].image})` 
    this.audio.src = `${HOST}/${mixData[index].audio}`
    audioBlock.onclick = () => {this.audio.play()}
    volumeBtn.onclick = () => {this.audio.play()}
    this.audio.play()
    wordName.innerHTML = `${mixData[index].en}  ${mixData[index].tr}`;
    let flag = true;
    let flagRes = true;
    const blockWodsArr: HTMLButtonElement[] = []
    const keyCode = ['1', '2', '3', '4', '5']

    for(let i = 0; i < mixData[index].ruRandom.length; i += 1) {
      const wordContainer = <HTMLButtonElement>createElement('button', `audio_block-word z-depth-1 waves-effect`, 
      `${i + 1} ${mixData[index].ruRandom[i]}`);
      wordContainer.id = `${i + 1}`
      blockWodsArr.push(wordContainer)
      blockBtn.append(wordContainer)
    }

    const handleVolumepress = (el: KeyboardEvent)  => { 
      if(el.code === 'Space') {this.audio.play()}
      if (index === mixData.length) window.removeEventListener('keyup', handleVolumepress)
    }

    const handleKeypress = (el: KeyboardEvent)  => {
      if(index < mixData.length) {
        keyCode.forEach((key) => {
          if (el.key === key) {
            window.removeEventListener('keyup', handleKeypress)
            blockWodsArr.forEach(async (v) => {
              if (v.textContent?.split(' ').slice(1).join(' ') === mixData[index].ru) v.classList.add('correct')
              const text = v.textContent?.split(' ').slice(1).join(' ')
              if(flagRes) {
                if (v.id === el.key) {
                  const userWord = this.findWord(data, mixData[index].en);
                  if (userWord && user) await this.createNewUserWord(userWord, user)
                  if(text !== mixData[index].ru) {
                    v.classList.add('wrong') 
                    if (userWord && user) await this.incorrectUserWord(userWord, user)
                    this.createWrongResult(data, mixData[index].en);
                    this.createSounds(this.sound, 'false')
                  } else {
                    if (userWord && user) await this.correctUserWord(userWord, user)
                    this.createCorrectResult(data, mixData[index].en);
                    this.createSounds(this.sound, 'true')
                    this.pointsTotal += 10
                  }
                  flagRes = false
                }
              } 
              mainBtn.innerText = 'ДАЛЬШЕ'
              mainBlock.innerHTML = ''
              this.renderWordCard (mixData, index, 
                imgDiv, wordName)
              mainBlock.innerHTML = ''  
              wordName.appendChild(audioBlock)
              mainBlock.append(word);
              flag = false 
              if (index === mixData.length) {
                this.endGame()
                window.removeEventListener('keyup', handleKeypress)
                index = 0
              } 
              blockWodsArr.forEach((w) => {
                const btnActiv = w
                btnActiv.disabled = true
              })
            })
          }
        })
      } else {
        window.removeEventListener('keyup', handleKeypress)
      }
    }
    
    const handleMainKeypress = async (el: KeyboardEvent)  => {
      mainBtn.disabled = false
      window.removeEventListener('keyup', handleMainKeypress)
      const interval  = setTimeout(() => {window.addEventListener('keyup', handleMainKeypress)}, 400)
      let int;
      if (index <= mixData.length) {
        if(el.key === 'Enter') {   
          if (flag) {
            window.removeEventListener('keyup', handleKeypress)
            const userWord = this.findWord(data, mixData[index].en);
            if (userWord && user) { 
              await this.createNewUserWord(userWord, user) 
              await this.incorrectUserWord(userWord, user)
            }
            this.pressMainButtonAnswer(mainBtn, data, index,
              mixData, mainBlock, imgDiv, wordName, audioBlock, word, blockWodsArr)
            flag = false
          } else {
            int = setTimeout(() => {window.addEventListener('keyup', handleKeypress)}, 400)
            index += 1
            flag = true;
            flagRes = true
            this.pressMainButtonNext (mainBtn, index,
              mixData, mainBlock, blockWodsArr,
              volumeBtn, this.audio)
          } 
        } 
        if (index === mixData.length) {
          clearInterval(interval)
          clearInterval(int)
          this.endGame()
          window.removeEventListener('keyup', handleKeypress)
          window.removeEventListener('keyup', handleMainKeypress)
          index = 0
        } 
      }   
    }

    setTimeout(() => { mainBtn.disabled = false}, 500);
    mainBtn.disabled = true
    mainBtn.onclick = async () => {
      mainBtn.disabled = true
      setTimeout(() => { 
        mainBtn.disabled = false
      }, 500);
      if (index <= mixData.length) { 
        if (flag) {
          window.removeEventListener('keyup', handleKeypress)
          const userWord = this.findWord(data, mixData[index].en);
          if (userWord && user) { 
            await this.createNewUserWord(userWord, user) 
            await this.incorrectUserWord(userWord, user)
          }  
            this.pressMainButtonAnswer(mainBtn, data, index,
            mixData, mainBlock, imgDiv, wordName, audioBlock, word, blockWodsArr)
          flag = false
        } else {
          window.addEventListener('keyup', handleKeypress)
          index += 1
          flag = true;
          flagRes = true
          this.pressMainButtonNext (mainBtn, index,
            mixData, mainBlock, blockWodsArr,
            volumeBtn, this.audio)
        } 
      }
      if (index === mixData.length) {
        window.removeEventListener('keyup', handleKeypress)
        window.removeEventListener('keyup', handleMainKeypress)
        this.endGame()
        index = 0
      }  
    }
    
    blockWodsArr.forEach((el) => {
      const btn = el  
      btn.onclick = async () => {
        blockWodsArr.forEach((v) => {
          if (v.textContent?.split(' ').slice(1).join(' ') === mixData[index].ru) v.classList.add('correct')
        })
        const text = btn.textContent?.split(' ').slice(1).join(' ')
        if(flagRes) {
          const userWord = this.findWord(data, mixData[index].en);
          if (userWord && user) await this.createNewUserWord(userWord, user)
          if(text !== mixData[index].ru) {
            btn.classList.add('wrong') 
            if (userWord && user) await this.incorrectUserWord(userWord, user)
            this.createWrongResult(data, mixData[index].en);
            this.createSounds(this.sound, 'false')
          } else {
            if (userWord && user) await this.correctUserWord(userWord, user)
            this.createCorrectResult(data, mixData[index].en);
            this.createSounds(this.sound, 'true')
            this.pointsTotal += 10
          }
          flagRes = false
        } 
        mainBtn.innerText = 'ДАЛЬШЕ'
        mainBlock.innerHTML = ''
        this.renderWordCard (mixData, index, 
          imgDiv, wordName)
        mainBlock.innerHTML = ''  
        wordName.appendChild(audioBlock)
        mainBlock.append(word);
        flag = false 
        if (index === mixData.length) {
          this.endGame()
          index = 0
        } 
        blockWodsArr.forEach((v) => {
          const btnActiv = v
          btnActiv.disabled = true
        })
      }
    })
    
    window.addEventListener('keyup', handleMainKeypress);
    window.addEventListener('keyup', handleKeypress)
    window.addEventListener('keyup', handleVolumepress)
    wordName.appendChild(audioBlock)
    word.append(imgDiv);
    word.append(wordName);
    mainBlock.append(volumeBtn)
    this.stateGame.append(mainBlock);
    this.stateGame.append(blockBtn);
    this.stateGame.append(mainBtn)
    return this.stateGame;
  }

  private pressMainButtonAnswer = (mainBtnDiv: HTMLButtonElement, data: Word[], index: number,
    mixData: MixWordsAudio[], mainBlockDiv: HTMLElement, imgDiv: HTMLElement, wordName: HTMLElement, 
    audioBlock: HTMLElement, word:HTMLElement, blockWodsArr: HTMLButtonElement[]) => {

    const mainBlock = mainBlockDiv
    const mainBtn = mainBtnDiv
    mainBtn.innerText = 'ДАЛЬШЕ'
    this.renderWordCard (mixData, index, imgDiv, wordName)
    mainBlock.innerHTML = ''  
    wordName.appendChild(audioBlock)
    mainBlock.append(word);
    blockWodsArr.forEach(async (v) => {
      const btn = v
      if (btn.textContent?.split(' ').slice(1).join(' ') === mixData[index].ru) {
        btn.classList.add('correct')
        this.createWrongResult(data, mixData[index].en);
      }
      btn.disabled = true
    })
  }

  private pressMainButtonNext = (mainBtnDiv: HTMLButtonElement, index: number,
    mixData: MixWordsAudio[], mainBlockDiv: HTMLElement,   blockWodsArr: HTMLButtonElement[],
    volumeBtn: HTMLElement, volume: HTMLAudioElement) => {
    const mainBlock = mainBlockDiv
    const mainBtn = mainBtnDiv
    blockWodsArr.forEach((el) => {
      el.classList.remove('correct')
      el.classList.remove('wrong')
      const btn = el
      btn.disabled = false 
    })
    mainBtn.innerText = 'НЕ ЗНАЮ'
   
    this.renderRandomWords(blockWodsArr, mixData, index, volume)
    mainBlock.innerHTML = ''
    mainBlock.append(volumeBtn)
  }

  private renderRandomWords (blockWodsArr: HTMLButtonElement[], data: MixWordsAudio[], 
    index: number, volumeEl: HTMLAudioElement){
    const volumeBtn = volumeEl
    if(index < data.length){
      for (let i = 0; i < blockWodsArr.length; i += 1) {
        const word = blockWodsArr[i]
        word.innerHTML = `${i + 1} ${data[index].ruRandom[i]}`;
      }
    }
    if (index < data.length) {
      volumeBtn.src = `${HOST}/${data[index].audio}`
      this.audio.src = `${HOST}/${data[index].audio}`
      this.audio.play()
      
    }
  }

  private async createNewUserWord(word: Word | UserWordPlus, user: LoginData) {
    const userWord = word
    if((<UserWordPlus>userWord).optional?.markedAsNew === undefined) {
      (<UserWordPlus>userWord).difficulty = 'normal';
      (<UserWordPlus>userWord).optional = {
        learned: 'no',
        learnDate: Date.now(),
        games: {
          sprint: { wins: 0, total: 0 },
          audio: { wins: 0, total: 0 },
          phrase: { wins: 0, total: 0 },
        },
        markedAsNew: true,
      };
      await createUserWord((<LoginData>user).id, (<UserWordPlus>userWord).id, (<LoginData>user).token, {
        difficulty: (<UserWordPlus>userWord).difficulty as string,
        optional: (<UserWordPlus>userWord).optional,
      });
    }
    if((<UserWordPlus>userWord).optional?.markedAsNew === false) {
      (<UserWordPlus>userWord).optional.markedAsNew = true;
      await updateUserWord((<LoginData>user).id, (<UserWordPlus>userWord).id, (<LoginData>user).token, {
        difficulty: (<UserWordPlus>userWord).difficulty as string,
        optional: (<UserWordPlus>userWord).optional,
      });
    }
  }

  private async correctUserWord(word: Word | UserWordPlus, user: LoginData) {
    const userWord = word;

    if((<UserWordPlus>userWord).optional.games.audio.wins === 2) {
      (<UserWordPlus>userWord).difficulty = 'easy';
      (<UserWordPlus>userWord).optional.learned = 'yes';
      (<UserWordPlus>userWord).optional.learnDate = Date.now();
    }
    (<UserWordPlus>userWord).optional.games.audio.wins += 1;
    (<UserWordPlus>userWord).optional.games.audio.total += 1;
    await updateUserWord((<LoginData>user).id, (<UserWordPlus>userWord).id, (<LoginData>user).token, {
      difficulty: (<UserWordPlus>userWord).difficulty as string,
      optional: (<UserWordPlus>userWord).optional,
    });
  }

  private async incorrectUserWord(word: Word | UserWordPlus, user: LoginData) {
    const userWord = word;

    if ((<UserWordPlus>userWord).optional.learned === 'yes') {
      (<UserWordPlus>userWord).optional.learned = 'no';
      (<UserWordPlus>userWord).optional.learnDate = Date.now();
    }
    if((<UserWordPlus>userWord).optional.games.audio.wins) (<UserWordPlus>userWord).optional.games.audio.wins -= 1;
    if((<UserWordPlus>userWord).optional.games.audio.total) (<UserWordPlus>userWord).optional.games.audio.total -= 1;
    await updateUserWord((<LoginData>user).id, (<UserWordPlus>userWord).id, (<LoginData>user).token, {
      difficulty: (<UserWordPlus>userWord).difficulty as string,
      optional: (<UserWordPlus>userWord).optional,
    }); 
  }

  private renderWordCard (data: MixWordsAudio[], index: number, 
    imgDiv: HTMLElement, wordName: HTMLElement) {
    const wordBlock = wordName
    const img = imgDiv
    this.audio.src = `${HOST}/${data[index].audio}`
    img.style.backgroundImage = `url(${HOST}/${data[index].image})`
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
    endGame.tabIndex = 0
    
    
    if (this.learnedWords.length) {
      Promise.all(this.learnedWords).then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          const audio = new Audio()
          const audioBlock = createElement('i', 
            'tiny grey-text text-darken-2 material-icons volume-up sprint-audio', 'volume_up');
          audioBlock.onclick = () => {audio.play()}
          const list = createElement('li', 'sprint_list', 
            `${res[i][0]} ${res[i][1]} - ${res[i][2]}`)       
          audio.src = `${HOST}/${res[i][3]}`
          list.append(audioBlock)    
          learnWords.append(list)
        }
      })
    } 
    
    if(this.unlearnedWords.length) {
      Promise.all(this.unlearnedWords).then(res => {
        for (let i = 0; i < res.length; i += 1) {
          const audio = new Audio()
          const audioBlock = createElement('i', 
            'tiny grey-text text-darken-2 material-icons volume-up sprint-audio', 'volume_up');
          audioBlock.onclick = () => {audio.play()}
          const list = createElement('li', 'sprint_list', 
            `${res[i][0]} ${res[i][1]} - ${res[i][2]}`)
          audio.src = `${HOST}/${res[i][3]}`  
          list.append(audioBlock) 
          unlearnWords.append(list)
        }
      })
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
  
  private createCorrectResult(data: Word[], word: string){
    data.filter((el) =>
      el.word === word ? this.learnedWords.push([el.word, el.transcription, el.wordTranslate, el.audio]) : [],
    );
  }

  private createWrongResult(data: Word[], word: string) {
    data.filter((el) =>
      el.word === word ? this.unlearnedWords.push([el.word, el.transcription, el.wordTranslate, el.audio]) : [],
    );
  }

  private findWord(data: Word[], word: string) {
    return data.find((el) => el.word === word);
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
    this.audio.remove()
    this.fullscreen = false;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
    if(document.fullscreenElement) document.exitFullscreen();
  }
}
