$(function(){
    addHistory();
    queryHistory();
    searchScroll();
    deleteHistory();
    clearHistory();

    function searchScroll(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }


    //1.添加搜索记录
    function addHistory(){
         
        // var arr = [];  在次打开页面会把数组恢复成空数组
        var arr = localStorage.getItem('searchNr');
        // 如果没有值得到的是null,证明是没有记录过local
        // 如果有值 需要先把字符窜格式更改
        if(arr == null){
            arr =[]
        }else{
            arr =JSON.parse(arr)
        }
        //点击事件
        $('#search-btn').on('tap',function(){
            var inputNr = $('#search-imp').val().trim();
            $('#search-imp').val('');
            // 输入的是空值
            if(inputNr == ""){
                return;
            }

            //数组去从 
            for(var i = 0;i<=arr.length;i++){
                if(arr[i] == inputNr){
                    // !!把旧的删除
                    arr.splice(i,1);
                }
            };
            console.log(arr);
            //添加数组内容 在前面
            arr.unshift(inputNr);
            
            localStorage.setItem('searchNr',JSON.stringify(arr));
            queryHistory();
            //跳转搜索页面  要拼接URL方式传递
            location = '/m/productlist.html?search='+inputNr;
        })
    }


    //2.查询搜索记录
    function queryHistory(){
        var arr = localStorage.getItem('searchNr');
        if(arr == null){
            arr =[]
        }else{
            arr =JSON.parse(arr)
        }
        var html = template('seachTpl',{list:arr});
        $('.search-content ul').html(html);
    }


    //3.删除记录
    function deleteHistory(){
        var arr = localStorage.getItem('searchNr');
        if(arr == null){
            arr =[]
        }else{
            arr =JSON.parse(arr)
        }
        $('.mui-card-content ul').on('tap','span',function(){
            var index = $(this).data('index');
            arr.splice(index,1);
            localStorage.setItem('searchNr',JSON.stringify(arr));
            queryHistory(); 
        })
    }

     //4.清空记录
     function clearHistory(){
        var arr = localStorage.getItem('searchNr');
        if(arr == null){
            arr =[]
        }else{
            arr =JSON.parse(arr)
        }
        $('.btn-clear').on('tap',function(){
            localStorage.removeItem('searchNr');
            queryHistory();
        })
    }


    //点击添加
    $('.mui-table-view-cell').on('tap',function(){
        var seachNr= $(this).text();
        $('#search-imp').val(seachNr)
    })
})


   