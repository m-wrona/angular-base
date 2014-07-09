'use strict';

describe('routes-spec:', function () {

    it('should automatically redirect to default page', function () {
        //given user is entering app
        //when using generic address of the application
        browser.get('/app');
        //then user is redirected to login page
        expect(browser.getLocationAbsUrl()).toMatch("/#/login");
    });

    it('should allow entering login page', function () {
        //given any user
        //when accessing login page
        browser.get('/app/#login');
        //then access to resource is granted
        expect(browser.getLocationAbsUrl()).toMatch("/#/login");
    });

    describe('checking access rights to private page:', function () {

        it('should deny guest to enter private page', function () {
            //given user is not logged in
            //when accessing private resource
            browser.get('/app/#private');
            //then user is redirected to login page
            expect(browser.getLocationAbsUrl()).toMatch("/#/login");
        });

        it('should allow logged in user to enter private page', function () {
            //given user is logged in
            browser.addMockModule('angular-base', function () {
                angular.module('angular-base').run(function (Session, USER_ROLES) {
                    Session.create('token-123', 'user-456', USER_ROLES.CLIENT);
                });
            });
            //when accessing private resource
            browser.get('/app/#private');
            //then access to resource is granted
            expect(browser.getLocationAbsUrl()).toMatch("/#/private");
        });

    });

});
