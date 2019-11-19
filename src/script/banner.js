(function ($) {
    class Slider {
        constructor() {
            this.banner = $('.banner-w');
            this.picul = $('.slider-b');
            this.picli = $('.slider-b li');
            this.btnli = $('.slider-cl li');
            this.left = $('.left');
            this.right = $('.right');
            this.num = 0;
            this.timer = null;
        }
        init() {
            let _this = this;
            let $first = this.picli.first().clone();
            let $last = this.picli.last().clone();
            this.picul.prepend($last);
            this.picul.append($first);
            this.liwidth = this.picli.eq(0).width();
            // console.log(this.liwidth)
            this.picul.width($('.slider-b li').size() * this.liwidth).css('left', -this.liwidth);
            this.btnli.on('click', function () {
                _this.num = $(this).index(); //当前的按钮的索引
                _this.piculmove(_this.num);
                _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
            });
            this.banner.hover(function () {
                $('.left,.right').show();
                clearInterval(_this.timer);
            }, function () {
                $('.left,.right').hide();
                _this.autoplay();
            });
            this.right.on('click', function () {
                _this.num++;
                if (_this.num === _this.btnli.length) {
                    _this.btnli.eq(0).addClass('active').siblings().removeClass('active');
                } else {
                    _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
                }
                _this.piculmove(_this.num);
            });

            this.left.on('click', function () {
                _this.num--;
                _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
                _this.piculmove(_this.num);
            });
            this.autoplay();
        }

        autoplay() {
            let _this = this;
            this.timer = setInterval(function () {
                _this.right.click();
            }, 3000);
        }
        piculmove(index) {
            let _this = this;
            this.picul.animate({
                left: -(this.num + 1) * this.liwidth
            }, 100, function () {
                if (_this.num === _this.btnli.length) {
                    _this.picul.css('left', -_this.liwidth);
                    _this.num = 0;
                }
                if (_this.num === -1) {
                    _this.picul.css('left', -_this.liwidth * _this.btnli.length - 1);
                    _this.num = _this.btnli.length - 1;
                }
            });
        }
    }
    new Slider().init();


})(jQuery);