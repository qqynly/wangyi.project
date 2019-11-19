//渲染详情页
(function ($) {
    //获取商品列表传来的id

    let sid = location.search.substring(1).split('=')[1];//截取地址栏的id值
    let htmlstr = '';
    // console.log(sid);
    const $spic = $('.spic');//小图
    const $bpic = $('.bf');//大图
    const $sf = $('.sf');
    const $title = $('.primary-info h1');//商品主标题
    const $stitle = $('.promotion-words span');//商品副标题
    const $price = $('.now-price');//价格
    const $allprice = $('.totalPrice');//总价
    const btn = $('.btn1')//加入购物车
    const linkbox = $('.linkbox');//加入购物车成功弹出框
    const del = $('.linkbox span');//删除弹出框

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8080/project/src/php/details.php",
        data: {
            picid: sid
        },
        dataType: "json",

        success: function (product) {
            //1.拼接放大镜图片等信息
            $('.spic img').attr("src", product.bigpic);
            $('.bf img').attr("src", product.bigpic);
            $title.html(product.dtitle);
            $stitle.html(product.dstitle);
            $price.html('¥' + product.newprice);
            $allprice.html('¥' + product.newprice);



            //拼接小图列表。
            let $ullist = product.piclist.split(',');
            // $('.clear li img').attr("src", $ullist[i]);
            $.each($ullist, function (i, e) {
                // console.log($ullist[i]);
                $('.clear li img').eq(i).attr("src", $ullist[i]);
            });


            //物品总价
            const $pricebutton = $('.tb2 input');//点击添加按钮
            const price = $allprice.html().slice(1, -1);
            // console.log(price);

            $pricebutton.on('click blur', function () {
                let newprice = +$pricebutton.val() * price;
                $allprice.html('￥' + newprice + '元');
            });

        }

    });


    //tab切换
    // console.log($('.clear li img'));
    $('.clear li img').on('click', function () {
        let imgurl = $(this).attr('src');
        // console.log(imgurl);
        $('.spic img').attr({ src: imgurl });
        $('.bpic').attr({ src: imgurl });
    });



    //cookie
    let arrsid = [];
    let arrnum = [];
    //如果cookie存在，获取cookie的值，并转换成数组。
    function cookievalue() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');//转换数组
            arrnum = getcookie('cookienum').split(',');//转换数组
        }
    };

    // console.log(btn.length);
    btn.on('click', function () {
        // console.log($('.tb2 input').val())
        // console.log(btn);
        //确定按钮是第一次还是多次。
        //先获取cookie的值,而且是一个数组。
        cookievalue();
        //当前按钮对应得sid，如果当前按钮对应得sid存在arrsid中，存在
        if (arrsid.indexOf(sid) === -1) {//不存在
            arrsid.push(sid);
            arrnum.push($('.tb2 input').val());
            // const num = $('.tb2').val();//件数
            setcookie('cookiesid', arrsid.toString(), 10);
            setcookie('cookienum', arrnum.toString(), 10);
        } else {//存在，数量累计
            let sum = Number(arrnum[arrsid.indexOf(sid)]) + Number($('.tb2 input').val());//获取累加的值
            arrnum[arrsid.indexOf(sid)] = sum;
            setcookie('cookienum', arrnum.toString(), 10);
        }

        linkbox.css("display", "block");
    });
    del.on('click', function () {
        linkbox.css({ "display": "none", "cursor": "pointer" });
    })

})(jQuery);



//放大镜
(function ($) {

    function Banner() {
        this.banner = $('.banner')[0];
        this.spic = $('.spic')[0];
        this.sf = $('.sf')[0];
        this.bf = $('.bf')[0];
        this.bpic = $('.bpic')[0];
        let that = this;



        this.init = function () {
            // console.log(this.spic);
            this.spic.onmouseover = function () {
                that.show();
                that.sfsize();

                this.onmousemove = function (e) {
                    var e = e || event;

                    that.followmouse(e);
                }
            };


            this.spic.onmouseout = function () {
                that.hide();
            };

        };



        this.show = function () {
            this.sf.style.visibility = 'visible';
            this.bf.style.visibility = 'visible';
        }

        this.hide = function () {
            this.sf.style.visibility = 'hidden';
            this.bf.style.visibility = 'hidden';
        }


        this.sfsize = function () {
            this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth / this.bpic.offsetWidth + "px";
            this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bpic.offsetHeight + "px";
            this.bili = this.bpic.offsetWidth / this.spic.offsetWidth;
        }


        this.followmouse = function (e) {
            let l = e.clientX - this.banner.offsetLeft - this.sf.offsetWidth / 2;
            let t = e.clientY - this.banner.offsetTop - this.sf.offsetHeight / 2;

            if (l <= 0) {
                l = 0;
            } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth - 2) {
                l = this.spic.offsetWidth - this.sf.offsetWidth - 2;
            }
            if (t <= 0) {
                t = 0;
            } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight - 2) {
                t = this.spic.offsetHeight - this.sf.offsetHeight - 2;
            }


            this.sf.style.left = l + "px";
            this.sf.style.top = t + "px";
            this.bpic.style.left = -l * this.bili + "px";
            this.bpic.style.top = -t * this.bili + "px";
        }
    }


    new Banner().init();
})(jQuery);


