define(function (require, exports, module) {
    var page = require('pagetransitions');

    if(gVar.luncherIsOpen==1){
        //擦除封面
        var clip = require('clip');
        clip.init(function(){
            //页面滑动初始化
            page.init();
        });
        setTimeout(function(){
            $('.loading').remove();
        },1000);
    }else{
        //页面滑动初始化
        page.init();
    }

    //图片飞动初始化
    require("flyingCarousel");
    var flyPages = $(".page-flying");
    flyPages.each(function (i, item) {
        var fpage = $(item);
        var flycar = fpage.find(".flying-items").flyingCarousel();
        fpage.on("active", function () {
            flycar.removeClass("z-viewArea").find("li.p-current").removeClass("p-current");
        }).on("current", function () {
            flycar.addClass("z-viewArea");
            setTimeout(function () {
                flycar.find("li:first").addClass("p-current");
            }, 1800);
        })
    });

    //初始化视频组件
    //var youku = require('video/youku');
    //youku.init();

    //初始化音乐组件
    if(gVar.bkMusicIsOpen==1){
        var g_audio = $(".ui-music audio").get(0),isPlay = false;
        g_audio.pause();
        $('body').on('mousedown touchstart', function (e) {
            if(!isPlay){
                g_audio.src = $(g_audio).attr('data-src');
                g_audio.play();
                isPlay = true;
                $('.ui-music').addClass('playing');
                $(g_audio).attr('data-play',1);
            }
        });

        $('.ui-music').on(!Modernizr.touch ? "click" : "tap", function (e) {
            e.preventDefault();
            if($(g_audio).attr('data-play')==1){
                g_audio.pause();
                $(g_audio).attr('data-play',0);
                $('.ui-music').removeClass('playing');
            }else{
                g_audio.play();
                $(g_audio).attr('data-play',1);
                $('.ui-music').addClass('playing');
            }
        });
    }

    //自定义表单数据提交
    $('.p-form-submit a').on(!Modernizr.touch ? "click" : "tap", function (e) {
        e.preventDefault();

        var alink = $(this);
        var q = alink.data('q').split('<||>');
        var qid = alink.data('qid');
        var page = alink.data('page');

        var res=[];
        for(var i= 0,len= q.length;i<len;i++){
            var type = q[i].split('<|>')[1];
            var n = 'input_'+page+'_'+i;

            if(type=='text'){
                res.push($("input[name='"+n+"']").val());
            }else if(type=='radio'){
                res.push($("input[name='"+n+"']:checked").val());
            }else if(type=='checkbox'){
                res.push($("input[name='"+n+"']:checked").val());
            }else if(type=='select'){
                res.push($("select[name='"+n+"']").val());
            }
        }

        //$.post('http://linkfashion.com/linkapi/index.php/api/add_collect_answer', JSON.stringify({questionId: qid, answer:res.join('<|>'), appId : gVar.appId}), function(ret){
        //    if(ret.code==0){
        //        alert('提交成功');
        //        $('#page_'+page+' input[type=text]').val('');
        //    }
        //});
    });

    //微信分享注册
   //require('wechat/share');

    //$.getJSON("http://linkfashion.com/linkapi/index.php/api/pageView?appId="+gVar.appId+"&appName="+gVar.appName);
});