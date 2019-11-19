<?php
header('content-type:textml;charset=utf-8');
require "conn.php"; 
if (isset($_POST['user_name'])) {
    $user_name = $_POST['user_name'];
    $result = $mysqli->query("select * from users where user_name='$user_name'");
    if ($result->fetch_assoc()) {
        echo 'true';
    } else {
        echo 'false';
    };
} else {
    exit('非法操作'); //退出并打印出内部的信息
};

if (isset($_POST['submit'])) {
    $user_name = $_POST['user_name'];
    $user_tel = $_POST['user_tel'];
    $user_pwd = sha1($_POST['user_pwd']);
   $mysqli->query("INSERT INTO `users` (`id`, `user_name`, `user_tel`, `user_pwd`) VALUES (NULL, '$user_name', '$user_tel', '$user_pwd')");
   echo '<script> location.href = "http://127.0.0.1:8080/wangyi.project/src/html/login.html"</script>';
};
?>



