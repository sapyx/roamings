/**
 * Created by Sapyx on 13/12/2015.
 */

Meteor.startup(function () {
    console.log('enter API function');

    HTTP.get('https://api.eveonline.com/eve/CharacterAffiliation.xml.aspx?ids=905954997', {},
        (xmlError, xmlResponse) => {
            if (xmlError) {
                console.error('xmlError', xmlError);
            } else {
                xml2js.parseString(xmlResponse.content, {
                    explicitArray: false,
                    emptyTag: undefined
                }, (jsError, jsResult)=> {
                    if (jsError) {
                        console.error('xml2js error', jsError);
                    } else {
                        console.dir(jsResult.eveapi.result.rowset.row.$.characterName);
                    }
                });
            }
        }
    );
    // -------------------------
/*

    try {
        var response = HTTP.get('https://api.eveonline.com/eve/CharacterAffiliation.xml.aspx?ids=905954997');
    }
    catch (error) {
        console.dir(error.response);
        response = error.response;
    }

    if (!response) {
        //throw new Meteor.Error(999, 'API server did not respond.');
    }

    console.log(response.content);

    if (response.statusCode !== 200) {
        var reason = 'API endpoint did not specify error details.';
        /!*   if (response.content) {
         try {
         obj = (blocking(this.parser, this.parser.parseString))(response.content);
         reason = obj.eveapi.error._;
         response.statusCode = obj.eveapi.error.code;
         }
         catch (_error) {
         error = _error;
         reason = response.content;
         }
         }*!/
        //throw new Meteor.Error(response.statusCode, reason);
    }
*/

    //return response.content;
});