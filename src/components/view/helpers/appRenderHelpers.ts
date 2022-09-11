import { Route } from '../../types/appRoutes';

export const renderHeader = () => `
<ul id="dropdown1" class="dropdown-content">
<li><a href="#${Route.sprint}">Спринт</a></li>
<li class="divider"></li>
<li><a href="#${Route.audio}">Аудиовызов</a></li>
<li class="divider"></li>
<li><a href="#${Route.phrase}">Фразы</a></li>
</ul>

<div class = "header-lang">
<nav class = "nav-lang">
<div class="nav-wrapper">
  <a href="#${Route.main}" class="logo-lang hide-on-med-and-down"></a>
  <ul class="right">
    <li><a href="#${Route.main}" class = "menu-link-lang">На главную</a></li>
    <li><a href="#${Route.book}#0#0" class = "menu-link-lang">Учебник</a></li>
    <li><a href="#${Route.stats}" class = "menu-link-lang">Статистика</a></li>
    <li><a class="dropdown-trigger menu-link-lang" href="#!" data-target="dropdown1">Игры<i class="material-icons right">arrow_drop_down</i></a></li>
    <li><a href="#${Route.login}" id="lang_login_btn" class = "menu-link-lang">Вход</a></li>
  </ul>
</div>
</nav>
</div>`;

export const renderFooter = () => `
<!--- <div class="page-footer page-footer-lang">  --->
<!--- <div class="footer-copyright page-footer page-footer-lang"> --->
    <div class="container">
        <a href="https://rs.school/js/" class="grey-text text-lighten-4 left">
            <div class="page-footer__logo"></div>
        </a>
        <div class="page-footer__github-wrap right">
        <a href="https://github.com/AlexanderKrasovskiy">
        <div class="page-footer__github"></div>
    </a>
    <p>Alexander Krasovskiy</p>
        <a href="https://github.com/ALLaTk">
        <div class="page-footer__github"></div>
    </a>
    <p>Alla Tkachuk</p>
        <a href="https://github.com/Svt1108">
        <div class="page-footer__github"></div>
    </a>
    <p>Svetlana Pozina, 2022</p>
        </div>
    </div>
    <!---</div> --->
</div>`;
