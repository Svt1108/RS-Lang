import { HOST } from '../../model/helpers/apiHelpers';
import { Word } from '../../types';
import { createElement } from './renderHelpers';

class Card {
  public onVolume?: () => void;
  data: Word;
  volume: HTMLElement;
  audio: HTMLAudioElement;
  audioMeaning: HTMLAudioElement;
  audioExample: HTMLAudioElement;
  difficult: HTMLElement;
  learn: HTMLElement;

  public onDifficult?: () => void;
  public onLearn?: () => void;

  //   public onRemove?: () => void;

  constructor(content: HTMLElement, data: Word) {
    //  const HOST = 'https://rslang-english-learnwords.herokuapp.com';
    this.data = data;

    const card = createElement('div', 'card z-depth-2');
    content.appendChild(card);

    const wordImgWrap = createElement('div', 'word-img-wrap');
    card.appendChild(wordImgWrap);

    this.difficult = createElement('div', 'difficult tooltipped');
    this.difficult.style.backgroundImage = `url(../assets/svg/difficult-colored.svg)`;
    this.difficult.setAttribute('data-position', 'left');
    this.difficult.setAttribute('data-tooltip', 'Сложно!');
    wordImgWrap.appendChild(this.difficult);

    this.learn = createElement('div', 'learn tooltipped');
    this.learn.style.backgroundImage = `url(../assets/svg/learn-colored.svg)`;
    this.learn.setAttribute('data-position', 'right');
    this.learn.setAttribute('data-tooltip', 'Изучено :)');
    wordImgWrap.appendChild(this.learn);

    const wordWrap = createElement('div', 'word-wrap');
    wordImgWrap.appendChild(wordWrap);

    // const wordWrap = createElement('div', 'word-wrap');
    // cardContent.appendChild(wordWrap);

    const word = createElement('p', 'grey-text text-darken-2 word', `${this.data.word}`);
    wordWrap.appendChild(word);

    const transcription = createElement('p', 'grey-text text-darken-2 p-lang', `${this.data.transcription}`);
    wordWrap.appendChild(transcription);

    this.volume = createElement('i', 'tiny material-icons volume-up', `volume_up`);
    transcription.appendChild(this.volume);

    this.audio = createElement('audio', '') as HTMLAudioElement;
    this.audio.src = `${HOST}/${this.data.audio}`;
    this.volume.appendChild(this.audio);

    this.audioMeaning = createElement('audio', '') as HTMLAudioElement;
    this.audioMeaning.src = `${HOST}/${this.data.audioMeaning}`;
    this.volume.appendChild(this.audioMeaning);

    this.audioExample = createElement('audio', '') as HTMLAudioElement;
    this.audioExample.src = `${HOST}/${this.data.audioExample}`;
    this.volume.appendChild(this.audioExample);

    const wordTranslate = createElement('p', 'grey-text text-darken-2 word-translate');
    wordTranslate.innerHTML = `${this.data.wordTranslate}`;
    wordWrap.appendChild(wordTranslate);

    const cardImage = createElement('div', 'z-depth-1 card-image');
    cardImage.style.backgroundImage = `url(${HOST}/${this.data.image})`;
    wordImgWrap.appendChild(cardImage);

    // audio.play();

    const cardContent = createElement('div', 'card-content');
    card.appendChild(cardContent);

    // const divider = createElement('div', 'divider divider-lang');
    // cardContent.appendChild(divider);

    const meaning = createElement('p', 'grey-text text-darken-2 meaning p-lang', `Значение:`);
    cardContent.appendChild(meaning);

    const textMeaning = createElement('p', 'grey-text text-darken-2 p-lang');
    textMeaning.innerHTML = this.data.textMeaning;
    cardContent.appendChild(textMeaning);

    const textMeaningTranslate = createElement(
      'p',
      'grey-text text-darken-2 p-lang',
      `${this.data.textMeaningTranslate}`,
    );
    cardContent.appendChild(textMeaningTranslate);

    const divider1 = createElement('div', 'divider divider-lang');
    cardContent.appendChild(divider1);

    const example = createElement('p', 'grey-text text-darken-2 example p-lang', `Пример:`);
    cardContent.appendChild(example);

    const textExample = createElement('p', 'grey-text text-darken-2 p-lang');
    textExample.innerHTML = this.data.textExample;
    cardContent.appendChild(textExample);

    const textExampleTranslate = createElement(
      'p',
      'grey-text text-darken-2 p-lang',
      `${this.data.textExampleTranslate}`,
    );
    cardContent.appendChild(textExampleTranslate);

    this.setListeners();
  }

  private setListeners() {
    this.volume.onclick = () => this.onVolume?.();

    this.difficult.onclick = () => this.onDifficult?.();

    this.learn.onclick = () => this.onLearn?.();

    //     this.remove.node.onclick = () => {
    //       if (this.remove.node.classList.contains('blocked')) return;
    //       this.onRemove?.();
    //     };
    //     this.startBtn.node.onclick = () => {
    //       if (this.startBtn.node.classList.contains('blocked')) return;
    //       this.onStart?.();
    //     };
    //     this.pauseBtn.node.onclick = () => {
    //       if (this.pauseBtn.node.classList.contains('blocked')) return;
    //       this.onPause?.();
    //     };
    //     this.stopBtn.node.onclick = () => {
    //       if (this.stopBtn.node.classList.contains('blocked')) return;
    //       this.onStop?.();
    //     };
  }
}

export default Card;
