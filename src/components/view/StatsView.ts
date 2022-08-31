import { Stats } from '../types/statsTypes';

export class StatView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(stats: Stats) {
    console.log(stats);

    this.mainDiv.innerHTML = `
<div id="index-banner" class="parallax-container valign-wrapper top-img-stat">

  <div class="section no-pad-bot ">
    <div class="container">
      <h4 class="header center white-text h4-lang">Статистика за сегодня</h4>
    </div>
  </div>

  <div class="parallax">
    <img src="assets/images/stat/circles-1.jpg" alt="circles" class = "img-parallax">
  </div>

</div>

<div id="day-stat" class="container scrollspy">
  <div class="center stat-day-wrap section-stat">
    <div class = "card z-depth-2 center stat-day">



      <div class="stat_card">
        <div class="stat_card_heading">
          <span class="stat_card_img"><div class="game-picture stat_btn-total"></div></span>
          <span class="stat_card_title">Итого по словам</span>
        </div>
        <div class="stats_list">
          <div class="stat_text_container"><span>Изученных слов</span><span class="stat_num orange-text text-darken-3">5</span></div>
          <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
          <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">21%</span></div>
        </div>
      </div>
      <div class="stat_card">
        <div class="stat_card_heading">
          <span class="stat_card_img"><div class="game-picture btn-sprint"></div></span>
          <span class="stat_card_title">Спринт</span>
        </div>
        <div class="stats_list">
        <div class="stat_text_container"><span>Лучшая серия</span><span class="stat_num light-green-text text-darken-3">8</span></div>
        <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
        <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">47%</span></div>
        </div>
      </div>
      <div class="stat_card">
        <div class="stat_card_heading">
          <span class="stat_card_img"><div class="game-picture btn-audio"></div></span>
          <span class="stat_card_title">Аудио-Вызов</span>
        </div>
        <div class="stats_list">
        <div class="stat_text_container"><span>Лучшая серия</span><span class="stat_num light-green-text text-darken-3">8</span></div>
          <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
          <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">47%</span></div>
        </div>
      </div>
      <div class="stat_card">
        <div class="stat_card_heading">
          <span class="stat_card_img"><div class="game-picture btn-collection"></div></span>
          <span class="stat_card_title">Фразы</span>
        </div>
        <div class="stats_list">
        <div class="stat_text_container"><span>Лучшая серия</span><span class="stat_num light-green-text text-darken-3">8</span></div>
          <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
          <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">47%</span></div>
        </div>
      </div>
     


    </div>
  </div>
</div>

<div class="parallax-container valign-wrapper center-img-stat">
  <div class="section no-pad-bot">
    <div class="container">
      <div class="row center">
        <h4 class="header center white-text h4-lang">Статистика за все время</h4>
      </div>
    </div>
  </div>
  <div class="parallax">
    <img src="assets/images/stat/houses.jpg" alt="big ben" class = "img-parallax">
  </div>
</div>

<div id="all-stat" class="container scrollspy">
  <div class="center stat-day-wrap section-stat">
    <div class = "card z-depth-2 center stat-day">



      <div class = "cards-stat-wrap">
          <div class = "card card-stat card-stat-small">Text example</div>
          <div class = "card card-stat card-stat-large">Text example</div>
      </div>
      <div class = "cards-stat-wrap">
          <div class = "card card-stat">Text example</div>
          <div class = "card card-stat">Text example</div>
      </div>
      <div class = "cards-stat-wrap">
          <div class = "card card-stat">Text example</div>
          <div class = "card card-stat">Text example</div>
      </div>



    </div>
  </div>
</div>

<div class="parallax-container valign-wrapper">
  <div class="section no-pad-bot">
    <div class="container">
      <div class="row center">
        <h5 class="header light h5-lang">А теперь на тренировку :)</h5>
      </div>
    </div>
  </div>
  <div class="parallax">
    <img src="assets/images/stat/hogwards.jpg" alt="castle" class = "img-parallax">
  </div>
</div>
  
<div class="col m3 l2 scroll-stat">
  <ul class="section table-of-contents">
    <li><a href="#day-stat">За сегодня</a></li>
    <li><a href="#all-stat">За все время</a></li>
  </ul>
</div>
`;
  }
}
