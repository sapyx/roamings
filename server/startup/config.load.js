Meteor.startup(function () {
    if (Configs.find().count() === 0) {
        var configs = [
            {
                Type: 'Corporation',
                Id: 98361290,
                Name: 'Deus-Ex-Machina',
                Ticker: 'D-E-X'
            },
            {
                Type: 'Admin',
                Id: 905954997,
                Name: 'Anne Sapyx'
            }
        ];

        configs.forEach(function (config) {
            Configs.insert(config);
        });
    }
});