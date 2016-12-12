import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import hljs from 'highlightjs/highlight.pack.js';
import 'highlightjs/styles/monokai.css';
import Gits from '../collections/gits';

export default class BaseView extends Backbone.View {
  constructor() {
    super({
      el:  document.getElementById('main'),
      events: {
        'click .btn': 'clickButton',
      }
    });
  }

  initialize() {
    console.log('App.Views.BaseView()');
    this.fetchReadme();
  }

  fetchReadme(){
    const that = this;
    const gits = new Gits();
    gits.fetch({
      dataType: 'html',
      success: function(i) {
        that.renderPage(i.models[0].attributes.md).then(that.syntaxHighlighter());
      },
      error: function(i) {
        const error = new Error();
        error(i);
      }
    });
  }
  renderPage(data){
    const that = this;
    return new Promise(function(resolve, reject) {
        that.renderReadme(data);
    });
  }

  renderReadme(md){
    return document.getElementById('readme').innerHTML = md.toString();
  }

  syntaxHighlighter(){
    hljs.configure({useBR: false});

    $('code.language-js').each(function(i, block) {
      hljs.highlightBlock(block);
    });

  }

  clickButton(e){
    console.log('button clicked!', e);
  }

}
