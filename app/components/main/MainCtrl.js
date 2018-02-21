AngularFrontend.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $compile, $log, $uibModal, $rootScope, $window, MainService) {

	// set the view model
	// ------------------
	var mainVM = this;

	function init() {

    // Meraki
    MainService.restCall('wifiDevices')
      .then(function (result) {
          $log.debug('wifiDevices result', result);


          // Meraki
          let data                   = result.data,
              lastReceivedObject     = data.pop(),
              lastReceivedObjectData = lastReceivedObject.data;
              devicesCount           = lastReceivedObjectData.observations.length;

          $scope.devicesCount = devicesCount;

        },
        function (error) {
          $log.debug("Failed rest call, with error:");
          $log.debug(error);
        });



    // Bosch XDK
    MainService.restCall('xdkDeviceData')
      .then(function (result) {
          $log.debug('xdkDeviceData result', result);


          // Meraki
          let data                   = result.data;
              // lastReceivedObject     = data.pop(),
              // lastReceivedObjectData = lastReceivedObject.data;
              // devicesCount           = lastReceivedObjectData.observations.length;

          // $scope.devicesCount = devicesCount;

        },
        function (error) {
          $log.debug("Failed rest call, with error:");
          $log.debug(error);
        });
  };

  init();
};