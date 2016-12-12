import Backbone from 'backbone';

export default class Git extends Backbone.Model {
  constructor() {
    super();
    //   el:  document.getElementById('main'),
    //   events: {
    //     'click .btn': 'clickButton',
    //   }
    // });
    // Heffron.Views.BaseView = this;

  }
  initialize() {
    console.log('App.Model.Git()');
    //App.models.git = git = this
  }

}
