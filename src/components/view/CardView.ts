import { HOST } from '../model/helpers/apiHelpers';
import { Word } from '../types';
import { createElement } from './helpers/renderHelpers';

class Card {
  public onDifficult?: () => void;
  data: Word;

  //   public onStop?: () => void;

  //   public onSelect?: () => void;

  //   public onRemove?: () => void;

  constructor(content: HTMLElement, data: Word) {
    //  const HOST = 'https://rslang-english-learnwords.herokuapp.com';
    this.data = data;

    const card = createElement('div', 'card z-depth-2');
    content.appendChild(card);

    const cardImage = createElement('div', 'card-image');
    cardImage.style.backgroundImage = `url(${HOST}/${this.data.image})`;
    card.appendChild(cardImage);

    const cardContent = createElement('div', 'card-content');
    card.appendChild(cardContent);

    const word = createElement('p', 'grey-text text-darken-2', `${this.data.word}`);
    cardContent.appendChild(word);

    const transcription = createElement('p', 'grey-text text-darken-2', `${this.data.transcription}`);
    cardContent.appendChild(transcription);

    const wordTranslate = createElement('p', 'grey-text text-darken-2', `${this.data.wordTranslate}`);
    cardContent.appendChild(wordTranslate);

    const divider = document.createElement('div');
    divider.classList.add('divider');
    cardContent.appendChild(divider);

    const meaning = createElement('p', 'grey-text text-darken-2', `Значение:`);
    cardContent.appendChild(meaning);

    const textMeaning = createElement('p', 'grey-text text-darken-2', `${this.data.textMeaning}`);
    cardContent.appendChild(textMeaning);

    const textMeaningTranslate = createElement('p', 'grey-text text-darken-2', `${this.data.textMeaningTranslate}`);
    cardContent.appendChild(textMeaningTranslate);

    const example = createElement('p', 'grey-text text-darken-2', `Пример:`);
    cardContent.appendChild(example);

    const textExample = createElement('p', 'grey-text text-darken-2', `${this.data.textExample}`);
    cardContent.appendChild(textExample);

    const textExampleTranslate = createElement('p', 'grey-text text-darken-2', `${this.data.textExampleTranslate}`);
    cardContent.appendChild(textExampleTranslate);

    // this.dataGarage = dataGarage;
    // this.data = data;
    // this.templateSvg = new Template();
    // const item = new Control(content, "div", "item");
    // const topMenu = new Control(item.node, "div", "top-menu");
    // this.select = new Control(topMenu.node, "div", "btn select", "Select");
    // this.remove = new Control(topMenu.node, "div", "btn remove", "Remove");
    // this.model = new Control(topMenu.node, "div", "model", `${data.name}`);
    // const mainPart = new Control(item.node, "div", "main-part");
    // const sideMenu = new Control(mainPart.node, "div", "side-menu");
    // this.startBtn = new Control(sideMenu.node, "div", "btn-circle start");
    // this.pauseBtn = new Control(
    //   sideMenu.node,
    //   "div",
    //   "btn-circle pause blocked"
    // );
    // this.stopBtn = new Control(sideMenu.node, "div", "btn-circle stop blocked");
    // this.carImage = new Control(mainPart.node, "div", "car-image");
    // this.carImage.node.innerHTML = this.templateSvg.makeTemplate(
    //   this.data.color
    // );
    // this.flag = new Control(mainPart.node, "div", "flag");
    // this.road = new Control(item.node, "div", "road");
    // this.setListeners();
  }

  //   private setListeners() {
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
  //   }
}

export default Card;
