$(function () {
    initLeftScroll();
    initRightScroll();
    queryTopCategory();
    querySecondCategory(1);

    //左侧滑动
    function initLeftScroll() {
        mui('.main-left .mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false,
        });
    }

    //右侧滑动
    function initRightScroll() {
        mui('.main-right .mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }


    // 主体部分左侧的ajax请求
    function queryTopCategory() {
        $.ajax({
            url: '/category/queryTopCategory',
            success: function (data) {
                var html = template('mainLeftTpl', data);
                $('.main-left ul').html(html);
                liClick();
            }

        })
    }

    //主体部分右侧的ajax请求
    function querySecondCategory(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function (data) {
                console.log(data)
                var html = template('mainRightTpl', data)
                $('.main-right .mui-row').html(html)
                
            }
        })
    }

    //点击事件
    function liClick() {
        var lis = $('.main-left ul li');
        console.log(lis);
        lis.on('click', function () {
            var id = $(this).data('id');
            $(this).addClass('active').siblings().removeClass('active');
            querySecondCategory(id);
        })
    }

})