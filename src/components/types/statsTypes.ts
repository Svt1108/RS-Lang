// HOST / Users/Words
export type StatWord = {
  id: string; // userId
  wordId: string;
  difficulty: 'easy' | 'difficult' | 'normal';
  optional: {
    learned: 'yes' | 'no';
    learnDate: number;
    games: {
      sprint: { wins: number; total: number };
      audio: { wins: number; total: number };
    };
    markedAsNew: boolean;
  };
};

// HOST / Users/Statistic
export type Stats = {
  learnedWords: 0;
  optional: {
    today: {
      sprint: { newWords: number; bestSeries: number; wins: number; total: number };
      audio: { newWords: number; bestSeries: number; wins: number; total: number };
    };
    long: {
      '28.08.2022': { newWords: number; learnedWords: number };
      '01.09.2022': { newWords: number; learnedWords: number };
    };
  };
};
