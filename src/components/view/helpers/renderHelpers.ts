export const createElement = (tag: string, className?: string, text?: string, id?: string, disabled?: boolean) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  if (id) el.id = id;
  if (disabled) el.setAttribute('disabled', '');
  return el;
};

export const renderHeader = () => `<div class = "header-lang">
<ul id="dropdown1" class="dropdown-content">
<li><a href="#!">На главную</a></li>
<li class="divider"></li>
<li><a href="#!">Словарь</a></li>
<li class="divider"></li>
<li><a href="#!">Игры</a></li>
<li class="divider"></li>
<li><a href="#!">Статистика</a></li>
</ul>
<nav class = "nav-lang">
<div class="nav-wrapper">
  <a href="#!" class="brand-logo logo-lang"></a>
  <ul class="right hide-on-med-and-down">
    <li><a href="sass.html">Login</a></li>
    <!-- Dropdown Trigger -->
    <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Меню<i class="material-icons right">arrow_drop_down</i></a></li>
  </ul>
</div>
</nav>
</div>`;

export const renderFooter = () => `<div class="page-footer page-footer-lang">
<span id="contacts"></span>
<div class="footer-copyright">
    <div class="container">
        <a href="https://rs.school/js/" class="grey-text text-lighten-4 left">
            <div class="page-footer__logo"></div>
        </a>
        <div class="page-footer__github-wrap right">
        <a href="https://github.com/Svt1108">
        <div class="page-footer__github"></div>
    </a>
    <p>Alexander Krasovskiy</p>
        <a href="https://github.com/Svt1108">
        <div class="page-footer__github"></div>
    </a>
    <p>Alla Tkachuk</p>
            <a href="https://github.com/Svt1108">
                <div class="page-footer__github"></div>
            </a>
            <p>Svetlana Pozina, 2022</p>
        </div>
    </div>
</div>
</div>`;
