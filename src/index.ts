import './components/init/init';
import 'materialize-css/dist/js/materialize';
import './scss/global.scss';

import { AppController } from './components/controller/AppController';
import { createUser, getAssets, getWord } from './components/model/helpers/apiHelpers';

const app = new AppController();
app.start();
getWord('5e9f5ee35eb9e72bc21af4a2')
getAssets('5e9f5ee35eb9e72bc21af4a0')
createUser('Ivan', 'hello@m.ru', '12345678')