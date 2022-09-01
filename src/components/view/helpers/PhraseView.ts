// import { WordPlusUserWord } from '../../types';
import { createElement } from './renderHelpers';

export class Phrase {
  // data: WordPlusUserWord;

 // public onLearn?: () => void;
  public onDragenter?: () => void;
 // public onDragover?: () => void;
  public onDragleave?: () => void;
  public onDrop?: () => void;

  public onDragenterS?: () => void;
  public onDragoverS?: () => void;
  public onDragleaveS?: () => void;
  public onDropS?: () => void;

  public onDragstart?: () => void;
  public onDragend?: () => void;

  phraseWrap: HTMLElement;
  firstPart: HTMLElement;
  textExampleWrap: HTMLElement;
  back: HTMLElement;
  secondPart: HTMLElement;
  numPart: HTMLElement;
  wordWrap: HTMLElement;
  backStart: HTMLElement;
  item: HTMLElement;

  constructor(content: HTMLElement, textExample: string, word: { numb: number; word: string }, ii: number) {
    //  this.data = data;

    // console.log(ii);
    // console.log(textExample);
    // console.log(word);

    const textExampleArr = textExample.replace('</b>', '<b>').split('<b>');
    // console.log(textExampleArr);

    // console.log(this.data);

    this.phraseWrap = createElement('div', 'z-depth-2 phrase-wrap');
    content.appendChild(this.phraseWrap);

    this.textExampleWrap = createElement('div', 'text-example-wrap');
    this.phraseWrap.appendChild(this.textExampleWrap);

    this.numPart = createElement('div', '', `${ii+1}.`);
    this.textExampleWrap.appendChild(this.numPart);

    this.firstPart = createElement('div', '', `${textExampleArr[0]}`);
    this.textExampleWrap.appendChild(this.firstPart);

    this.back = createElement('div', 'back');
    this.textExampleWrap.appendChild(this.back);
    this.back.setAttribute("data-numb", `${ii}`);
    // this.back.setAttribute("data-occupate", `no`); 

    this.secondPart = createElement('div', '', `${textExampleArr[2]}`);
    this.textExampleWrap.appendChild(this.secondPart);

    this.wordWrap = createElement('div', 'word-wrap');
    this.phraseWrap.appendChild(this.wordWrap);

    this.backStart = createElement('div', 'back back-start');
    this.wordWrap.appendChild(this.backStart);
    // this.backStart.setAttribute("data-occupate", `no`); 

    this.item = createElement('div', 'item z-depth-3', `${word.word}`);
    this.backStart.append(this.item);
    this.item.draggable = true;
    this.item.setAttribute("data-numb", `${word.numb}`); 

    this.setListeners();
  }

  private setListeners() {
   // this.phraseWrap.onclick = () => this.onLearn?.();

    this.back.ondragenter = () => this.onDragenter?.();
   // this.back.ondragover = () => this.onDragover?.();
    this.back.ondragleave = () => this.onDragleave?.();
    this.back.ondrop = () => this.onDrop?.();
    this.back.addEventListener('dragover', (event) => event.preventDefault() )

    this.backStart.ondragenter = () => this.onDragenterS?.();
   // this.backStart.ondragover = () => this.onDragoverS?.();
    this.backStart.ondragleave = () => this.onDragleaveS?.();
    this.backStart.ondrop = () => this.onDropS?.();
    this.backStart.addEventListener('dragover', (event) => event.preventDefault() )

    this.item.ondragstart = () => this.onDragstart?.();
    this.item.ondragend = () => this.onDragend?.();
    

    // this.backStart.addEventListener('dragenter', dragenter)
    // this.backStart.addEventListener('dragover', dragover)
    // this.backStart.addEventListener('dragleave', dragleave)
    // this.backStart.addEventListener('drop', dragdrop)
  }
}

