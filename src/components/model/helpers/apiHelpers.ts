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

export const createUser = async (data: {[key: string]: string}) => {
    const URL = `${HOST}${PATH.users}`;
    const RES = await fetch(URL, {
      method: METHOD.create,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const newUser = await RES.json();
    return newUser;
};

export const getLoginUser = async (user: {[key: string]: string}) => {
   const URL = `${HOST}${PATH.signin}`;
    const RES = await fetch(URL, {
      method: METHOD.create,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    const loginUser = await RES.json();
    console.log(loginUser);
};

export const getUser = async (id: string, token: string) => {
    const URL = `${HOST}${PATH.users}/${id}`;
    const RES = await fetch(URL, {
      method: METHOD.get,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    const USER = await RES.json();
    console.log(USER);
};
