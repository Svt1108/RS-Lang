import { MixWordsAudio, MixWordsSprint, Word } from "../../types";

export const getMixWordsForSprint = (wordsArr: Word[]): MixWordsSprint[] => {
  const res = wordsArr.map((w, i) => {
    if (Math.random() < 0.5) {
      return { audio: w.audio, en: w.word, ru: w.wordTranslate, match: true };
    } 

    const newIdx: number = Math.floor(Math.random() * wordsArr.length);
    const match: boolean = newIdx === i;

    return {
      audio: w.audio,
      en: w.word,
      ru: wordsArr[newIdx].wordTranslate,
      match,
    };
    
  });
  
  return res;
}

const shuffle = (array: string[]): string[] =>  array.sort(() => Math.random() - 0.5);

const sortRandom = (array: MixWordsAudio[]): MixWordsAudio[] =>  array.sort(() => Math.random() - 0.5);

export const getMixWordsForAudio = (wordsArr: Word[]): MixWordsAudio[] => {

  const res = wordsArr.map((w) => {

    const randomArr: number[] = [];

    while (randomArr.length < 4) {
      const newIdx: number = Math.floor(Math.random() * wordsArr.length);
      if (!randomArr.includes(newIdx)) {
        randomArr.push(newIdx)
      }
    }
   
    return {
      image: w.image,
      audio: w.audio,
      en: w.word,
      tr: w.transcription,
      ru: w.wordTranslate,
      ruRandom: shuffle([w.wordTranslate, 
          wordsArr[randomArr[0]].wordTranslate, 
          wordsArr[randomArr[1]].wordTranslate, 
          wordsArr[randomArr[2]].wordTranslate, 
          wordsArr[randomArr[3]].wordTranslate]), 
      };
    
  });
  
  return sortRandom(res);
}
