$(function () {
    getUrlParams()
    searchProduct()
    sortProduct()
    nowSearchProduct()
    pullRefresh()
    gonBuy()

    var productName;

    // 1.搜索商品的函数
    function searchProduct() {
        productName = getUrlParams("search");
        queryProduct({
            proName: productName,
        })
    }





    //3 当前商品搜索
    function nowSearchProduct() {
        $('#search-btn').on('tap', function () {
            var productName = $('#search-imp').val().trim();
            if (productName != '') {
                queryProduct({
                    proName: productName,
                    page: 1,
                    pageSize: 4,
                })
            } else {
                return
            }
        })
    }


    function pullRefresh() {
        //4 上下拉
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    callback: pulldownRefresh
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
            setInterval(function(){
                queryProduct({
                    proName: productName,
                    page: 1,
                    pageSize: 2,
    
                })
               
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            },1500)
            
        }

        /**
         * 上拉加载具体业务实现
         */
        var page = 1;
        function pullupRefresh() {
            setTimeout(function () {
                page++;
                $.ajax({
                    url: '/product/queryProduct',
                    data: {
                        proName: productName,
                        page: page,
                        pageSize: 2,
                    },
                    success: function (obj) {
                        var html = template('productTpl', obj);
                        $('.product-list-row').append(html);
                        if(obj.data.length >0 ){
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
                        }else{
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
                        }
                        
                    }
                })
    
            }, 1500);
        }
    }

    //前往立即购买页面
    function gonBuy(){
        $('.product-list-row').on('tap','.product-buy',function(){
            var id = $(this).data('id');
            console.log(id)
            location = 'detail.html?id='+id;
        })
    }




    //1. ajax请求工具
    function queryProduct(params) {
        //设置他的默认值,这样不传值也可以
        params.page = params.page || 1;
        params.pageSize = params.pageSize || 2;
        $.ajax({
            url: '/product/queryProduct',
            data: params,
            success: function (obj) {
                var html = template('productTpl', obj);
                $('.product-list-row').html(html);
            }
        })
    }



    //2.商品排序
    function sortProduct() {
        $('.product-list-header a').on('tap', function () {
            var type = $(this).data('type');
            var sort = $(this).data('sort');
            if (sort == 1) {
                sort = 2;
                //find()后代选择器
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                sort = 1;
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            $(this).data('sort', sort);
            var obj = {
                proName: productName,
                page: 1,
                pageSize: 4
            }
            obj[type] = sort;

            queryProduct(obj)
        })
    }







    //2.获取url正则的方法
    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})