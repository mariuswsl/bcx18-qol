AngularFrontend.service('MainService', function ($http, $base64, CONFIG, $log, $window) {

	var MainService = {};

  MainService.restCall = function () {

    var req = {
      method: 'GET',
      url: "http://localhost/leo",
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