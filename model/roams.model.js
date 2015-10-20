Roams = new Mongo.Collection('roams');

Roams.allow({
  insert: function(userId, roam) {
    return true;
  },
  update: function(userId, roam, fields, modifier) {
    return true;
  },
  remove: function(userId, roam) {
    return true;
  }
});