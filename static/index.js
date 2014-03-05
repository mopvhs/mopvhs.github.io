/**
 * Created by mopvhs on 14-3-5.
 */
seajs.use(['dialog','$'], function(Dialog, $) {
    new Dialog({
        trigger: '#clickmed',
        content: $('#login-box')
    });
});

seajs.use('$', function($) {
    $(function() {
        var authStr = '', Cookie = {};
        seajs.use('cookie', function(C) {
            Cookie = C;
        });

        authStr = Cookie.get('auth_str');

        // Reuqest Start
        var request = $.ajax({
            url: "http://meal-dev.mopvhs.com/api/initialize",
            type: "POST",
            data: { auth_str : authStr },
            dataType: "jsonp"
        });

        request.done(function( result ) {
            if(result.success) {
                $('.user-status').html(result.email);
                var fontIco = '';
                if(result.judge > 6 && result.judge < 18) {
                    $('.subitem-day').addClass('ui-nav-subitem-current');
                    fontIco = '&#xf0205;';
                } else {
                    $('.subitem-night').addClass('ui-nav-subitem-current');
                    fontIco = '&#xf01e4;';
                }
                $('.top-show .logo .iconfont').html();
                console.log(result);
                /*
                 console.log(result);
                 seajs.use(['dialog'], function(Dialog) {
                 new Dialog({
                 content: '<div style="padding:50px">请求成功！，' + result.message + '</div>'
                 }).show();
                 });
                 */
            } else {
                console.log(result);
                $('#login-box').show();
            }
        });

        request.fail(function( jqXHR, textStatus ) {
            seajs.use(['dialog'], function(Dialog) {
                new Dialog({
                    content: '<div style="padding:50px">请求失败，' + textStatus + '，请刷新页面重试！</div>'
                }).show();
            });
        });
        // End Reuqest

        $('#login-btn').click(function(e){
            e.preventDefault();
            var formData = $('#login-form').serialize();
            var request = $.ajax({
                url: "http://meal-dev.mopvhs.com/api/login/",
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
                } else {
                    console.log(result);
                }
            });
            request.fail(function( jqXHR, textStatus ) {
                seajs.use(['dialog'], function(Dialog) {
                    new Dialog({
                        content: '<div style="padding:50px">请求失败，' + textStatus + '，请刷新页面重试！</div>'
                    }).show();
                });
            });

        });

        $('#register-btn').click(function(e){
            e.preventDefault();
            var formData = $('#register-form').serialize();
            console.log(formData);
            var request = $.ajax({
                url: "http://meal-dev.mopvhs.com/api/register",
                type: "POST",
                data: formData,
                dataType: "jsonp"
            });
            request.done(function( result ) {
                console.log(result);
                if(result.success) {
                    Cookie.set('auth_str', result.auth_str, {
                        domain: 'github.io',
                        path: '/',
                        expires: 30
                    });
                } else {
                    console.log(result);
                }
            });
            request.fail(function( jqXHR, textStatus ) {
                seajs.use(['dialog'], function(Dialog) {
                    new Dialog({
                        content: '<div style="padding:50px">请求失败，' + textStatus + '，请刷新页面重试！</div>'
                    }).show();
                });
            });
        });

        $('#clickme').click(function(e){
            e.preventDefault();
            seajs.use('cookie', function(Cookie) {
                console.log(Cookie);
            });
        });
    });

});
seajs.use(['arale/switchable/1.0.2/tabs'], function(Tabs) {
    tabs = new Tabs({
        element: '#tab-demo-1',
        triggers: '.ui-switchable-nav li',
        panels: '.ui-switchable-content .hidden',
        activeIndex: 0,
        effect: 'none',
        activeTriggerClass: 'ui-tab-item-current'
    });
});