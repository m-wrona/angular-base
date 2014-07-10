'use strict';

var controllers = angular.module('dashboard.controllers', []);


controllers.controller('DashboardCtrl', function ($scope, $interval, $window, widgetDefinitions, defaultWidgets) {

    $scope.dashboardOptions = {
        widgetButtons: true,
        widgetDefinitions: widgetDefinitions,
        defaultWidgets: defaultWidgets,
        storage: $window.localStorage,
        storageId: 'demo'
    };

    $scope.randomValue = Math.random();

    $interval(function () {
        $scope.randomValue = Math.random();
    }, 500);

});