# BackboneJS ES6 Classes Starter
BackboneJS Starter using ES6 classes. This app uses backbone to parse readme file from this project complete with Syntax highlighting.


## Building

```
npm install
npm build
```

## Developing

```
npm install
npm run dev
```

### Structure

All development files should go under `src`. The base structure is:

```
- src/
-- collections/ # Backbone Collections.
-- lib/        # Misc scripts.
-- models/     # Backbone Models.
-- scss/       # Styles.
-- views/      # Backbone Views.
-- index.html  # Main SPA view.
-- main.js     # Main JavaScript file imported by index.html.

```


The `src/main.js` is the main file that the entire build is based off of.




### Building

The only command you should need during development is `npm run build-watch`. This will:
```
1. Clean the `dist` folder.
2. Run `npm run build`.
3. Watch source files and re-run `npm run build` if any files in `src` change.
4. Start a webserver, enable live-reload, serve `dist` and open it in your browser.
```




### Routes

Only one route in this one. Its pretty straight forward. A route needs to be defined in super to be called on itself with a new view declared.

```js
import Backbone from 'backbone';
import BaseView from './views/baseView';

export default class Router extends Backbone.Router {
  constructor() {
    super({
      routes:  {
        '': 'home'      }
    });
  }

  initialize() {
    console.log('App.router.initialize()');
    Backbone.history.start();
  }

  home () {
    new BaseView();
  }

}
```



### Collection


```js
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
    return 'https://raw.githubusercontent.com/kurtis-dunn/backbonejs-es6-classes-starter/master/README.md';
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
```



### View

```js
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
    console.log('App.BaseView()');
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
```
