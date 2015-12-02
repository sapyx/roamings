Meteor.startup(function () {
    if (Roams.find().count() === 0) {
        var roams = [
            {
                "Talwar Roam": {
                    "startDate": "2015-11-19T20:25:00.000Z",
                    "endDate": "2015-11-19T22:59:00.000Z",
                    "crew": [
                        {"name": "Raziel Andrano", "id": 94801614, "inZkbd": true},
                        {"name": "Lady Kaylin", "id": 488843365, "inZkbd": true},
                        {"name": "Ycnal", "id": 1288682056, "inZkbd": true},
                        {"name": "Anne Sapyx", "id": 905954997, "inZkbd": true},
                        {"name": "emperor bladia", "id": 95009526, "inZkbd": true},
                        {"name": "Anthar Rayl", "id": 95387027, "inZkbd": true},
                        {"name": "Scheitan", "id": 404938808, "inZkbd": true},
                        {"name": "X3H0M", "id": 93841453, "inZkbd": true},
                        {"name": "Gwinet", "id": "95207419", "inZkbd": true}
                    ]
                }
            }
        ];
        roams.forEach(function (roam) {
            Roams.insert(roam);
        });
    }
});