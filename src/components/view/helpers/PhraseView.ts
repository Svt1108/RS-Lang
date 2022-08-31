// import { WordPlusUserWord } from '../../types';
import { createElement } from './renderHelpers';

export class Phrase {
  // data: WordPlusUserWord;

  public onLearn?: () => void;
  phraseWrap: HTMLElement;
  // firstPart: string;

  constructor(content: HTMLElement, textExample: string, word: { numb: number; word: string }, ii: number) {
    //  this.data = data;

    console.log(ii);
    console.log(textExample);
    console.log(word);

    // console.log(this.data);
    // this.firstPart = this.data.textExample;

    this.phraseWrap = createElement('div', 'z-depth-2 phrase-wrap');
    content.appendChild(this.phraseWrap);

    this.setListeners();
  }

  private setListeners() {
    this.phraseWrap.onclick = () => this.onLearn?.();
  }
}
