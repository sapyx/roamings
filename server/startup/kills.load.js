Meteor.startup(function() {
  if(Kills.find().count() === 0) {
    var kills = [
      {
        'name': 'kill 1'
      },
      {
        'name': 'kill 2'
      }
    ];
    kills.forEach(function(kill) {
      Kills.insert(kill);
    });
  }
});