import { Assets, Method, ObjType, Path, User, UserWord, Word } from "../../types";

const HOST = 'https://rslang-english-learnwords.herokuapp.com'

export const getWords = async (page = 0, level = 0): Promise<Word[]> => {
  const url = `${HOST}${Path.words}?page=${page}&group=${level}`;
  const res: Response = await fetch(url);
  const wordsArr: Word[] = await res.json();
  return wordsArr;
};

export const getWord = async (wordId: string): Promise<Word> => {
  const url = `${HOST}${Path.words}/${wordId}`;
  const res: Response = await fetch(url);
  const word: Word = await res.json();
  return word;
};

export const getAssets = async (wordId: string): Promise<Assets> => {
  const url = `${HOST}${Path.words}/${wordId}`;
  const res: Response = await fetch(url);
  const word: Word = await res.json();
  return {
    image: `${HOST}/${word.image}`,
    audio: `${HOST}/${word.audio}`,
    audioMeaning: `${HOST}/${word.audioMeaning}`,
    audioExample: `${HOST}/${word.audioExample}`,
  }
};

export const createUser = async (user: User): Promise<ObjType> => {
  const url = `${HOST}${Path.users}`;
  const res: Response = await fetch(url, {
    method: Method.create,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  });
  const newUser: ObjType = await res.json();
  return newUser;
};

export const getLoginUser = async (user: User): Promise<ObjType> => {
  const url = `${HOST}${Path.signin}`;
  const res: Response = await fetch(url, {
    method: Method.create,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  });
  const loginUser: ObjType = await res.json();
  return loginUser;
};

export const getUser = async (userId: string, token: string): Promise<ObjType> => {
  const url = `${HOST}${Path.users}/${userId}`;
  const res: Response = await fetch(url, {
    method: Method.get,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  const user: ObjType = await res.json();
  return user;
};

export const createUserWord = async (userId: string, wordId: string, token: string, word: UserWord) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.create,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const userWord = await url.json();
  return userWord;
};

export const getAllUserWords = async (userId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}`, {
    method: Method.get,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  const userWords = await url.json();
  return userWords;
};

export const getUserWord = async (userId: string, wordId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.get,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  const userWord = await url.json();
  return userWord;
};

export const updateUserWord = async (userId: string, wordId: string, token: string, word: UserWord) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.update,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const userWord = await url.json();
  return userWord;
};

export const deleteUserWord = async (userId: string, wordId: string, token: string) => {
  await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.delete,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
};

export const getUserStatistic = async (userId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.statistics}`, {
    method: Method.get,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  const userStatistic = await url.json();
  return userStatistic;
};

export const updateUserStatistic = async (userId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.statistics}`, {
    method: Method.update,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  const userStatistic = await url.json();
  return userStatistic;
};
