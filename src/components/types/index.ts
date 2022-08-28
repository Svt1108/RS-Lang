export interface Word {
  // optional: { learned: boolean; learnDate: Date; };
  // difficulty: string;
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface Assets {
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
}

export interface User {
  email: string;
  password: string;
  name?: string;
}

export type ObjType = {
  [key: string]: string;
};

export enum Path {
  words = '/words',
  users = '/users',
  aggregatedWords = '/aggregatedWords',
  statistics = '/statistics',
  settings = '/settings',
  signin = '/signin',
  tokens = '/tokens',
}

export enum Method {
  get = 'GET',
  create = 'POST',
  update = 'PUT',
  delete = 'DELETE',
  updatePatch = 'PATCH',
}

export interface UserWord {
  difficulty: string;
  optional: { learned: string; learnDate: Date };
}

export interface MixWordsSprint {
  audio: string;
  en: string;
  ru: string;
  match: boolean;
}

export interface MixWordsAudio {
  image: string,
  audio: string;
  en: string;
  tr: string;
  ru: string;
  ruRandom: string[];
}

export interface UserWordPlus {
  difficulty: string;
  id: string;
  optional: { learned: string; learnDate?: Date };
  wordId: string;
}
// export const HOST = 'https://rslang-english-learnwords.herokuapp.com';

export interface WordPlusUserWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  optional?: { learned: string; learnDate?: Date };
  difficulty?: string;
  //  wordExists?: boolean;
}

export enum Difficulty {
  'difficult',
  'easy',
}

export enum Learn {
  'yes',
  'no',
}
