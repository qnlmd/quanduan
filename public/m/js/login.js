$(function () {
    doLogin();



    function doLogin(){
        $('.dengLu').on('tap',function(){
            var userName = $('.userName').val().trim();
            if(!userName){
                mui.toast('账号不能为空',{ duration:'long', type:'div' }) 
                return;
            }

            var password = $('.password').val().trim();
            if(!password){
                mui.toast('密码不能为空',{ duration:'long', type:'div' }) 
                return;
            }
            $.ajax({
                url:'/user/login',
                type:'post',
                data:{
                    username:userName,
                    password:password,
                },
                success:function(obj){
                    if(obj.success){
                        location = getUrlParams('returnUrl');
                    }else{
                        mui.toast('请输入正确的账号或密码',{ duration:'long', type:'div' }) 
                    }
                }
            })
        })
    }
//     itcast
// 111111


    //2.获取url正则的方法
    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})