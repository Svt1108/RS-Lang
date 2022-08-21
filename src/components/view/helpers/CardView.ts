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

  // public onStop?: () => void;

  //   public onSelect?: () => void;

  //   public onRemove?: () => void;

  constructor(content: HTMLElement, data: Word) {
    //  const HOST = 'https://rslang-english-learnwords.herokuapp.com';
    this.data = data;

    const card = createElement('div', 'card vertical-card z-depth-2');
    content.appendChild(card);

    const cardImage = createElement('div', 'card-image');
    cardImage.style.backgroundImage = `url(${HOST}/${this.data.image})`;
    card.appendChild(cardImage);

    const cardContent = createElement('div', 'card-content');
    card.appendChild(cardContent);

    const wordWrap = createElement('div', 'word-wrap');
    cardContent.appendChild(wordWrap);

    const word = createElement('p', 'grey-text text-darken-2 word', `${this.data.word}`);
    wordWrap.appendChild(word);

    const wordTranslate = createElement('p', 'grey-text text-darken-2 word-translate');
    wordTranslate.innerHTML = `&nbsp;&nbsp;-&nbsp;&nbsp;${this.data.wordTranslate}`;
    wordWrap.appendChild(wordTranslate);

    const transcription = createElement('p', 'grey-text text-darken-2 p-lang', `${this.data.transcription}`);
    cardContent.appendChild(transcription);

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

    // audio.play();

    const divider = createElement('div', 'divider divider-lang');
    cardContent.appendChild(divider);

    // const meaning = createElement('p', 'grey-text text-darken-2 meaning', `Значение:`);
    // cardContent.appendChild(meaning);

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

    // const example = createElement('p', 'grey-text text-darken-2 example', `Пример:`);
    // cardContent.appendChild(example);

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

    //     this.select.node.onclick = () => {
    //       if (this.select.node.classList.contains('blocked')) return;
    //       this.onSelect?.();
    //       this.select.node.classList.add('selected');
    //     };
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
