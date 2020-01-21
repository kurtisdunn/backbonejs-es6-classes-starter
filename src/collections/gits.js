import Backbone from 'backbone';
import showdown from 'showdown';
import Git from '../models/git';

export default class Gits extends Backbone.Collection {
  constructor() {
    super();
  }

  initialize() {
    console.log('App.Collection.Gits()');
  }

  url(){
    return 'https://raw.githubusercontent.com/kurtisdunn/backbonejs-es6-classes-starter/master/README.md';
  }

  parse(response){
    const models =[];
    if(response){
      const converter = new showdown.Converter();
      models.push({ md: converter.makeHtml(response) });
    }
    return models;
  }

}
