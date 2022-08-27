import { HOST } from '../../model/helpers/apiHelpers';
import { WordPlusUserWord } from '../../types';
import { createElement } from './renderHelpers';

class Card {
  public onVolume?: () => void;
  data: WordPlusUserWord;
  volume: HTMLElement;
  audio: HTMLAudioElement;
  audioMeaning: HTMLAudioElement;
  audioExample: HTMLAudioElement;
  difficult: HTMLElement;
  learn: HTMLElement;

  public onDifficult?: () => void;
  public onLearn?: () => void;
  public onLearnDifficultLevel?: () => void;
  word: HTMLElement;
  card: HTMLElement;
  learnDifficultLevel: HTMLElement;

  //   public onRemove?: () => void;

  constructor(content: HTMLElement, data: WordPlusUserWord, level: number) {
    //  const HOST = 'https://rslang-english-learnwords.herokuapp.com';
    const userJSON = localStorage.getItem('user');
    this.data = data;

    this.card = createElement('div', 'card z-depth-2');
    content.appendChild(this.card);

    const wordImgWrap = createElement('div', 'word-img-wrap');
    this.card.appendChild(wordImgWrap);

    this.difficult = createElement('div', 'difficult tooltipped');
    if (userJSON && level !== 6) {
      if (this.data.difficulty && this.data.difficulty === 'difficult')
        this.difficult.style.backgroundImage = `url(../assets/svg/difficult-colored.svg)`;
      else this.difficult.style.backgroundImage = `url(../assets/svg/difficult.svg)`;
      this.difficult.setAttribute('data-position', 'left');
      this.difficult.setAttribute('data-tooltip', 'Сложно!');
      wordImgWrap.appendChild(this.difficult);
    }

    this.learn = createElement('div', 'learn tooltipped');
    if (userJSON && level !== 6) {
      if (this.data.optional && this.data.optional.learned === 'yes')
        this.learn.style.backgroundImage = `url(../assets/svg/learn-colored.svg)`;
      else this.learn.style.backgroundImage = `url(../assets/svg/learn.svg)`;
      this.learn.setAttribute('data-position', 'right');
      this.learn.setAttribute('data-tooltip', 'Изучено :)');
      wordImgWrap.appendChild(this.learn);
    }

    this.learnDifficultLevel = createElement('div', 'learn-difficult-level tooltipped');
    if (userJSON && level === 6) {
      this.learnDifficultLevel.style.backgroundImage = `url(../assets/svg/learn.svg)`;
      this.learnDifficultLevel.setAttribute('data-position', 'right');
      this.learnDifficultLevel.setAttribute('data-tooltip', 'Изучено :)');
      wordImgWrap.appendChild(this.learnDifficultLevel);
    }

    const wordWrap = createElement('div', 'word-wrap');
    wordImgWrap.appendChild(wordWrap);

    // const wordWrap = createElement('div', 'word-wrap');
    // cardContent.appendChild(wordWrap);

    this.word = createElement('p', 'grey-text text-darken-2 word', `${this.data.word}`);
    wordWrap.appendChild(this.word);

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
    this.card.appendChild(cardContent);

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

    const wordProgress = createElement('div', 'word-progress');
    wordProgress.innerHTML = `  <ul class="collapsible collapsible-lang">
    <li>
      <div class="collapsible-header collapsible-header-lang"><i class="material-icons grey-text text-darken-2">add_circle_outline</i>Статистика в играх</div>
      <div class="collapsible-body collapsible-body-lang"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    </ul>`;
    if (userJSON) cardContent.appendChild(wordProgress);

    //     var elem = document.querySelector('.collapsible.expandable');
    // var instance = M.Collapsible.init(elem, {
    //   accordion: false
    // });

    this.setListeners();

    //  M.AutoInit();
  }

  private setListeners() {
    this.volume.onclick = () => this.onVolume?.();

    this.difficult.onclick = () => this.onDifficult?.();

    this.learn.onclick = () => this.onLearn?.();

    this.learnDifficultLevel.onclick = () => this.onLearnDifficultLevel?.();

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
