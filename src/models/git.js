import Backbone from 'backbone';

export default class Git extends Backbone.Model {
  constructor() {
    super();

  }
  initialize() {
    console.log('App.Model.Git()');
    //App.models.git = git = this
  }

}
