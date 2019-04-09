$(function () {
    queryProductDetail()
    addCart()

    //商品详情
    function queryProductDetail() {
        var id = getUrlParams('id');
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (obj) {
                var minSize = +obj.size.split('-')[0];
                var maxSize = +obj.size.split('-')[1];
                obj.size = [];
                for (var i = minSize; i <= maxSize; i++) {
                    obj.size.push(i);
                }
                var html = template('detailTpl', obj);
                $('#main').html(html);

                // 因为里面的功能都是模板引擎添加出来的 所以需要在生成模板后在调用功能

                // 1. 尺码颜色
                $('#main').on('tap','.btn-size',function(){
                    $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning')
                })

                // 2.轮播图
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
                // 3.数量
                mui('.mui-numbox').numbox();
                //4.区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        })
    }

    // 加入购物车
    function addCart(){
        $('.btn-add-cart').on('tap',function(){
            var size = $('.mui-btn.mui-btn-warning').data('size');
            
            if(!size){  //值等于undefiend时进入
                mui.toast('请选择尺码',{ duration:'long', type:'div' });
                return;
            }
            var num = mui('.mui-numbox').numbox().getValue();
            var id = getUrlParams('id')

            $.ajax({
                url:'/cart/addCart',
                type:'post',
                data:{
                    productId:id,
                    num:num,
                    size:size,
                },
                success:function(obj){
                    if(obj.error){ //表示没有登陆
                        location='login.html?returnUrl='+location.href;  //带上原来的网址 方便回来
                    }else{ //表示登陆过的可以添加
                        
                        mui.confirm('您真的要去购物车查看吗？', '温馨提示', ['确定', '取消'], function (e) {
                            // 回调函数当点击了确定 或者 取消就会触发函数
                            if (e.index == 0) {
                                // 8. 表示点击了左边按钮 跳转到购物车页面
                                location = 'cart.html';
                            } else {
                                // 9. 表示点击了右边的按钮 提示用户继续添加
                                mui.toast('请继续添加!', {
                                    duration: 1000,
                                    type: 'div'
                                });
                            }
                        })
                    }
                }
            })
            
        })
    }


    //1.获取url正则的方法
    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

})