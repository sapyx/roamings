/**
 * Created by Sapyx on 13/12/2015.
 */

EveonlineApi.getCharacterAffiliation = function (charId) {
    try {
        var response = Meteor.http.get('https://api.eveonline.com/eve/CharacterAffiliation.xml.aspx?ids=' + charId);
    }
    catch (error) {
        if (error.response) {
            response = error.response;
            throw new Error('HTTP error: ' + error.response.statusCode);
        } else {
            throw new Error('API server did not respond.');
        }
    }

    if (response) {
        if (response.statusCode !== 200 && response.statusCode !== 403) {
            throw new Error('Unsupported HTTP response: ' + response.statusCode);
        } else {
            if (response.content) {
                try {
                    jsResult = xml2js.parseStringSync(response.content, {
                        explicitArray: false,
                        attrNameProcessors: [function (name) {return '_' + name}],
                        mergeAttrs: true
                    });
                }
                catch (jsError) {
                    throw new Error('xml2js error: ' + jsError);
                }

                var duration = Date.parse(jsResult.eveapi.cachedUntil) - Date.parse(jsResult.eveapi.currentTime);

                console.info('API duration: %s min.', duration / (1000 * 60));
                //console.info(jsResult.eveapi.result.rowset.row);

                return jsResult.eveapi.result.rowset.row
            } else {
                throw new Error('API server did not respond in correct fashion');
            }
        }
    }
};