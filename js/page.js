define(function (require, exports, module) {
    function initEvent() {
        var body = $('body');
        var win = $(window);
        var pages = body.find('.page');
        var currentPage = null;//当前页
        var disablePageTouchMove = false;


        var activePage = null,//激活页
            startX = 0,
            startY = 0,
            moveDistanceX = 0,
            moveDistanceY = 0,
            triggerLoop = false,
            isStart = false,
            isNext = false,
            isFirstTime = true;

        //页面之间的切换事件
        $(function ($) {
            //禁止画布跟随滚动
            win.on("scroll.elasticity", function (e) {
                e.preventDefault()
            }).on("touchmove.elasticity", function (e) {
                e.preventDefault()
            });
            win.delegate("img", "mousemove", function (e) {
                e.preventDefault()
            });

            body.on('mousedown touchstart', function (e) {
                if (disablePageTouchMove) {
                    return;
                }

                currentPage = pages.filter('.p-current').get(0);
                activePage = null;
                if (currentPage) {
                    isStart = true;
                    isNext = false;
                    isFirstTime = true;
                    moveDistanceX = 0;
                    moveDistanceY = 0;
                }

                if (e.type == 'touchstart') {//触摸操作
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                } else {
                    startX = e.pageX;
                    startY = e.pageY;
                }
                currentPage.classList.add("moving");
                currentPage.style.webkitTransition = "none";
            }).on('mousemove touchmove', function (e) {
                if (!(isStart && (activePage || isFirstTime))) {
                    return;
                }
                //debugger;
                if (e.type == 'touchmove') {
                    moveDistanceX = e.touches[0].pageX - startX;
                    moveDistanceY = e.touches[0].pageY - startY;
                } else {
                    moveDistanceX = e.pageX - startX;
                    moveDistanceY = e.pageY - startY;
                }

                if (Math.abs(moveDistanceY) > Math.abs(moveDistanceX)) {//竖着滚动位移大于横向滚动
                    if (moveDistanceY > 0) {//往上滑动
                        if (isNext || isFirstTime) {
                            isNext = !1;
                            isFirstTime = !1;
                            if (activePage) {
                                activePage.classList.remove("p-active");
                                activePage.classList.remove("moving");
                            } else {
                                activePage = currentPage.previousElementSibling && currentPage.previousElementSibling.classList.contains("page") ? currentPage.previousElementSibling : triggerLoop ? pages.last().get(0) : !1;
                            }

                            if (activePage && activePage.classList.contains("page")) {
                                activePage.classList.add("p-active");
                                activePage.classList.add("moving");
                                activePage.style.webkitTransition = "none";
                                activePage.style.webkitTransform = "translate3d(0,-100%,0)";
                                $(activePage).trigger("active");
                                currentPage.style.webkitTransformOrigin = "bottom center";
                            } else {
                                currentPage.style.webkitTransform = "translate3d(0,0px,0) scale3d(1,1,1)";
                                activePage = null;
                            }
                        } else {
                            currentPage.style.webkitTransform = "scale3d(" + (window.innerHeight / (window.innerHeight + moveDistanceY)).toFixed(3)+','+(window.innerHeight / (window.innerHeight + moveDistanceY)).toFixed(3)+','+(window.innerHeight / (window.innerHeight + moveDistanceY)).toFixed(3) + ")";
                            if (activePage) {
                                activePage.style.webkitTransform = "translate3d(0,-" + (window.innerHeight - moveDistanceY) + "px,0)";
                            }

                        }
                    } else if (moveDistanceY < 0) {//往下滑动
                        if (!isNext || isFirstTime) {
                            isNext = true;
                            isFirstTime = false;
                            if (activePage) {
                                activePage.classList.remove("p-active");
                                activePage.classList.remove("moving");
                            } else {
                                if (currentPage.nextElementSibling && currentPage.nextElementSibling.classList.contains("page")) {
                                    activePage = currentPage.nextElementSibling;
                                } else {
                                    activePage = pages.first().get(0);
                                    triggerLoop = true;
                                }
                            }

                            if (activePage && activePage.classList.contains("page")) {
                                activePage.classList.add("p-active");
                                activePage.classList.add("moving");
                                activePage.style.webkitTransition = "none";
                                activePage.style.webkitTransform = "translate3d(0," + window.innerHeight + "px,0)";
                                $(activePage).trigger("active");
                                currentPage.style.webkitTransformOrigin = "top center";
                            } else {
                                currentPage.style.webkitTransform = "translate3d(0,0px,0) scale(1)";
                                activePage = null;
                            }
                        } else {
                            currentPage.style.webkitTransform = "scale3d(" + ((window.innerHeight + moveDistanceY) / window.innerHeight).toFixed(3)+','+((window.innerHeight + moveDistanceY) / window.innerHeight).toFixed(3)+','+((window.innerHeight + moveDistanceY) / window.innerHeight).toFixed(3) + ")";
                            activePage.style.webkitTransform = "translate3d(0," + (window.innerHeight + moveDistanceY) + "px,0)";
                        }
                    }
                }
            }).on('mouseup touchend', function (e) {
                if (!isStart) {
                    return;
                }
                isStart = false;

                if (activePage) {
                    disablePageTouchMove = true;
                    currentPage.style.webkitTransition = "-webkit-transform 0.4s ease-out";
                    activePage.style.webkitTransition = "-webkit-transform 0.4s ease-out";
                    if (Math.abs(moveDistanceY) > Math.abs(moveDistanceX) && Math.abs(moveDistanceY) > 100) {
                        if (isNext) {
                            currentPage.style.webkitTransform = "scale3d(0.2,0.2,0.2)";
                            activePage.style.webkitTransform = "translate3d(0,0px,0)";
                        } else {
                            currentPage.style.webkitTransform = "scale3d(0.2,0.2,0.2)";
                            activePage.style.webkitTransform = "translate3d(0,0px,0)";
                        }
                        setTimeout(function () {
                            if (activePage) {
                                activePage.classList.remove("p-active");
                                activePage.classList.remove("moving");
                                activePage.classList.add("p-current");
                            }

                            currentPage.classList.remove("p-current");
                            currentPage.classList.remove("moving");
                            currentPage = $(activePage).trigger("current").get(0);
                            $(currentPage).trigger("hide");
                            disablePageTouchMove = false;
                        }, 400);
                    } else {
                        if (isNext) {
                            currentPage.style.webkitTransform = "scale3d(1,1,1)";
                            activePage.style.webkitTransform = "translate3d(0,100%,0)";
                        } else {
                            currentPage.style.webkitTransform = "scale3d(1,1,1)";
                            activePage.style.webkitTransform = "translate3d(0,-100%,0)";
                        }

                        setTimeout(function () {
                            activePage.classList.remove("p-active");
                            activePage.classList.remove("moving");
                            disablePageTouchMove = false;
                        }, 500);
                    }
                } else {
                    currentPage.classList.remove("moving");
                }
            });
        });
    }

    exports.init = function () {
        initEvent();
    };
    exports.disableFlipPage = function(){
        disablePageTouchMove = true;
    };
    exports.enableFlipPage = function(){
        disablePageTouchMove = false;
    };
});