import './scss/global.scss';
import 'materialize-css/dist/js/materialize';

import { AppController } from './components/controller/AppController';

// import './components/init/jquery-2.1.1.min.js';
import './components/init/init';

const app = new AppController();
app.start();
