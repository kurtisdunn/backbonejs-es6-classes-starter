var del = require('del');

module.exports = function (done) {
  return del('dist', done);
};
