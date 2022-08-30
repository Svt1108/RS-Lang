import { Assets, Method, ObjType, Path, UserWord, Word } from '../../types';

export const HOST = 'https://rslang-english-learnwords.herokuapp.com';

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

export const getRandomWords = async (randomPageArr: number[], level: number) => {
  const requests = randomPageArr.map((el) => fetch(`${HOST}${Path.words}?page=${el}&group=${level}`));
  return Promise.all(requests)
    .then((res) => res)
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((words) =>
      words.reduce((a, b) => {
        a.push(b);
        return a.flat(Infinity);
      }, []),
    );
};

export const getWordsFromBook = async (page: number, level: number) => {
  let i = page;
  const wordArr = [];
  while (i >= 0) {
    wordArr.push(fetch(`${HOST}${Path.words}?page=${i}&group=${level}`));
    i -= 1;
  }
  return Promise.all(wordArr)
    .then((res) => res)
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((words) =>
      words.reduce((a, b) => {
        a.push(b);
        return a.flat(Infinity);
      }, []),
    );
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
  };
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

// export const createUser = async (user: User) => {
//   const url = `${HOST}${Path.users}`;
//   const res = await fetch(url, {
//     method: Method.create,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });

//   const { ok, status } = res;
//   let data: CreateResponse | undefined;
//   if (ok) {
//     data = (await res.json()) as CreateResponse;
//   }

//   return { ok, status, data };
// };

// export const logUserIn = async (user: User) => {
//   const url = `${HOST}${Path.signin}`;
//   const res = await fetch(url, {
//     method: Method.create,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });

//   const { ok, status } = res;
//   let data: AuthResponse | undefined;
//   if (ok) {
//     data = (await res.json()) as AuthResponse;
//   }

//   return { ok, status, data };
// };

export const getUser = async (userId: string, token: string): Promise<ObjType> => {
  const url = `${HOST}${Path.users}/${userId}`;
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

export const getAllUserWords = async (userId: string, token: string) => {
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
  // const userWord = await url.json();
  const userWord = url.status !== 404 ? await url.json() : {};
  return userWord;
};

export const updateUserWord = async (userId: string, wordId: string, token: string, word: UserWord) => {
  // export const updateUserWord = async (userId: string, wordId: string, token: string, word: Partial<UserWord>) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.update,
    // method: Method.updatePatch,
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

// export const updateUserWordPatch = async (userId: string, wordId: string, token: string) => {
//   const url = await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
//     method: 'PATCH',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       difficulty: 'normal',
//     }),
//   });
//   const userWord = url.status !== 404 ? await url.json() : {};
//   return userWord;
// };

export const deleteUserWord = async (userId: string, wordId: string, token: string) => {
  await fetch(`${HOST}${Path.users}/${userId}${Path.words}/${wordId}`, {
    method: Method.delete,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

export const getUserStatistic = async (userId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.statistics}`, {
    method: Method.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const userStatistic = await url.json();
  return userStatistic;
};

export const updateUserStatistic = async (userId: string, token: string) => {
  const url = await fetch(`${HOST}${Path.users}/${userId}${Path.statistics}`, {
    method: Method.update,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const userStatistic = await url.json();
  return userStatistic;
};

export const getAggregatedHardWords = async (userId: string, token: string) => {
  const filter = encodeURIComponent(JSON.stringify({ 'userWord.difficulty': 'difficult' }));
  const url = `${HOST}${Path.users}/${userId}${Path.aggregatedWords}?filter=${filter}`;

  const rawRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const res = await rawRes.json(); // as ....Your Type

  return res;
};
