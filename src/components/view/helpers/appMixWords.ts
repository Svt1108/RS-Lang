import { MixWords, Word } from "../../types";

export const getMixWords = (wordsArr: Word[]): MixWords[] => {
  const res = wordsArr.map((w, i) => {
    if (Math.random() < 0.5) {
      return { en: w.word, ru: w.wordTranslate, match: true };
    } 

    const newIdx: number = Math.floor(Math.random() * wordsArr.length);
    const match: boolean = newIdx === i;

    return {
      en: w.word,
      ru: wordsArr[newIdx].wordTranslate,
      match,
    };
    
  });
  
  return res;
}