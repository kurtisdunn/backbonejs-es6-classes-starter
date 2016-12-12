import Backbone from 'backbone';
import BaseView from './views/baseView';

export default class Router extends Backbone.Router {
  constructor() {
    super({
      routes:  {
        '': 'home'      }
    });
    new BaseView();
  }

  initialize() {
    console.log('App.router.initialize()');
    Backbone.history.start();
  }

  home () {
    console.log('App.router.home()');
  }

}
