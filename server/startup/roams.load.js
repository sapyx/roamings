Meteor.startup(function () {
    if (Roams.find().count() === 0) {
        var roams = [
            {
                "roam": "Factional da LorenSo - 01",
                "startDate": "2015-10-30T21:20:00.000Z",
                "endDate": "2015-10-30T22:55:00.000Z",
                "crew": [
                    {"name": "Anne Sapyx", "id": 905954997, "inZkbd": true},
                    {"name": "Sigma Ceti", "id": 728182540, "inZkbd": true},
                    {"name": "Lorenso", "id": 781526422, "inZkbd": true},
                    {"name": "Killerloop", "id": 95371562, "inZkbd": true},
                    {"name": "Angelos Dallocort", "id": 94228470, "inZkbd": true},
                    {"name": "Ringhio Rucola", "id": 92628585, "inZkbd": true},
                    {"name": "Gwinet", "id": 95207419, "inZkbd": true},
                    {"name": "Haran Storm", "id": 95923704, "inZkbd": true},
                    {"name": "Aldor Zhee", "id": 93334286, "inZkbd": true},
                    {"name": "Rik Votissala", "id": 95848905, "inZkbd": true},
                    {"name": "Slot Barr", "id": 92088562, "inZkbd": true}
                ]
            },
            {
                roam: "Multi ITA Lowsec - 01",
                startDate: "2015-11-19T20:25:00.000Z",
                endDate: "2015-11-19T22:59:00.000Z",
                crew: [
                    {"name": "Raziel Andrano", "id": 94801614, "inZkbd": true},
                    {"name": "Lady Kaylin", "id": 488843365, "inZkbd": true},
                    {"name": "Ycnal", "id": 1288682056, "inZkbd": true},
                    {"name": "Anne Sapyx", "id": 905954997, "inZkbd": true},
                    {"name": "emperor bladia", "id": 95009526, "inZkbd": true},
                    {"name": "Anthar Rayl", "id": 95387027, "inZkbd": true},
                    {"name": "Scheitan", "id": 404938808, "inZkbd": true},
                    {"name": "X3H0M", "id": 93841453, "inZkbd": true},
                    {"name": "Gwinet", "id": 95207419, "inZkbd": true},
                    {"name": "lorenzo", "id": 327081255, "inZkbd": true}]
            }
        ];
        roams.forEach(function (roam) {
            Roams.insert(roam);
        });
    }
});