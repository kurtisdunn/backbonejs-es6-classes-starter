import './scss/main.scss';
import Router from './router';

const AppContainer = {
  Collections: {},
  Models: {},
  Views: {}
};

class App {
  constructor () {
    new Router();
    if (this.debug()) {
      window.App = App;
    }
  }
  debug (){
    return true;
  }
}

//- start app --------------------
(function() {
  new App();
})();

export default { AppContainer };
