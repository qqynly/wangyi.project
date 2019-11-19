// 页面渲染和懒加载

(function ($) {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8080/project/src/php/show.php",
        dataType: "json",
        success: function (product) {
            let htmlstr = '';
            // console.log(product);
            $.each(product, function (i, e) {
                htmlstr += `
                 <li class="large ">
                        <a href="details.html?sid=${product[i].id}" target="_blank">

                            <div> <span>${product[i].title}</span></div>
                            <div> <b>${product[i].price}</b></div>

                            <img class="lazy" data-original="${product[i].pic}" >
                        </a>
                    </li>
                `
            });
            $('.m-content-list').html(htmlstr);
            $(function () {
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
            });
        }

    });

})(jQuery);




//判断小楼层的位置
(function ($) {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 400) {
            // alert(1);
            $('.stairs-box').removeClass('m-indexSideBar').addClass('new-position');
        } else {
            $('.stairs-box').removeClass('new-position').addClass('m-indexSideBar');
        }
    })
})(jQuery);




//楼梯特效
(function ($) {

    const $louti_lists = $('.item');
    const $louceng_lists = $('.m-menufactures');
    // console.log($louti_lists.not('.firstItem'));
    //点击楼梯跳转
    $louti_lists.on('click', function () {
        $(this).addClass('active-stairs').siblings().removeClass('active-stairs');
        let $louceng_top = $louceng_lists.eq($(this).index('.item') - 1).offset().top;
        console.log($louceng_top);
        $('html,body').animate({
            scrollTop: $louceng_top - 700 + $louceng_lists.height()
        });

    })


    // //根据楼层在页面当前的位置判断楼梯是否被选中
    $(window).on('scroll', function () {
        let $scrolltop = $(window).scrollTop();
        $louceng_lists.each(function (index, element) {
            let $louceng_liststop = $louceng_lists.eq(index).offset().top + $(element).height() - 700 + $louceng_lists.height();
            if ($louceng_liststop >= $scrolltop) {
                $louti_lists.removeClass('active-stairs');
                $louti_lists.eq(index + 1).addClass('active-stairs');
                return false;
            }
        });
    });

})(jQuery);

