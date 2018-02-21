AngularFrontend.service('MainService', function ($http, $base64, CONFIG, $log, $window) {

	var MainService = {};

  MainService.restCall = function (collection) {

    var req = {
      method: 'GET',
      url: "https://bcw-node.herokuapp.com/db/" + collection,
      headers: {
        'Content-Type': 'application/json',
      },
      // data: alarm
    };
    $log.debug('MainService.restCall with req: ', req);
    return $http(req);
  };


	return MainService;
});