define("shadow/index/1.0.0/main",["jquery","cookie","dialog","tabs"],function(a){var b=a("jquery"),c=a("cookie"),d=a("dialog");a("tabs");var e="http://www.tulongzhiji.com/meal/",f="production";location.href.indexOf("?dev")>0&&(f="development",e="http://meal-dev.mopvhs.com/"),b("#G_about").click(function(a){a.preventDefault();var c=b("#about-box");c.show(),new d({content:c}).show()});var g=["1003286.jpg","1024447.jpg","1027644.jpg","1103210.jpg","1103219.jpg","1107398.jpg","1108619.jpg","125251.jpg","125631.jpg","196567.jpg","379564.jpg","555738.jpg","571865.jpg","65446.jpg","827021.jpg","83572.jpg","87198.jpg","881930.png","881934.jpg","891662.jpg","938574.jpg"];for(var h in g)g[h]="http://mopvhs-dev.github.io/static/images/wallpaper-"+g[h];b.backstretch(g,{duration:3e3,fade:750}),b("#G_register").click(function(a){a.preventDefault();var c=b("#register-form");c.show(),new d({content:c}).show()}),b("#register-btn").click(function(a){a.preventDefault();var f=b("#register-form").serialize(),g=b.ajax({url:e+"api/register",type:"POST",data:f,dataType:"jsonp"});g.done(function(a){a.success?(c.set("auth_str",a.auth_str,{domain:"github.io",path:"/",expires:30}),window.location.reload()):new d({content:'<div style="padding:50px">'+a.message+"</div>"}).show()}),g.fail(function(a,b){new d({content:'<div style="padding:50px">请求失败，'+b+"，请刷新页面重试！</div>"}).show()})}),b("#G_login").click(function(a){a.preventDefault();var c=b("#login-form");c.show(),new d({content:c}).show()}),b("#login-btn").click(function(a){a.preventDefault();var f=b("#login-form").serialize(),g=b.ajax({url:e+"api/login",type:"POST",data:f,dataType:"jsonp"});g.done(function(a){a.success?(c.set("auth_str",a.auth_str,{domain:"github.io",path:"/",expires:30}),window.location.reload()):new d({content:'<div style="padding:50px">'+a.message+"</div>"}).show()}),g.fail(function(a,b){new d({content:'<div style="padding:50px">请求失败，'+b+"，请刷新页面重试！</div>"}).show()})}),b("#G_logout").click(function(a){a.preventDefault(),c.remove("auth_str",{domain:"github.io",path:"/"}),window.location.reload()});var i=c.get("auth_str"),j=b.ajax({url:e+"api/leagueoffruits",type:"POST",data:{auth_str:i},dataType:"jsonp"});j.done(function(a){if(console.log(a),a.success){b(".guest-nav").hide(),b(".member-nav").show(),b(".user-status").html(a.email);for(var c in a.staff)b(".staff-box .ui-box-content").append('<button class="ui-button ui-button-mwhite">'+a.staff[c]+"</button>")}else b(".guest-nav").show(),b(".member-nav").hide()}),j.fail(function(){b(".user-status").html("无法连接服务器")})});