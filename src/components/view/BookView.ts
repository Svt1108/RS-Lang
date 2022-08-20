// import { createElement } from './helpers/renderHelpers';

import { Word } from '../types';

export class BookView {
  mainDiv;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  render(res: Word[]) {
    console.log(res);
    this.mainDiv.innerHTML = `<div id="index-banner" class="parallax-container valign-wrapper top-img-lang">
    <div class="section no-pad-bot">
      <div class="container">
        <br><br>
        <h2 class="header center white-text h1-lang">English train</h2>
        <div class="row center">
          <h5 class="header light h5-lang">Твой друг в мире английского языка</h5>
        </div>
        <br><br>

      </div>
    </div>
       <div class="parallax"><img src="assets/images/violet-1.jpg" alt="violet" class = "img-parallax"></div>
  </div>


  <div class="container">
    <div class="section">

      <!--   Icon Section   -->
      <div class="row">
      <div class="col s12 center">
        <h3><i class="mdi-content-send brown-text"></i></h3>
        <h4>О приложении</h4>
        <p class="left-align light main-text-lang">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
      </div>
      <div class="row center">
      <a href="http://materializecss.com/getting-started.html" id="download-button" class="btn-large waves-effect waves-light grey lighten-3 z-depth-3 btn-lang">Поехали!</a>
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
    <div class="parallax"><img src="assets/images/violet-2.jpg" alt="violet" class = "img-parallax"></div>
  </div>

  <div class="container">
    <div class="section">

      <div class="row">
      <h4 class="center">О нас</h4>
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">directions_bike</i></h2>
            <h5 class="center">Александр</h5>

            <p class="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">nature_people</i></h2>
            <h5 class="center">Алла</h5>

            <p class="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">rowing</i></h2>
            <h5 class="center">Светлана</h5>

            <p class="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
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
    <div class="parallax"><img src="assets/images/violet-3.jpg" alt="violet" class = "img-parallax"></div>
  </div>`;
    M.AutoInit();
  }
}
