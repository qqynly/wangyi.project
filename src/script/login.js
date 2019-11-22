(function ($) {
    const $user_name = $('.input1');
    const $user_pwd = $('.input2');
    const $submit = $('.login-button');
    $submit.on('click', function () {
        let $uval = $user_name.val();
        let $pval = $user_pwd.val();
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/project/src/php/login.php",
            data: {
                "user_name": $uval,
                "user_pwd": $pval
            },
            dataType: 'json',
            success: function (response) {
                if (!response) {
                    alert('用户名或密码错误')
                } else {
                    location.href = "show.html";
                }
            }
        });
    })
})(jQuery);

//正则验证
(function ($) {
    let $user_name = $('.sms-input');
    let $user_pwd = $('.pss-input');
    let $errname = $('.username_input');
    let $errpass = $('.password_input');
    $user_name.on('blur', function () {
        if (!(/^[a-zA-Z0-9_-]{4,16}$/.test($user_name.val()))) {
            $errname.html('用户名格式错误，请重新填写');
            $errname.css({ "color": "red", "font-weight": "900", "line-height": "2em", "vertical-align": "middle" });
            return false;
        }
    });
    $user_pwd.on('blur', function () {
        if (!(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test($user_pwd.val()))) {
            $errpass.html('密码格式错误，请重新填写');
            $errpass.css({ "color": "red", "font-weight": "900", "line-height": "2em", "vertical-align": "middle" });
            return false;
        }
    });

})(jQuery);

//两周内可登陆
(function ($) {
    let $username = $('.input1');
    let $password = $('.input2');


    //存cookie
    $('.inner-box .login-button').on('click', function () {
        if ($('.time-holder .weeks').prop('checked')) {
            let json = JSON.stringify({
                user: $username.val(),
                pwd: $password.val(),
            })
            json = escape(json)
            $.cookie("wangyi", json, { expires: 14, path: '/' })

            //取消cookie
            if (!($('.time-holder .weeks').prop('checked'))) {
                $.removeCookie("wangyi", { path: '/' });
            }

        }
    })




    //刷新页面取cookie

    $(document).ready(function () {

        if (document.cookie) {

            $(".time-holder .weeks").attr("checked", true);
            let arr = decodeURI(document.cookie).split('; ');

            for (let i = 0; i < arr.length; i++) {
                let arr1 = arr[i].split('=');

                if (arr1[0] === "wangyi") {
                    let arr2 = JSON.parse(unescape(arr1[1]));
                    $('.input1').val(arr2.user);
                    $('.input2').val(arr2.pwd);
                }

            }
        } else {
            $(".time-holder .weeks").attr("checked", false);
        }

    });
})(jQuery);