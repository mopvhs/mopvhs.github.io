/**
 * Created by mopvhs on 14-3-5.
 */
define(function(require){

    var $ = require('jquery'),
        Cookie = require('cookie'),
        Dialog = require('dialog'),
        Tabs = require('tabs');

    var apiUrl = 'http://www.tulongzhiji.com/meal/',
        environment = 'production';
    if (location.href.indexOf("?dev") > 0) {
        environment = 'development';
        apiUrl = 'http://meal-dev.mopvhs.com/';
    }

    $('#G_about').click(function(e) {
        e.preventDefault();
        var aboutBox = $('#about-box');
        aboutBox.show();
        new Dialog({
            content: aboutBox
        }).show();
    });

//    var imgList = ["1003286.jpg", "1024447.jpg", "1027644.jpg", "1103210.jpg", "1103219.jpg", "1107398.jpg", "1108619.jpg", "125251.jpg", "125631.jpg", "196567.jpg", "379564.jpg", "555738.jpg", "571865.jpg", "65446.jpg", "827021.jpg", "83572.jpg", "87198.jpg", "881930.png", "881934.jpg", "891662.jpg", "938574.jpg"];
//    for(var i in imgList) {
//        imgList[i] = 'http://mopvhs-dev.github.io/static/images/wallpaper-' + imgList[i];
//    }
//    $.backstretch(imgList, {duration: 3000, fade: 750});

//    window.console && console.log && console.log($.fn.jquery);

    $('#G_register').click(function(e){
        e.preventDefault();
        var registerForm = $('#register-form');
        registerForm.show();
        new Dialog({
            content: registerForm
        }).show();
    });
    $('#register-btn').click(function(e){
        e.preventDefault();
        var formData = $('#register-form').serialize();
        var request = $.ajax({
            url: apiUrl + "api/register",
            type: "POST",
            data: formData,
            dataType: "jsonp"
        });
        request.done(function( result ) {
            if(result.success) {
                Cookie.set('auth_str', result.auth_str, {
                    domain: 'github.io',
                    path: '/',
                    expires: 30
                });
                window.location.reload();
            } else {
                new Dialog({
                    content: '<div style="padding:50px">' + result.message + '</div>'
                }).show();
            }
        });
        request.fail(function( jqXHR, textStatus ) {
            new Dialog({
                content: '<div style="padding:50px">请求失败，' + textStatus + '，请刷新页面重试！</div>'
            }).show();
        });
    });

    $('#G_login').click(function(e){
        e.preventDefault();
        var loginForm = $('#login-form');
        loginForm.show();
        new Dialog({
            content: loginForm
        }).show();
    });

    $('#login-btn').click(function(e){
        e.preventDefault();
        var formData = $('#login-form').serialize();
        var request = $.ajax({
            url: apiUrl + "api/login",
            type: "POST",
            data: formData,
            dataType: "jsonp"
        });
        request.done(function( result ) {
            if(result.success) {
                Cookie.set('auth_str', result.auth_str, {
                    domain: 'github.io',
                    path: '/',
                    expires: 30
                });
                window.location.reload();
            } else {
                new Dialog({
                    content: '<div style="padding:50px">' + result.message + '</div>'
                }).show();
            }
        });
        request.fail(function( jqXHR, textStatus ) {
            new Dialog({
                content: '<div style="padding:50px">请求失败，' + textStatus + '，请刷新页面重试！</div>'
            }).show();
        });

    });


    $('#G_logout').click(function(e) {
        e.preventDefault();
        Cookie.remove('auth_str', {
            domain: 'github.io',
            path: '/'
        });
        window.location.reload();
    });

    var authStr = Cookie.get('auth_str');
    var request = $.ajax({
        url: apiUrl + "api/leagueoffruits",
        type: "POST",
        data: { auth_str : authStr },
        dataType: "jsonp"
    });
    request.done(function( result ) {
        if(result.success) {
            $('.guest-nav').hide();
            $('.member-nav').show();
            $('.user-status').html(result.email);
            for(var i in result.staff) {
                $('.staff-box .ui-box-content').append('<button class="ui-button ui-button-mwhite">'+result.staff[i]+'</button>');
            }
        } else {
            $('.guest-nav').show();
            $('.member-nav').hide();
        }
    });
    request.fail(function( jqXHR, textStatus ) {
        $('.user-status').html('无法连接服务器');
    });

});