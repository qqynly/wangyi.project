(function ($) {
    const itemlist = $('.item-list');//商品列表盒子
    //封装函数实现渲染购物车商品列表
    //通过sid获取对应得接口数据的值。
    function showgoods(sid, num) {

        $.ajax({
            type: "get",
            url: 'http://127.0.0.1:8080/project/src/php/show.php',
            dataType: "json",
            success: function (product) {//获取对应得商品列表的数据
                // if ($.ajax.readyState == 4 && $.ajax.status == 200) {

                let goodshtml = '';
                $.each(product, function (i, e) {
                    // console.log(product[i].id);
                    if (product[i].id == sid) {//通过循环判断当前渲染的商品列表的sid和接口数据picid是否相同。
                        goodshtml += `
                        <div class="goods-item goods-item-sele">
                            <div class="goods-info">
                                <div class="cell b-checkbox">
                                    <div class="cart-checkbox">
                                        <input type="checkbox" checked="" name="" id="" value="">
                                        <span class="line-circle"></span>
                                    </div>
                                </div>
                                <div class="cell b-goods">
                                    <div class="goods-name">
                                        <div class="goods-pic">
                                            <a href=""><img src="${product[i].bigpic}" alt=""></a>
                                        </div>
                                        <div class="goods-msg">
                                            <div class="goods-d-info">
                                                <a href="">${product[i].dtitle}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell b-props">
                                    <div class="prop-text">${product[i].dstitle}</div>
                                </div>
                                <div class="cell b-price">
                                    <strong>${product[i].newprice}</strong>
                                    <div class="sales-promotion-dropdown">
                                    </div>
                                </div>
                                <div class="cell b-quantity">
                                    <div class="quantity-form">
                                        <input type="number" value="${num}">
                                    </div>
                                </div>
                                <div class="cell b-sum">
                                    <strong>${product[i].newprice}</strong>
                                </div>
                                <div class="cell b-action">
                                    <a href="javascript:void(0)">删除</a>
                                </div>
                            </div>
                        </div>`;
                    }
                });
                $('.item-list').html(function (i, val) {
                    // console.log()
                    return val += goodshtml
                });//追加数据
                //计算物品总价
                const $one = $('.b-price strong').parents('.goods-info').find('.quantity-form input');
                console.log($one)


                const $pricebutton = $('.quantity-form input');//点击添加按钮即数量
                const $price = $pricebutton.parents('.goods-info').find('.b-sum strong').html().slice(0, -1);//获取单价
                // console.log($price)


                $(document).ready(function () {
                    let newprice = $pricebutton.val() * $price;
                    $('.b-sum strong').html(newprice + '元');
                })
                $pricebutton.on('click blur', function () {
                    let sum = $(this).parents('.goods-info').find('.b-sum strong');
                    let price = parseFloat($(this).parents('.goods-info').find('.b-price strong').html());
                    sum.html((this.value * price) + '元');
                });
                // }
            }
        });


    };


    //将cookie获取，利用上面的函数进行渲染输出。
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        let arrsid = getcookie('cookiesid').split(',');//将获取的cookie转换成数组
        let arrnum = getcookie('cookienum').split(',');
        // $.each(arrsid, function (i, e) {
        //     // console.log(arrnum[i])
        // });
        for (let i = 0; i < arrsid.length; i++) {
            showgoods(arrsid[i], arrnum[i]);
        }

    }
})(jQuery);
