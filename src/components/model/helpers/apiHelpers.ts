import { Method, ObjType, Path, User, UserWord, Word } from '../../types';

export const HOST = 'https://rslang-english-learnwords.herokuapp.com';

export const getWords = async (page = 0, group = 0): Promise<Word[]> => {
  const url = `${HOST}${Path.words}?page=${page}&group=${group}`;
  const res: Response = await fetch(url);
  const wordsArr: Word[] = await res.json();
  return wordsArr;
};

export const getWord = async (id: string): Promise<Word> => {
  const url = `${HOST}${Path.words}/${id}`;
  const res: Response = await fetch(url);
  const word: Word = await res.json();
  return word;
};

// export const getAssets = async (id: string): Promise<Assets> => {
//   const url = `${HOST}${Path.words}/${id}`;
//   const res: Response = await fetch(url);
//   const word: Word = await res.json();
//   return {
//     image: `${HOST}/${word.image}`,
//     audio: `${HOST}/${word.audio}`,
//     audioMeaning: `${HOST}/${word.audioMeaning}`,
//     audioExample: `${HOST}/${word.audioExample}`,
//   };
// };

export const createUser = async (user: User): Promise<ObjType> => {
  const url = `${HOST}${Path.users}`;
  const res: Response = await fetch(url, {
    method: Method.create,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const loginUser: ObjType = await res.json();
  return loginUser;
};

export const getUser = async (id: string, token: string): Promise<ObjType> => {
  const url = `${HOST}${Path.users}/${id}`;
  const res: Response = await fetch(url, {
    method: Method.get,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const user: ObjType = await res.json();
  return user;
};

export const createUserWord = async (userId: string, wordId: string, token: string, word: UserWord) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.create,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const userWord = await url.json();
  return userWord;
};

export const getAllUserWord = async (userId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}`, {
    method: Method.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const userWords = await url.json();
  return userWords;
};

export const getUserWord = async (userId: string, wordId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const userWord = await url.json();
  return userWord;
};

export const updateUserWord = async (userId: string, wordId: string, token: string, word: UserWord) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.update,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const userWord = await url.json();
  return userWord;
};

export const deleteUserWord = async (userId: string, wordId: string, token: string) => {
  await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.delete,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
