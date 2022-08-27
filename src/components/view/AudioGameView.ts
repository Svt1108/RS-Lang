import { getRandomWords, HOST} from '../model/helpers/apiHelpers';
import {  MixWords, Word } from '../types';
import { getMixWords } from './helpers/appMixWords';
import { createElement } from './helpers/renderHelpers';

export class AudioGameView {
  mainDiv: HTMLElement;
  stateGame: HTMLElement;
  againGame: HTMLElement;
  sound: boolean;
  fullscreen: boolean;
  timeleft: number;
  points: number;
  pointsTotal: number;
  controlBlock: HTMLElement;
  pointsResult: number[];
  pointsTotalResult: number[];
  learnedWords: string[][];
  unlearnedWords: string[][];
  test: {n: number, w: string}[]

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.stateGame = createElement('div', 'audio_game-content');
    this.controlBlock = createElement('div', 'audio_controll');
    this.againGame = createElement('button', 
      'waves-effect waves-light btn right-audio-btn end', 'сыграть еще раз');
    this.sound = true;
    this.fullscreen = false;
    this.timeleft = 60;
    this.points = 10;
    this.pointsTotal = 0;
    this.pointsTotalResult = [];
    this.pointsResult = [];
    this.learnedWords = [];
    this.unlearnedWords = [];
    this.test = []
  }

  public render(data?: Word[]): void { 
    this.controlBlock.innerHTML = '';
    this.mainDiv.innerHTML = '';
    const adioGame = createElement('div', 'audio-game');
    const mainImg = <HTMLImageElement>createElement('img', 'img-audio');
    const soundImg = createElement('button', 'audio_sound');
    const fullscreenImg = createElement('button', 'audio_fullscreen');
    const crossImg = createElement('button', 'audio_cross');
    mainImg.src = './assets/images/village.jpg';

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
    if (data) {
      this.mainDiv.append(this.startGameFromBook(data));
      this.againGame.onclick = () => {this.startGameFromBook(data)} 
      
    } else {
      this.mainDiv.append(this.startGameFromMenu());
      this.againGame.onclick = () => {this.startGameFromMenu()} 
    }
  }

  private startGameFromMenu(): HTMLElement {
    this.stateGame.innerHTML = '';
    this.pointsResult = [];
    this.points = 10;
    this.pointsTotal = 0;
    this.learnedWords = [];
    this.unlearnedWords = [];
    const randomPageArr: number[] = [];
    const title: HTMLElement = createElement('h1', 'title-audio h1-lang', 'Аудиовызов');
    const subTitle: HTMLElement = createElement(
      'h5',
      'subtitle-audio h5-lang',
      'Попробуй угадать как можно больше слов на слух',
    );
    const levelBlock: HTMLElement = createElement('div', 'level-audio');

    while (randomPageArr.length < 15) {
      const randomPage = Math.floor(Math.random() * 29);
      if (!randomPageArr.includes(randomPage)) {
        randomPageArr.push(randomPage);
      }
    }

    const levelArr: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    // изменение цветов границ кнопок

    const classArr: string[] = [
      'waves-purple violet-border',
      'waves-yellow yellow-border',
      'waves-green green-border',
      'waves-teal blue-border',
      'waves-orange orange-border',
      'waves-red red-border',
    ];
    // const classArr: string[] = ['waves-purple', 'waves-yellow', 'waves-green',
    //                             'waves-teal', 'waves-orange','waves-red'];

    for (let i = 0; i <= 5; i += 1) {
      const btnLevel = createElement(
        'button',
        `audio-level-btn z-depth-2 waves-effect ${classArr[i]}`,
        `${levelArr[i]}`,
      );
      btnLevel.tabIndex = 0
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

}
