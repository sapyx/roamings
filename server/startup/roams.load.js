Meteor.startup(function() {
  if(Roams.find().count() === 0) {
    var roams = [
      {
        'name': 'roam 1'
      },
      {
        'name': 'roam 2'
      }
    ];
    roams.forEach(function(roam) {
      Roams.insert(roam);
    });
  }
});