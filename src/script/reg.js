(function ($) {
    const $user_tel = $('.input0');
    const $user_name = $('.input2');
    const $user_pwd = $('.input3');
    const $submit = $('.login-button');
    const $errname = $('.username_input');
    let $userflag = true;//检测用户名是否重复的标记，用来阻止提交
    $user_name.on('blur', function () {
        let $uval = $user_name.val();
        let $pval = $user_pwd.val();
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/project/src/php/reg.php",
            data: {
                "user_name": $uval,
                "user_pwd": $pval
            },
            dataType: 'json',
            success: function (respond) {
                if (!respond) {
                    $errname.html('√');
                    $errname.css({ "color": "green", "font-weight": "900", "font-size": "14px" });
                    $userflag = true;
                } else {
                    $errname.html('用户名已存在');
                    $errname.css({ "color": "red", "font-weight": "900", "font-size": "14px" });
                    $userflag = false;
                }
            }
        });
    })


    $submit.on('click', function () {
        if (!$userflag) {
            return false;
        }
    });
})(jQuery);

//正则验证
(function ($) {
    let $user_tel = $('.input0');
    let $user_name = $('.input2');
    let $user_pwd = $('.input3');
    let $errname = $('.err_username');
    let $errpass = $('.password_input');
    let $errntel = $('.tel_input');

    $user_tel.on('blur', function () {
        if (!(/^1[3456789]\d{9}$/.test($user_tel.val()))) {
            $errntel.html('手机号格式错误，请重新填写');
            $errntel.css({ "color": "red", "font-weight": "900", "line-height": "2em", "vertical-align": "middle" });
            return false;
        }
    });
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

})(jQuery)