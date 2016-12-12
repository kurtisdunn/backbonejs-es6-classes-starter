import Router from './router';

const Heffron = {
  Collections: {},
  Models: {},
  Views: {}
};

class App {

  constructor () {
    new Router();
    if (this.debug()) {
      window.Heffron = Heffron;
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

export default { Heffron };
