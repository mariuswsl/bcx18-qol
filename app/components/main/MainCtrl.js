AngularFrontend.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $compile, $log, $uibModal, $rootScope, $window, MainService) {

	// set the view model
	// ------------------
	var mainVM = this;

	function init() {
    MainService.restCall()
      .then(function (result) {
          $log.debug('result', result);

          let data                   = result.data,
              lastReceivedObject     = data.pop(),
              lastReceivedObjectData = lastReceivedObject.data;
              devicesCount           = lastReceivedDataobject.observations.length;

          $scope.devicesCount = devicesCount;

        },
        function (error) {
          $log.debug("Failed rest call, with error:");
          $log.debug(error);
        });

  };

  init();
};