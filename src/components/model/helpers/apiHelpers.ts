const HOST = 'https://rslang-english-learnwords.herokuapp.com'

export const PATH: {[key: string]: string} = {
  words: '/words/',
  users: '/users',
  aggregatedWords: '/aggregatedWords',
  statistics: '/statistics',
  settings: '/settings',
  signin: '/signin',
  tokens: '/tokens',
};

export const METHOD: {[key: string]: string} = {
  get: 'GET',
  create: 'POST',
  update: 'PUT',
  delete: 'DELETE',
  engineStatus: 'PATCH',
};

export const getWords = async (page = 0, group = 0): Promise<void> => {
  const URL = `${HOST}${PATH.words}?page=${page}&group=${group}`;
  const RES: Response = await fetch(URL);
  const WORDS_ARR = await RES.json();
  console.log(WORDS_ARR);
};

export const getWord = async (id: string) => {
    const URL = `${HOST}${PATH.words}/${id}`;
    const RES = await fetch(URL);
    const WORD = await RES.json();
    return WORD;
};
