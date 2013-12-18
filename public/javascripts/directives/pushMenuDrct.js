angular.module('Directives.PushMenu', [])
    .directive('pushMenu', ['$rootScope', '$menuHelpers', function($rootScope, $menuHelpers) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                $rootScope.$on('closeMenu', function() {
                    $menuHelpers.setTransform('translate3d(0, 0, 0);');
                    angular.element(document.getElementById('mp-pusher')).removeClass('mp-pushed');
                    $menuHelpers.turnOffLevels();
                });
            }
        }
    }])
    .directive('backLevel', ['$menuHelpers', function($menuHelpers) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                elem.on($menuHelpers.getClickEventType(), function() {
                    var level = $menuHelpers.getClosestParent(elem, 'mp-level').getAttribute('data-level');
                })
            }
        };
    }])
    .directive('showMenu', ['$rootScope', '$menuHelpers', function($rootScope, $menuHelpers) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                var scrollerElem = angular.element(document.getElementById('scroller'));
                elem.on($menuHelpers.getClickEventType(), function() {
                    if(elem.hasClass('opened')) {
                        $rootScope.$emit('closeMenu');
                    } else {
                        $rootScope.$emit('openMenu');
                        elem.addClass('opened');
                        scrollerElem.addClass('closeMenu');
                    }
                });
            }
        }
    }])
    .directive('showSubMenu', ['$rootScope', '$menuHelpers', function($rootScope, $menuHelpers) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                var subLevel = $menuHelpers.getDirectChild(elem, 'mp-level');

                if(subLevel) {
                    elem.on('click', function() {
                        $menuHelpers.getClosestParent(elem, 'mp-level').addClass('mp-level-overlay');
                        $rootScope.$emit('openMenu', subLevel);
                    });
                }
            }
        }
    }])
    .directive('closeSubMenu', ['$rootScope', '$menuHelpers', function($rootScope, $menuHelpers) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                var levelNum = elem.attr('data-level'),
                    transVal = elem.offsetWidth + ((levelNum - 1) * 40);

                $menuHelpers.setTransform('translate3d(' + transVal + 'px, 0, 0);');
                $menuHelpers.turnOffLevels();

                elem.removeClass('menu-overlay');
            }
        }
    }])
    .directive('closeMenu', ['$rootScope', '$menuHelpers', function($rootScope, $menuHelpers) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                elem.on($menuHelpers.getClickEventType(), function() {
                    if(elem.hasClass('closeMenu')) {
                        $rootScope.$emit('closeMenu');
                        elem.removeClass('closeMenu');
                    }
                });
            }
        }
    }]);