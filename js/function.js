var body = $("html, body");
var header = $('header');
var mSlider = {
    counter: 0,
    prevStep: 0,
    prevPos: 0,
    nextPos: '',
    currTopPos: '',
    finishedAnimation: false,
    prevOffset: 0,
    getElements: function (arr) {
        var obj = {};
        for (var i = 0; i < arr.length; ++i)
            obj[i] = arr[i];
        return obj;
    },
    scroll: function (pos, e) {
        if (!body.is(':animated')) {
            this.finishedAnimation = false;
            if (window.pageYOffset < pos.offsetTop) {
                this.prevStep = this.counter + 1;
            } else if (window.pageYOffset > pos.offsetTop) {
                this.prevStep = this.counter - 1;
            }
            body.animate({scrollTop: pos.offsetTop}, 500, function () {
                mSlider.finishedAnimation = true;
                mSlider.prevOffset = window.pageYOffset;
                $('nav a').removeClass('active');
                $('nav').find('[counter=' + mSlider.counter + ']').addClass('active');
                e.preventDefault();
                if (mSlider.counter == 4) {
                    $('nav').hide();
                } else {
                    $('nav').show();
                }
            });
            this.prevPos = pos;
        }

    }
};
var aboutSlider = {
    slideCount: '',
    slideWidth: '',
    slideHeight: '',
    sliderElWidth: this.slideCount * this.slideWidth,
    moveLeft: function () {
        $('.slider_inner').animate({
            left: +this.slideWidth
        }, 200, function () {
            $('.slider_inner .slide:last-child').prependTo('.slider_inner');
            $('.slider_inner').css('left', '');
        });
    },
    moveRight: function () {
        $('.slider_inner').animate({
            left: -this.slideWidth
        }, 200, function () {
            $('.slider_inner .slide:first-child').appendTo('.slider_inner');
            $('.slider_inner').css('left', '');
        });
    }
}
$(window).resize(function () {
    aboutSlider.slideCount = $('.team_slide .slider_inner .slide').length;
    aboutSlider.slideWidth = $('.team_slide .slider').width();
    aboutSlider.slideHeight = $('.team_slide .slider_inner').height();
    aboutSlider.sliderElWidth = parseInt(aboutSlider.slideCount) * parseInt(aboutSlider.slideWidth);
    $('.slider_inner').css({width: aboutSlider.sliderElWidth/*, height: aboutSlider.slideHeight*/});
    $('.slide').css({width: aboutSlider.slideWidth});

    console.log(aboutSlider);

    aboutSlider.sliderElWidth;
});
$(document).ready(function () {
    arr = $('.scroll').children();
    el = mSlider.getElements(arr);
    aboutSlider.slideCount = $('.team_slide .slider_inner .slide').length;
    aboutSlider.slideWidth = $('.team_slide .slider').width();
    aboutSlider.slideHeight = $('.team_slide .slider_inner').height();
    aboutSlider.sliderElWidth = parseInt(aboutSlider.slideCount) * parseInt(aboutSlider.slideWidth);

    $('.we_dev').click(function (e) {
        mSlider.counter = 1;
        mSlider.scroll(arr[mSlider.counter], e);
    });
    $(document).scroll(function (e) {

        if (!body.is(':animated')) {
            if (mSlider.finishedAnimation) {
                mSlider.finishedAnimation = false;
                return;
            }
            if (window.pageYOffset < mSlider.prevOffset && mSlider.counter > 0) {
                mSlider.counter--;
            }
            else if (window.pageYOffset > mSlider.prevOffset && mSlider.counter < arr.length - 1) {
                mSlider.counter++;
            } else if (window.pageYOffset > mSlider.prevOffset && mSlider.counter - 1 < arr.length - 1) {
                e.preventDefault();
                return false;
            }

            if (mSlider.counter < arr.length) {
                mSlider.scroll(arr[mSlider.counter], e);
            }
        }
    });
    $('nav a').click(function (e) {
        $('nav a').removeClass('active');
        $(this).addClass('active');
        mSlider.scroll($($(this).attr('href'))[0], e);
        mSlider.counter = parseInt($(this).attr('counter'));
    });
    $('.slider_inner').css({width: aboutSlider.sliderElWidth/*, height: aboutSlider.slideHeight*/});
    $('.slide').css({width: aboutSlider.slideWidth});
    $('.arrows .left').click(function () {
        aboutSlider.moveLeft();
    });

    $('.arrows .right').click(function () {
        aboutSlider.moveRight();
    });

});