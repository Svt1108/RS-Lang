import { BarChart, LineChart, easings } from 'chartist';
import {
  createTopImg,
  createTodayStats,
  createMidImg,
  createLongStats,
  createBottomImg,
  createScrollSpy,
} from './helpers/statRenderHelpers';
import { Stats } from '../types/statsTypes';

export class StatView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(stats: Stats) {
    console.log(stats);

    // Render_Page
    const topImg = createTopImg();
    const todayStats = createTodayStats(stats);
    const midImg = createMidImg();
    const longStats = createLongStats();
    const bottomImg = createBottomImg();
    const scrollSpy = createScrollSpy();

    this.mainDiv.innerHTML = '';
    this.mainDiv.append(topImg, todayStats, midImg, longStats, bottomImg, scrollSpy);

    // Handle_Graphs
    // sortLong
    // makeDateLabelsArr
    // makeDataSeriesArr ?
    // count divider
    // enable BarSeries(labels, dataArr?, divider);
    // enable BarSeries(labels, dataArr?, divider);

    //     this.mainDiv.innerHTML = `
    // <div id="index-banner" class="parallax-container valign-wrapper top-img-stat">

    //   <div class="section no-pad-bot ">
    //     <div class="container">
    //       <h4 class="header center white-text h4-lang">Статистика за сегодня</h4>
    //     </div>
    //   </div>

    //   <div class="parallax">
    //     <img src="assets/images/stat/circles-1.jpg" alt="circles" class = "img-parallax">
    //   </div>

    // </div>

    // <div id="day-stat" class="container scrollspy">
    //   <div class="center stat-day-wrap section-stat">
    //     <div class = "card z-depth-2 center stat-day">

    //       <div class="stat_card">
    //         <div class="stat_card_heading">
    //           <span class="stat_card_img"><div class="game-picture stat_btn-total"></div></span>
    //           <span class="stat_card_title">Итого по словам</span>
    //         </div>
    //         <div class="stats_list">
    //           <div class="stat_text_container"><span>Изученных слов</span><span class="stat_num orange-text text-darken-3">5</span></div>
    //           <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
    //           <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">21%</span></div>
    //         </div>
    //       </div>
    //       <div class="stat_card">
    //         <div class="stat_card_heading">
    //           <span class="stat_card_img"><div class="game-picture btn-sprint"></div></span>
    //           <span class="stat_card_title">Спринт</span>
    //         </div>
    //         <div class="stats_list">
    //         <div class="stat_text_container"><span>Лучшая серия</span><span class="stat_num light-green-text text-darken-3">8</span></div>
    //         <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
    //         <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">47%</span></div>
    //         </div>
    //       </div>
    //       <div class="stat_card">
    //         <div class="stat_card_heading">
    //           <span class="stat_card_img"><div class="game-picture btn-audio"></div></span>
    //           <span class="stat_card_title">Аудио-Вызов</span>
    //         </div>
    //         <div class="stats_list">
    //         <div class="stat_text_container"><span>Лучшая серия</span><span class="stat_num light-green-text text-darken-3">8</span></div>
    //           <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
    //           <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">47%</span></div>
    //         </div>
    //       </div>
    //       <div class="stat_card">
    //         <div class="stat_card_heading">
    //           <span class="stat_card_img"><div class="game-picture btn-collection"></div></span>
    //           <span class="stat_card_title">Фразы</span>
    //         </div>
    //         <div class="stats_list">
    //         <div class="stat_text_container"><span>Лучшая серия</span><span class="stat_num light-green-text text-darken-3">8</span></div>
    //           <div class="stat_text_container"><span>Новых слов</span><span class="stat_num">10</span></div>
    //           <div class="stat_text_container"><span>Правильных ответов</span><span class="stat_num">47%</span></div>
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </div>

    // <div class="parallax-container valign-wrapper center-img-stat">
    //   <div class="section no-pad-bot">
    //     <div class="container">
    //       <div class="row center">
    //         <h4 class="header center white-text h4-lang">Статистика за все время</h4>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="parallax">
    //     <img src="assets/images/stat/houses.jpg" alt="big ben" class = "img-parallax">
    //   </div>
    // </div>

    // <div id="all-stat" class="container scrollspy">
    //   <div class="center stat-day-wrap section-stat">
    //     <div class = "card z-depth-2 center stat-day">

    //       <div class="stats_charts_container">
    //         <h4 class="stat_long_heading">Новых (уникальных) слов по дням</h4>
    //         <div id="stats_bar_chart" class="stats_chart"></div>
    //         <h4 class="stat_long_heading">Всего изучено слов (прогресс)</h4>
    //         <div id="stats_line_chart" class="stats_chart"></div>
    //       </div>

    //     </div>
    //   </div>
    // </div>

    // <div class="parallax-container valign-wrapper">
    //   <div class="section no-pad-bot">
    //     <div class="container">
    //       <div class="row center">
    //         <h5 class="header light h5-lang">А теперь на тренировку :)</h5>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="parallax">
    //     <img src="assets/images/stat/hogwards.jpg" alt="castle" class = "img-parallax">
    //   </div>
    // </div>

    // <div class="col m3 l2 scroll-stat">
    //   <ul class="section table-of-contents">
    //     <li><a href="#day-stat">За сегодня</a></li>
    //     <li><a href="#all-stat">За все время</a></li>
    //   </ul>
    // </div>
    // `;

    // eslint-disable-next-line no-new
    new BarChart(
      '#stats_bar_chart',
      {
        labels: [
          '28.08.22',
          '29.08.22',
          '30.08.22',
          '31.08.22',
          '01.09.22',
          '02.09.22',
          '03.09.22',
          '04.09.22',
          '05.09.22',
          '06.09.22',
          '07.09.22',
          '08.09.22',
          '09.09.22',
          '10.09.22',
        ],
        series: [20, 60, 120, 200, 180, 20, 10, 20, 60, 120, 200, 180, 20, 10],
      },
      {
        distributeSeries: true,
        chartPadding: {
          right: 40,
        },
        axisX: {
          labelInterpolationFnc: (value, index) => (index % 3 === 0 ? value : null),
        },
      },
    );

    // 1-5 -> 1
    // 6-10 -> 2
    // 7-15 -> 3
    // 16-20 -> 4

    // if (len - 1) % 5 === 0 && len > 1
    // len 6 / 5 = Math.ceil(1.2) = 2 denominator
    // len 11 / 5 = Math.ceil(2.2) = 3 divider
    // len 16 / 5 = Math.ceil(3.2) = 4 divisor

    const chart = new LineChart(
      '#stats_line_chart',
      {
        labels: [
          '28.08.22',
          '29.08.22',
          '30.08.22',
          '31.08.22',
          '01.09.22',
          '02.09.22',
          '03.09.22',
          '04.09.22',
          '05.09.22',
          '06.09.22',
          '07.09.22',
          '08.09.22',
          '09.09.22',
          '10.09.22',
        ],
        series: [[12, 9, 7, 8, 5, 12, 9, 7, 8, 5, 3, 4, 5, 6]],
      },
      {
        fullWidth: true,
        chartPadding: {
          right: 40,
        },
        axisX: {
          labelInterpolationFnc: (value, index) => (index % 2 === 0 ? value : null),
        },
        low: 0,
      },
    );

    let seq = 0;

    chart.on('created', () => {
      seq = 0;
    });

    chart.on('draw', (data) => {
      if (data.type === 'point') {
        data.element.animate({
          opacity: {
            begin: (seq += 1 * 80),
            dur: 500,
            from: 0,
            to: 1,
          },
          x1: {
            begin: (seq += 1 * 80),
            dur: 500,
            from: data.x - 100,
            to: data.x,
            easing: easings.easeOutQuart,
          },
        });
      }
    });

    let timerId: NodeJS.Timeout;

    chart.on('created', () => {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(chart.update.bind(chart), 8000);
    });
  }
}
