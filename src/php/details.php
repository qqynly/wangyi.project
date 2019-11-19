<?php
header('content-type:textml;charset=utf-8');
require "./conn.php"; 

//获取details.js中传递过来的itemid
if(isset($_GET['picid'])){
    $sid=$_GET['picid'];
    $result=$mysqli->query("select * from product where id=$sid");
    echo json_encode($result->fetch_assoc());
}

?>