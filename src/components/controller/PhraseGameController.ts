import { PhraseGameModel } from '../model/PhraseGameModel';
import { getAggregatedHardWords, getAllUserWords } from '../model/helpers/apiHelpers';
import { AggregatedWord, Optional, UserWordPlus, WordPlusUserWord } from '../types';
import { LoginData } from '../types/loginTypes';
import { PhraseGameView } from '../view/PhraseGameView';
import { refactorResponse } from './helpers/controlHelpers';
import { combineWords } from '../view/helpers/combineArr';

export class PhraseGameController {
  view;
  model;

  constructor(main: HTMLElement) {
    this.view = new PhraseGameView(main);
    this.model = new PhraseGameModel();
  }
  
  async show(level?: number, page?: number) {
    const userJSON = localStorage.getItem('user');
    const user: LoginData = JSON.parse(localStorage.getItem('user') as string);

    /* переход из учебника */
    if(page !== undefined && level !== undefined) { 
        /* пользователь залогинен => слова из этого раздела, кроме изученных */
        if (userJSON && level !== 6) {            /* ******** переход из обычного раздела */
          const data = await this.model.getGameData(page, level);
          const userWords: UserWordPlus[] = await getAllUserWords(user.id, user.token);
          const tempObj = combineWords(data, userWords);
          const userRes: WordPlusUserWord[] = tempObj.combinedArr;
          const userRes1 = userRes.filter((item) => (!(<Optional>item.optional) || ((<Optional>item.optional) && <Optional>item.optional).learned === 'no'));          
          this.view.render(userRes1, user);  
        }
              /* переход из Сложные слова => все сложные слова */
        else if (userJSON && level === 6) {
          const temp = await getAggregatedHardWords(user.id, user.token);
          const userRes: AggregatedWord[] = temp[0].paginatedResults;
          const userResNew = refactorResponse(userRes);
          this.view.render(userResNew, user);
        }
        /* *********** пользователь не залогинен => слова из этого раздела */
        else
        {        
         const data = await this.model.getGameData(page, level);
         this.view.render(data);
        }
    } 
    /* переход из меню => выбор слов будет дальше по аналогии с блоками ******** */
    else if (page === undefined || level === undefined){
      if(userJSON) this.view.render(undefined, user);
      else this.view.render();
    }
  }

  stopGame() {
    this.view.stopGame()
  }
}
