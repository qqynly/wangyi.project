<?php
header('content-type:textml;charset=utf-8');
require "conn.php"; 

if (isset($_POST['user_name'])&& isset($_POST['user_pwd'])) {
    $user_name = $_POST['user_name'];
    $user_pwd =sha1($_POST['user_pwd']);
    $result = $mysqli->query("select * from users where user_name='$user_name' and user_pwd='$user_pwd'");
    if ($result->fetch_assoc()) {
        echo 'true';
    } else {
        echo 'false';
    };
} else {
    exit('非法操作'); //退出并打印出内部的信息
};

?>