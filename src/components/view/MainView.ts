// import { createElement } from './helpers/renderHelpers';

// import { Route } from '../types/appRoutes';
import { createElement } from './helpers/renderHelpers';

export class MainView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render() {
    this.mainDiv.innerHTML = `<div id="index-banner" class="parallax-container valign-wrapper top-img-lang">
    <div class="section no-pad-bot">
      <div class="container">
        <br><br>
        <h2 class="header center white-text h2-lang">English train</h2>
        <div class="row center">
          <h5 class="header light h5-lang">Твой друг в мире английского языка</h5>
        </div>
        <br><br>
      </div>
    </div>
       <div class="parallax"><img src="assets/images/train.jpg" alt="train" class = "img-parallax"></div>
  </div>

  <div class="container">
    <div class="section">
     <div class="row">
      <div class="col s12 center">
          <h4>О приложении</h4>
        <p class="main-text-lang">
        Выучи Английский играючи ;) <br> 
        Осторожно! Вызывает привыкание<br>
        Преимущества - с нами быстро, легко, весело.<br>
        Всего 15 минут в день и ты заговоришь, как носитель</p>

        <div class = "about-app-wrap">
        <div class = "book-img"></div>
        <div class = "book-text"></div>
        </div>
        <p class="about-app-title-lang">Учебник</p>
        <ul class="">
        <li class="light list-lang"><i class="material-icons">check</i> более 3,5 тысяч часто употребляемых слов</li>
        <li class="light list-lang"><i class="material-icons">check</i> разделы по уровню сложности</li>
        <li class="light list-lang"><i class="material-icons">check</i> удобная навигация</li>
        <li class="light list-lang"><i class="material-icons">check</i> озвучка, картинка-ассоциация, примеры</li>
        <li class="light list-lang"><i class="material-icons">check</i> персональный раздел для сложных слов (нужна регистрация)</li>
        </ul>

        <div id = "book" class = "main-games"></div>

        <ul class="">
        <li class="about-app-title-lang">3 увлекательных игры для закрепления материала</li>
        <li class="light list-lang"><i class="material-icons">check</i> Спринт - поможет запомнить, научит мгновенно переводить</li>
        <li class="light list-lang"><i class="material-icons">check</i> Аудиовызов - разовьет твои навыки аудирования</li>
        <li class="light list-lang"><i class="material-icons">check</i> Фразы - научит использовать слова в контексте предложения</li>
        </ul>  
        
        <div id = "games" class = "main-games"></div>
  
        <ul class="">
        <li class="about-app-title-lang">Статистика</li>
        <li class="light list-lang"><i class="material-icons">check</i> мотивирует тебя идти вперед и не останавливаться</li>
        </ul> 
        
        <div id = "stat" class = "main-games"></div>

      </p>
      </div>
    </div>
    </div>
  </div>

  <div class="parallax-container valign-wrapper">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="row center">
          <h5 class="header light h5-lang">Твой друг в мире английского языка</h5>
        </div>
      </div>
    </div>
    <div class="parallax"><img src="assets/images/big-ben-2.jpg" alt="big ben" class = "img-parallax"></div>
  </div>

  <div class="container">
    <div class="section">

      <div class="row">
      <h4 class="center">О нас</h4>
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center avatar-wrap"><div class="alexander"></div></h2>
            <h5 class="center main-github">Александр
            <a href="https://github.com/AlexanderKrasovskiy" class = "main-github__link">
            <div class="main-github__image"></div>
            </a>
            </h5>
            <p class="light team-info">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
            </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center avatar-wrap avatar-wrap-alla"><div class="alla"></div></h2>
            <h5 class="center main-github">Алла
            <a href="https://github.com/ALLaTk" class = "main-github__link">
            <div class="main-github__image"></div>
            </a>
            </h5>
            <p class="light team-info">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
            </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center avatar-wrap"><div class="svetlana"></div></h2>
            <h5 class="center main-github">Светлана
            <a href="https://github.com/Svt1108" class = "main-github__link">
            <div class="main-github__image"></div>
            </a>
            </h5>
            <p class="light team-info">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
            </div>
        </div>
      </div>

    </div>
  </div>


  <div class="parallax-container valign-wrapper">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="row center">
          <h5 class="header light h5-lang">Твой друг в мире английского языка</h5>
        </div>
      </div>
    </div>
    <div class="parallax"><img src="assets/images/castle.jpg" alt="castle" class = "img-parallax"></div>
  </div>`;

    const games = document.getElementById('games') as HTMLElement;

    const game0 = createElement('a', 'games-btn main-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    game0.href = `#sprint`;
    games.appendChild(game0);
    const game0Title = createElement('div', 'game-title', ' ');
    game0.appendChild(game0Title);
    const game0Picture = createElement('div', 'game-picture btn-sprint');
    game0.appendChild(game0Picture);

    const game1 = createElement('a', 'games-btn main-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    game1.href = `#audio`;
    games.appendChild(game1);
    const game1Title = createElement('div', 'game-title', ' ');
    game1.appendChild(game1Title);
    const game1Picture = createElement('div', 'game-picture btn-audio');
    game1.appendChild(game1Picture);

    const game2 = createElement('a', 'games-btn main-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    game2.href = `#phrase`;
    games.appendChild(game2);
    const game2Title = createElement('div', 'game-title', ' ');
    game2.appendChild(game2Title);
    const game2Picture = createElement('div', 'game-picture btn-collection');
    game2.appendChild(game2Picture);

    const book = document.getElementById('book') as HTMLElement;

    const book0 = createElement('a', 'games-btn main-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    book0.href = `#book`;
    book.appendChild(book0);
    const book0Title = createElement('div', 'game-title', ' ');
    book0.appendChild(book0Title);
    const book0Picture = createElement('div', 'game-picture btn-book');
    book0.appendChild(book0Picture);

    const stat = document.getElementById('stat') as HTMLElement;

    const stat0 = createElement('a', 'games-btn main-btn z-depth-2 waves-effect') as HTMLAnchorElement;
    stat0.href = `#stat`;
    stat.appendChild(stat0);
    const stat0Title = createElement('div', 'game-title', ' ');
    stat0.appendChild(stat0Title);
    const stat0Picture = createElement('div', 'game-picture btn-stat');
    stat0.appendChild(stat0Picture);
  }
}
