document.addEventListener("DOMContentLoaded", function () {


  // ----------------------------------------
  //
  //			helpers functions
  //
  // ----------------------------------------

  const _v = {
    raf(fn) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          fn();
        })
      })
    },
    getScrollBarWidth() {
      var div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      var scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      return scrollWidth;
    },
    getPageFullHeight() {
      return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
    },
    getPageFullWidth() {
      return Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );
    },
    getCurrentScroll() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },
    isChrome() {
      return navigator.userAgent.indexOf('Chrome') > -1;
    },
    isSafari() {
      let safari = null;
      if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        safari = true;
      }
      return safari;
    },
    isFirefox() {
      return navigator.userAgent.indexOf('Firefox') > -1;
    },
    isIe() {
      return navigator.userAgent.indexOf('MSIE') > -1;
    },
    throttle(func, ms) {
      var isThrottled = false,
        savedArgs,
        savedThis;

      function wrapper() {
        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;
          return;
        }
        func.apply(this, arguments);
        isThrottled = true;
        setTimeout(function () {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }
      return wrapper;
    },
    isValidEmail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    isValidPhone: /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/
  };

  //   M E N U

  const menuButton = document.querySelector('.menu-wrapper');
  const closeButton = document.querySelector('.close');
  const fullMenu = document.querySelector('.full-menu');

  if (menuButton && closeButton && fullMenu) {
    menuButton.addEventListener('click', () => {
      fullMenu.classList.add('on');

    });

    closeButton.addEventListener('mouseenter', setHoverForLastMenuItem);
    closeButton.addEventListener('mouseleave', removeHoverForLastMenuItem);

    closeButton.addEventListener('click', () => {
      fullMenu.classList.add('off');
      _v.raf(() => {
        fullMenu.classList.remove('on');
      });
      setTimeout(() => {
        fullMenu.classList.remove('off');
      }, 1000);
    })
  }

  function setHoverForLastMenuItem() {
    let lastMenuItem = document.querySelectorAll('.full-menu__list-item');
    lastMenuItem = lastMenuItem[lastMenuItem.length - 1];
    let img = document.querySelectorAll('.full-menu__img');
    img = img[img.length - 1];
    lastMenuItem.style.cssText = `background-color: var(--mainWhite);
                                  color: var(--mainBlack);
                                  flex-basis: 20.666%;`;
    img.style.cssText = `opacity: 1;
                        transform: translateY(-50%) rotate(-20deg);`
  }

  function removeHoverForLastMenuItem() {
    let lastMenuItem = document.querySelectorAll('.full-menu__list-item');
    lastMenuItem = lastMenuItem[lastMenuItem.length - 1];
    let img = document.querySelectorAll('.full-menu__img');
    img = img[img.length - 1];
    lastMenuItem.style.cssText = ``;
    img.style.cssText = ``;
  }


  $('.everyday__slider').slick({
    fade: true,
    dots: true,
    arrows: false,
    autoplay: true
  });


  $('.employees-about__slider').slick({
    fade: true,
    arrow: true,
    autoplay: true
  });


  $('.sbap-slider__wrapper').slick({
    arrow: true,
  });

  $('.aup__slider').slick({
      centerMode: true,
      slidesToShow: 1,
      centerPadding: '60px',
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  centerPadding: '30px'
              }
          }
      ]
  });

  // PORTFOLIO PAGE

  // Creating clone of our filter and set it like select (for mobile devices)
  var mobile_dd = $("<select />").insertAfter(".filter");
  $(".filter li").each(function() {
      var el = $(this);
      $("<option />", {
          "value"   : el.attr("data-filter"),
          "text"    : el.text()
      }).appendTo(mobile_dd);
  });
  mobile_dd.niceSelect();
  // Filter btns toggle active btn
  var filter_btn = $(".filter li");
    filter_btn.on("click", function(){
      if (!$(this).hasClass("active")){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      }
    })
  // Animating panels of projects (on desktop)
  var mixContainer = $(".mixItUp");
  var mixer = mixitup(mixContainer, {
      selectors: {
          target: '.mix'
      },
      animation: {
          duration: 300
      }
  });
  // Animating with select (on mobile)
  mobile_dd.on('change', function(){
      mixer.filter($(this).val());
  });

  (function() {
    if (document.querySelector('.paralax-wrapper')) {
        const scene = document.querySelector('.paralax-wrapper');
        const parallaxInstance = new Parallax(scene, {
            // relativeInput: true,
            // hoverOnly: true
        });
    }
  }());

});