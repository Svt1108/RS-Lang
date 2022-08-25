import { getRandomWords} from '../model/helpers/apiHelpers';
import {  Word } from '../types';
import { getMixWords } from './helpers/appMixWords';
import { createElement } from './helpers/renderHelpers';

export class SprintGameView {
  mainDiv: HTMLElement;
  stateGame: HTMLElement;
  sound: boolean;
  fullscreen: boolean;
  timeleft: number;
  points: number;
  pointsTotal: number;
  controlBlock: HTMLElement;
  pointsResult: number[];
  pointsTotalResult: number[];
  learnedWords: string[][]
  unlearnedWords: string[][];

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.stateGame = createElement('div', 'game-content');
    this.controlBlock = createElement('div', 'controll');
    this.sound = true;
    this.fullscreen = false;
    this.timeleft = 60;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
  }

  public render(data?: Word[]): void {

    this.controlBlock.innerHTML = '';
    this.sound = true;
    this.mainDiv.innerHTML = '';
    const sprint = createElement('div', 'sprint');
    const mainImg = <HTMLImageElement>createElement('img', 'img-sprint');
    const soundImg = createElement('div', 'sound');
    const fullscreenImg = createElement('div', 'fullscreen');
    const crossImg = createElement('div', 'cross');
    mainImg.src = "./assets/images/bridge.jpg";

    fullscreenImg.onclick = () => {
      if(!this.fullscreen) { 
        this.mainDiv.requestFullscreen();
        this.fullscreen = true;
      }
      else { 
        document.exitFullscreen();
        this.fullscreen = false;
      }
    }

    soundImg.onclick = () => {
      if(this.sound) {
        this.sound = false;
        soundImg.classList.add('not-sound');
      }
      else {
        this.sound = true;
        soundImg.classList.remove('not-sound');
      }
      this.createSounds(this.sound);
    }
    
    crossImg.onclick = () => {window.location.hash = 'main'}

    sprint.append(mainImg);
    this.controlBlock.appendChild(soundImg);
    this.controlBlock.append(fullscreenImg);
    this.controlBlock.appendChild(crossImg);
    this.mainDiv.append(this.controlBlock);
    this.mainDiv.append(sprint);
    if (data) this.mainDiv.append(this.showGame(data));
    else this.mainDiv.append(this.startGame());

  }

  private startGame(): HTMLElement {

    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const randomPageArr: number[] = [];
    const title: HTMLElement = createElement('h1', 'title-sprint', 'Sprint');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-sprint',
      'Попробуй угадать как можно больше слов за минуту',
    );
    const levelBlock: HTMLElement = createElement('div', 'level-sprint');

    while(randomPageArr.length < 7) {
    const randomPage = Math.floor(Math.random() * 29);
      if(!randomPageArr.includes(randomPage)) {
        randomPageArr.push(randomPage); 
      }
    }

    for (let i = 0; i <= 5; i += 1) {

      const levelArr: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const classArr: string[] = ['waves-purple', 'waves-yellow', 'waves-green',
                                  'waves-teal', 'waves-orange','waves-red']                       
      const btnLevel = createElement('button', `sprint-level-btn z-depth-1 waves-effect ${classArr[i]}`, 
                       `${levelArr[i]}`);   

      btnLevel.onclick = async () => {   
        const words = await getRandomWords(randomPageArr, i);
        this.stateGame.innerHTML = '';
        this.mainDiv.append(this.showGame(words));
      };

      levelBlock.append(btnLevel);

    }
     
    this.stateGame.append(title);
    this.stateGame.append(subTitle);
    this.stateGame.append(levelBlock);
    return this.stateGame;

  }

  private showGame(data: Word[]): HTMLElement {

    this.timeleft = 60;
    const mixData = getMixWords(data);
    const word = createElement('div', 'word card');
    const wordName = createElement('div', 'word-name');
    const crowsBlock = createElement('div', 'crows');
    const points = createElement('div', 'points', `+${this.points} очков за слово`);
    const totalPoints = createElement('div', 'total-points', `${0}`);
    const blockBtn = createElement('div', 'btn-block');
    const timeBlock = createElement ('div', 'time');
    const timeImg = createElement ('div', 'clock');
    const seconds = createElement ('div', 'seconds card', `:${this.timeleft}`);
    const btnRight = <HTMLButtonElement>createElement('button', 'waves-effect waves-light btn right-sptint-btn', 'верно');
    const btnWrong = <HTMLButtonElement>createElement('button', 'waves-effect waves-light btn left-sptint-btn', 'неверно');
    const crow1 = createElement('div', `crow`);
    const crow2 = createElement('div', `crow`);
    const crow3 = createElement('div', `crow`);
    let index = 1;
    wordName.innerHTML = `${mixData[0].en}   -   ${mixData[0].ru}`;

    const downloadTimer = setInterval(() => {
     seconds.innerHTML = `:${this.timeleft}`;
      if(this.timeleft <= 0){
        this.endGame();
        clearInterval(downloadTimer);
      }
      this.timeleft -= 1;
    }, 1000);
   
    btnRight.onclick = async () => {

      if(!mixData[index-1].match) {
        this.createSounds(this.sound, 'false');
        this.createWrongResult(data, mixData[index-1].en);
        this.pointsTotalResult = [];
        this.points = 10;
        this.styleCrow ([crow1, crow2, crow3], true);
        points.innerHTML = `+${this.points} очков за слово`;
      } else { 
        this.createSounds(this.sound, 'true');
        this.createCorrectResult(data, mixData[index-1].en);
        this.countResult(totalPoints, points);
        this.styleCrow ([crow1, crow2, crow3]);
      }
      wordName.innerHTML = `${mixData[index].en}   -   ${mixData[index].ru}`;
      index += 1;

    };

    btnWrong.onclick = () => {
      if(!mixData[index-1].match) {
        this.createSounds(this.sound, 'true');
        this.createCorrectResult(data, mixData[index-1].en);
        this.countResult(totalPoints, points);
        this.styleCrow ([crow1, crow2, crow3]);
      } else {
        this.createSounds(this.sound, 'false');
        this.createWrongResult(data, mixData[index-1].en);
        this.pointsTotalResult = [];
        this.points = 10;
        points.innerHTML = `+${this.points} очков за слово`;
        this.styleCrow ([crow1, crow2, crow3], true);
      }

      wordName.innerHTML = `${mixData[index].en}   -   ${mixData[index].ru}`;
      index += 1;

    };
   
    crowsBlock.append(crow1);
    crowsBlock.append(crow2);
    crowsBlock.append(crow3);
    timeBlock.append(timeImg)
    timeBlock.append(seconds)
    blockBtn.append(btnWrong);
    blockBtn.append(btnRight);
    word.append(crowsBlock);
    word.append(points)
    word.append(wordName);
    this.stateGame.append(totalPoints)
    this.stateGame.append(timeBlock);
    this.stateGame.append(word);
    this.stateGame.append(blockBtn);
    return this.stateGame;
  }

  private endGame(): void {
    this.stateGame.innerHTML = ''
    const gameOver: HTMLAudioElement = new Audio('../../assets/images/audio/over.mp3');
    const winBlock = createElement('div', 'over card');
    const showTotalRes = createElement('div', 'result');
    const showExperience = createElement('div', 'show-resultexperience'); 
    const learnWords = createElement('ul', 'list-words'); 
    const unlearnWords = createElement('ul', 'list-words'); 
    const headerBlock = createElement('div', 'header-result')
    const allWords = createElement('ul', 'all-words'); 
    const headerListLerned = createElement('div', 'header-learn', `Изученные слова - ${this.learnedWords.length}`)
    const headerListUnlerned = createElement('div', 'header-unlearn', `Слова с ошибками - ${this.unlearnedWords.length}`)
    showTotalRes.innerHTML = `Набрано ${this.pointsTotal} очков` 
    showExperience.innerHTML = `Получено +${this.learnedWords.length + this.unlearnedWords.length} опыта`
    const blockBtn = createElement('div', 'btn-block-over');
    const moreGame = createElement('button', 'waves-effect waves-light btn right-sptint-btn end', 'сыграть еще раз');
    const endGame = createElement('button', 'waves-effect waves-light btn left-sptint-btn end', 'перейти в учебник');
    
    if(this.learnedWords.length) {
      Promise.all(this.learnedWords).then(res => {
        for (let i = 0; i < res.length; i += 1) {
          const list = createElement('li', 'list', 
            `${res[i][0]} ${res[i][1]} - ${res[i][2]}`)      
          learnWords.append(list)
        }
      })
    } 
    
    if(this.unlearnedWords.length) {
      Promise.all(this.unlearnedWords).then(res => {
        for (let i = 0; i < res.length; i += 1) {
          const list = createElement('li', 'list', 
            `${res[i][0]} ${res[i][1]} - ${res[i][2]}`)
          unlearnWords.append(list)
        }
      })
    }
    
    moreGame.onclick = () => {this.startGame()}
    endGame.onclick = () => {window.location.hash = 'book'}
    if(this.sound) gameOver.play();
    
    blockBtn.append(endGame);
    blockBtn.append(moreGame);
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

  
}

// const start = <HTMLButtonElement>createElement('button', 'waves-effect waves-light btn-large start', 'Начать');
  // start.disabled = true;
  // start.onclick = async () => {
  //   this.stateGame.innerHTML = '';
  //   const words = await getWords(0, level[level.length - 1]);
  //   this.mainDiv.append(this.showGame(words));
  // };