'use strict';

class HomeController {
    constructor($scope, $reactive, $log, defaultImages) {
        this.defaultImages = defaultImages;
        $reactive(this).attach($scope);

        this.subscribe('config_corp', null, {
            onReady: ()=> {
                $log.debug("onReady And the Config Items actually Arrive");

                this.helpers({
                    corporation: ()=> {
                        return Configs.findOne();
                    }
                });

                $log.debug('Quering corporation config:')
                $log.debug(this.corporation);
            },
            onStop: (err) => {
                if (err) {
                    $log.error('An error happened - ' + err);
                } else {
                    $log.debug('The subscription stopped');
                }
            }
        });
    }
}

angular.module('roamingsApp').controller('HomeCtrl', HomeController);

