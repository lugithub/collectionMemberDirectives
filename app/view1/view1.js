'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl as my'
        });
    }])

    .controller('View1Ctrl', [function () {
    }]);

angular.module('myApp.view1').controller('IndexCtrl', [function () {
    var vm = this;
    vm.locations = [{
        name: 'Europe',
        children: [
            {
                name: 'Italy',
                children: [
                    {name: 'Rome'},
                    {name: 'Milan'}
                ]
            },
            {name: 'Spain'}
        ]
    }, {
        name: 'South America',
        children: [
            {name: 'Brasil'},
            {name: 'Peru'}
        ]
    }
    ];
}]);


angular.module('myApp.view1').directive('collection', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            collection: '='
        },
        template: "<ul><member ng-repeat='member in collection' member='member'></member></ul>",
        link: function (scope, element, attrs) {
            console.log(scope);
        }
    };
});

angular.module('myApp.view1').directive('member', function ($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            member: '='
        },
        template: "<li>{{member.name}}</li>",
        link: function (scope, element, attrs) {
            if (angular.isArray(scope.member.children)) {
                //element.append("<collection collection='member.children'></collection>");
                //$compile(element.contents())(scope);

                $compile('<collection collection="member.children"></collection>')(scope, function(cloned, scope){
                    element.append(cloned);
                });
            }
        }
    }
})