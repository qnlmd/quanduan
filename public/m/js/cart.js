$(function () {
    pullUpOrDown()

    function queryCart() {
        $.ajax({
            url: '/cart/queryCart',
            success: function (obj) {
                var html = template('cartTpl', {
                    data: obj
                });
                console.log(obj)
                $('.listBox').html(html);
            }
        })
    }

    function pullUpOrDown() {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    callback: pulldownRefresh,
                    auto:true
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            setTimeout(function () {
                $.ajax({
                    url:'/cart/queryCartPaging',
                    data:{page:1,pageSize:4},
                    success:function(obj){
                        var html = template('cartTpl',obj)
                        $('.listBox').html(html);
                    }
                })
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                mui('#pullrefresh').pullRefresh().refresh(true);
                page=1;
            }, 1500);
        }
        var page =1;
        /**
         * 上拉加载具体业务实现
         */
        function pullupRefresh() {
            setTimeout(function () {
                page++;
                $.ajax({
                    url:'/cart/queryCartPaging',
                    data:{page:page,pageSize:4},
                    success:function(obj){
                        var html = template('cartTpl',obj)
                        $('.listBox').append(html);
                        if(!obj.data){
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
                        }else{
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
                        }
                        
                    }
                })

                
          
            }, 1500);
        }
    }
})