/**
 * Created by cai on 2015/1/7.
 */
//页面响应式
var commonJS= {
    mobileMeta: function () {
        var phoneWidth = parseInt(window.screen.width);
        console.log(phoneWidth);
        commonJS.phoneScale = phoneWidth / 640;
        var ua = navigator.userAgent;
        if (/Android (\d+\.\d+)/.test(ua)) {
            var version = parseFloat(RegExp.$1);
            // andriod 2.3
            if (version > 2.3) {
                document.write('<meta name="viewport" content="width=640, minimum-scale = ' + commonJS.phoneScale + ', maximum-scale = ' + commonJS.phoneScale + ', target-densitydpi=device-dpi">');
                // andriod 2.3以上
            } else {
                document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
            }
            //document.write('<meta name="viewport" content="width=640, minimum-scale = ' + commonJS.phoneScale + ', maximum-scale = ' + commonJS.phoneScale + ', target-densitydpi=device-dpi">');

            // 其他系统
        } else {

            if(/ipad/i.test(ua))
            {
                document.write('<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">');

            }
            else{
                document.write('<meta name="viewport" content="width=640, user-scalable=no ,minimum-scale = ' + commonJS.phoneScale + ', maximum-scale = ' + commonJS.phoneScale + '">');
            }
        }
    },
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile:u.indexOf('Mobile')> -1, //是否为移动终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    },
    phoneScale:0
}
commonJS.mobileMeta();

function tragethref() {
    window.parent.location.href = "http://m.haituncun.com"
}

////背景图片适应
//$(function(){
//	var h = parseInt(window.screen.height);
//	commonJS.isPad?$(".contaner").css("height",h):$(".contaner").css("height",h/commonJS.phoneScale);
//})
