// HOST / Users/Words // м.б. УДАЛИТЬ потом этот объект
export type StatWord = {
  id: string; // userId
  wordId: string;
  difficulty: 'easy' | 'difficult' | 'normal';
  optional: {
    learned: 'yes' | 'no';
    learnDate: number; // Date.now()
    games: {
      [game: string]: { wins: number; total: number };
      // sprint: { wins: number; total: number };
      // audio: { wins: number; total: number };
      // phrase: { wins: number; total: number };
    };
    markedAsNew: boolean;
  };
};

// HOST / Users/Statistic
export type Stats = {
  learnedWords: number; // 0
  optional: {
    dateToday: string; // '29.8.22'
    today: {
      [game: string]: { newWords: number; bestSeries: number; wins: number; total: number };
      // sprint: { newWords: number; bestSeries: number; wins: number; total: number };
      // audio: { newWords: number; bestSeries: number; wins: number; total: number };
      // phrase: { newWords: number; bestSeries: number; wins: number; total: number };
    };
    long: {
      [date: string]: { newWords: number; learnedWords: number };
      // '29.8.22': { newWords: 5; learnedWords: 42 };
      // '1.9.22': { newWords: 3; learnedWords: 15 };
    };
  };
};
