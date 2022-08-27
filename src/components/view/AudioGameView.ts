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
    this.stateGame = createElement('div', 'sprint_game-content');
    this.controlBlock = createElement('div', 'sprint_controll');
    this.againGame = createElement('button', 
      'waves-effect waves-light btn right-sptint-btn end', 'сыграть еще раз');
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
    const sprint = createElement('div', 'sprint');
    const mainImg = <HTMLImageElement>createElement('img', 'img-sprint');
    const soundImg = createElement('button', 'sprint_sound');
    const fullscreenImg = createElement('button', 'sprint_fullscreen');
    const crossImg = createElement('button', 'sprint_cross');
    mainImg.src = './assets/images/bridge.jpg';

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
        soundImg.classList.add('sprint_not-sound');
      } else {
        this.sound = true;
        soundImg.classList.remove('sprint_not-sound');
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
    sprint.append(mainImg);
    this.controlBlock.appendChild(soundImg);
    this.controlBlock.append(fullscreenImg);
    this.controlBlock.appendChild(crossImg);
    this.mainDiv.append(this.controlBlock);
    this.mainDiv.append(sprint);
    if (data) {
      this.mainDiv.append(this.startGameFromBook(data));
      this.againGame.onclick = () => {this.startGameFromBook(data)} 
      
    } else {
      this.mainDiv.append(this.startGameFromMenu());
      this.againGame.onclick = () => {this.startGameFromMenu()} 
    }
  }

 
}
