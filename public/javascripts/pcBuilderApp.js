var pcBuilderApp = window.pcBuilderApp = angular.module('PcBuilderApp', [
        'Controllers.Global',
        'Controllers.Home'
    ]).
    config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/', {
                templateUrl: '/view/homepage',
                controller: 'HomeCtrl'
            }).
            when('/parts', {
                templateUrl: '/view/parts',
                controller: 'PartsCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);
