/**
 * Created by mopvhs on 14-3-5.
 */
define("shadow/index/1.0.0/main-debug", [ "jquery-debug", "cookie-debug", "tabs-debug", "dialog-debug" ], function(require) {
    var $ = require("jquery-debug"), Cookie = require("cookie-debug"), apiUrl = "http://www.tulongzhiji.com/meal/";
    var environment = "production";
    if (location.href.indexOf("?dev") > 0) {
        environment = "development";
        apiUrl = "http://meal-dev.mopvhs.com/";
    }
    if (environment == "development") {
        $(".environment-status").html("开发模式");
    } else {
        $(".environment-status").html("线上模式");
    }
    var Tabs = require("tabs-debug"), Dialog = require("dialog-debug");
    tabs = new Tabs({
        element: "#tab-demo-1",
        triggers: ".ui-switchable-nav li",
        panels: ".ui-switchable-content .hidden",
        activeIndex: 0,
        effect: "none",
        activeTriggerClass: "ui-tab-item-current"
    });
    $("#login-btn").click(function(e) {
        e.preventDefault();
        var formData = $("#login-form").serialize();
        var request = $.ajax({
            url: apiUrl + "api/login",
            type: "POST",
            data: formData,
            dataType: "jsonp"
        });
        request.done(function(result) {
            if (result.success) {
                Cookie.set("auth_str", result.auth_str, {
                    domain: "github.io",
                    path: "/",
                    expires: 30
                });
                window.location.reload();
            } else {
                new Dialog({
                    content: '<div style="padding:50px">' + result.message + "</div>"
                }).show();
            }
        });
        request.fail(function(jqXHR, textStatus) {
            new Dialog({
                content: '<div style="padding:50px">请求失败，' + textStatus + "，请刷新页面重试！</div>"
            }).show();
        });
    });
    $("#register-btn").click(function(e) {
        e.preventDefault();
        var formData = $("#register-form").serialize();
        var request = $.ajax({
            url: apiUrl + "api/register",
            type: "POST",
            data: formData,
            dataType: "jsonp"
        });
        request.done(function(result) {
            //            console.log(result);
            if (result.success) {
                Cookie.set("auth_str", result.auth_str, {
                    domain: "github.io",
                    path: "/",
                    expires: 30
                });
                window.location.reload();
            } else {
                new Dialog({
                    content: '<div style="padding:50px">' + result.message + "</div>"
                }).show();
            }
        });
        request.fail(function(jqXHR, textStatus) {
            new Dialog({
                content: '<div style="padding:50px">请求失败，' + textStatus + "，请刷新页面重试！</div>"
            }).show();
        });
    });
    var authStr = Cookie.get("auth_str");
    var request = $.ajax({
        url: apiUrl + "api/initialize",
        type: "POST",
        data: {
            auth_str: authStr
        },
        dataType: "jsonp"
    });
    request.done(function(result) {
        //        console.log(result);
        if (result.success) {
            $(".user-status").html(result.email);
            var fontIco = "";
            if (result.judge > 6 && result.judge < 18) {
                $(".subitem-day").addClass("ui-nav-subitem-current");
                fontIco = "&#xf0205;";
            } else {
                $(".subitem-night").addClass("ui-nav-subitem-current");
                fontIco = "&#xf01e4;";
            }
            $(".top-show .logo .iconfont").html(fontIco);
        } else {
            $("#login-box").show();
        }
    });
    request.fail(function(jqXHR, textStatus) {
        $(".user-status").html("无法连接服务器");
    });
    window.console && console.log && console.log($.fn.jquery);
});
