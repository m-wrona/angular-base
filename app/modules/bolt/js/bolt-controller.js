'use strict';

var controllers = angular.module('bolt.controllers', ['ui-notifications']);

/**
 * Controller manages user's login/logout process
 * @param $rootScope Angie's root scope
 * @param $scope Angie's current scope
 * @param AuthService service for managing user's session
 * @param AUTH_EVENTS list of authentication events
 * @param $log Angie's logger component
 */
controllers.controller('LoginCtrl', function ($rootScope, $scope, AuthService, AUTH_EVENTS, $log) {
    $scope.credentials = {
        username: '',
        password: ''

    };

    /**
     * Login user with given credentials
     * @param credentials user's login and password
     */
    $scope.login = function (credentials) {
        $log.debug('Logging in user: ' + credentials.username);
        AuthService.login(credentials).then(function () {
            $rootScope.$broadcast(AUTH_EVENTS.USER_LOGGED_IN);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.LOGIN_FAILED);
        });
    };
    /**
     * Logout current user
     */
    $scope.logout = function () {
        if (AuthService.isAuthenticated()) {
            AuthService.logout();
            $rootScope.$broadcast(AUTH_EVENTS.USER_LOGGED_OUT);
        }
    }
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};