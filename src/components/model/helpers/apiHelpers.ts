import { Assets, Method, ObjType, Path, Word } from "../../types";

const HOST = 'https://rslang-english-learnwords.herokuapp.com'

export const getWords = async (page = 0, group = 0): Promise<Word[]> => {
  const URL = `${HOST}${Path.words}?page=${page}&group=${group}`;
  const RES: Response = await fetch(URL);
  const WORDS_ARR: Word[] = await RES.json();
  return WORDS_ARR;
};

export const getWord = async (id: string): Promise<Word> => {
  const URL = `${HOST}${Path.words}/${id}`;
  const RES: Response = await fetch(URL);
  const WORD: Word = await RES.json();
  return WORD;
};

export const getAssets = async (id: string): Promise<Assets> => {
  const URL_WORDS = `${HOST}${Path.words}/${id}`;
  const RES: Response = await fetch(URL_WORDS);
  const WORD: Word = await RES.json();
  return {
    image: `${HOST}/${WORD.image}`,
    audio: `${HOST}/${WORD.audio}`,
    audioMeaning: `${HOST}/${WORD.audioMeaning}`,
    audioExample: `${HOST}/${WORD.audioExample}`,
  }
};

export const createUser = async (name: string, email: string, password: string): Promise<ObjType> => {
  const URL = `${HOST}${Path.users}`;
  const RES: Response = await fetch(URL, {
    method: Method.create,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
    }),
  });
  const NEW_USER: ObjType = await RES.json();
  return NEW_USER;
};

export const getLoginUser = async (name: string, email: string, password: string): Promise<ObjType> => {
  const URL = `${HOST}${Path.signin}`;
  const RES: Response = await fetch(URL, {
    method: Method.create,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
    }),
  });
  const LOGIN_USER: ObjType = await RES.json();
  return LOGIN_USER;
};

export const getUser = async (id: string, token: string): Promise<ObjType> => {
  const URL = `${HOST}${Path.users}/${id}`;
  const RES: Response = await fetch(URL, {
    method: Method.get,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  const USER: ObjType = await RES.json();
  return USER;
};
