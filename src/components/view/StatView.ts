// import { createElement } from './helpers/renderHelpers';

// import { Route } from '../types/appRoutes';

export class MainView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render() {
    this.mainDiv.innerHTML = `<div id="index-banner" class="parallax-container valign-wrapper top-img-stat">
    <div class="section no-pad-bot ">
      <div class="container">
        <h4 class="header center white-text h4-lang">Статистика за сегодня</h4>
       </div>
    </div>
       <div class="parallax"><img src="assets/images/stat/circles-1.jpg" alt="circles" class = "img-parallax"></div>
  </div>

  <div id="day-stat" class="container scrollspy">
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

  <div class="parallax-container valign-wrapper center-img-stat">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="row center">
          <h4 class="header center white-text h4-lang">Общая статистика</h4>
        </div>
      </div>
    </div>
    <div class="parallax"><img src="assets/images/stat/houses.jpg" alt="big ben" class = "img-parallax"></div>
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
    <div class="parallax"><img src="assets/images/stat/hogwards.jpg" alt="castle" class = "img-parallax"></div>
  </div>
  
<div class="col m3 l2 scroll-stat">
  <ul class="section table-of-contents">
    <li><a href="#day-stat">Статистика за сегодня</a></li>
    <li><a href="#all-stat">Общая статистика</a></li>
  </ul>
</div>
  
  `;
  }
}
