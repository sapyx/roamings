Roams = new Mongo.Collection('roams');

Roams.deny({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});