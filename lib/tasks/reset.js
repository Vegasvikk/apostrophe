var async = require('async');
var _ = require('underscore');
var argv = require('optimist').argv;

// Reset the database, removing all content and introducing a bare bones site

module.exports = function(self, callback) {
  console.log('Resetting the database - removing ALL content');
  function resetMain(callback) {
    return self.pages.insert([{ slug: '/', _id: '4444444444444', path: 'home', title: 'Home', level: 0, type: 'home', published: true }, { slug: '/search', _id: 'search', orphan: true, path: 'home/search', title: 'Search', level: 1, type: 'search', rank: 9998, published: true }, { slug: '/trash', _id: 'trash', path: 'home/trash', title: 'Trash', level: 1, trash: true, type: 'trash', rank: 9999 }], callback);
  }
  var collections = [ self.files, self.pages, self.redirects, self.versions ];
  async.map(collections, function(collection, callback) {
    return collection.remove({}, callback);
  }, function (err) {
    if (err) {
      return callback(err);
    }
    return async.series([ resetMain ], callback);
  });
};
