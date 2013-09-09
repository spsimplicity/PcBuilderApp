angular.module('Controllers.Global', [])
    .run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.loc = $location;

        new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
    }])

    .controller('GlobalCtrl', ['$scope', function($scope) {
        $scope.showLogin = false;
    }]);
