$(document).ready(function () {
    // 기존 코드 유지
    let isThrottled = false;

    $(".menu").hover(
        function () {
            if ($("header").hasClass("on")) {
                $(".nav_bg").addClass("on");
            }
        },
        function () {
            $(".nav_bg").removeClass("on");
        }
    );

    $(".mobile_menu img").on("click", function (e) {
        $(".nav_bg_mobile").css({
            "right": "0",
            "width": "100%",
        });
        $("body").addClass("no-scroll"); 
    });

    $(".nav_bg_mobile img.close").on("click", function (e) {
        $(".nav_bg_mobile").css({
            "right": "-960px", 
            "width": "0px",
        });
        $("body").removeClass("no-scroll");
    });

    $(window).on('wheel', function (e) {
        if (!isThrottled) {
            isThrottled = true;

            let delta = e.originalEvent.deltaY || -e.originalEvent.wheelDelta || 0;
            let scrollTop = $(window).scrollTop();

            if (delta > 95) {
                if (!$("header").hasClass("on")) {
                    $("header").addClass("on");
                }
            } else if (delta < -95) {
                if (scrollTop <= 600) {
                    setTimeout(function () {
                        $("header").removeClass("on");
                    }, 400);
                }
            }

            setTimeout(function () {
                isThrottled = false;
            }, 100);
        }
    });

    $(".img_tech_prsp01, .img_tech_prsp02, .img_tech_prsp03, .img_tech_aicam01, .img_tech_aicam02").addClass("visible");

    $(window).on("scroll", function () {
        $(".content_wrap").each(function () {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > elementTop + 150) {
                $(this).addClass("visible"); // 본인에게 visible 추가
                $(this).find(".fade-left").addClass("visible");
                $(this).find(".fade-right").addClass("visible");
                $(this).find(".fade-in").addClass("visible");
                $(this).find("ul li.fade-in").addClass("visible");
            }
        });

        $("section.tech.AIcam .content_wrap.third").each(function () {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > elementTop + 50) {
                if (!$(this).find(".fade-in-tech").first().hasClass("visible")) {
                    $(this).find(".fade-in-tech").addClass("visible");
                    $(this).addClass("visible");

                    setTimeout(function () {
                        $('.percentage').each(function () {
                            const $this = $(this);
                            const targetValue = parseFloat($this.text());
                            let currentValue = 0;

                            $({ countNum: currentValue }).animate({ countNum: targetValue }, {
                                duration: 2000,
                                easing: 'swing',
                                step: function () {
                                    $this.text(this.countNum.toFixed(2) + "%");
                                }
                            });
                        });
                    }, 1000);
                }
            }
        });

        // 새로 추가된 fade-in-setTime 순차 애니메이션
        $(".content_wrap").each(function () {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
    
            if (windowBottom > elementTop + 150) { // 화면에 보이면
                // 0.5초 지연 후 순차 애니메이션 실행
                setTimeout(() => {
                    const fadeElements = $(this).find(".fade-in-setTime");
                    fadeElements.each(function (index) {
                        const $element = $(this);
                        setTimeout(function () {
                            $element.addClass("visible");
                        }, index * 200); // 각 요소마다 200ms 딜레이 추가
                    });
                }, 500); // 전체 실행 지연 시간 (500ms)
            }
        });
    });

    // --quick_wrap - top으로 가기 퀵버튼
    $('.quick_wrap').on('click', function (e) {
        $('html, body').animate({ scrollTop: 0 }, 300, function () {
            setTimeout(function () {
                if ($('header').hasClass('on')) {
                    $('header').removeClass('on');
                }
            }, 400);
        });
    });

    $('.select_device').click(function () {
        $('.select_device').removeClass('active');
        $(this).addClass('active');
    });

    $('.sel_w button').click(function (event) {
        event.stopPropagation();
        $(this).parent().parent('.select_device').removeClass('active');
    });

    // -- 모달 닫기
    $("span.quit").click(function () {
        $("#modalQuit").addClass('on');
    });

    $(".modal_close").click(function () {
        $(".modal_popup").removeClass('on');
    });

    $(".btn_contact").click(function () {
        $("#modalContact").addClass('on');
    });

    $(".checkbox_wrap p").click(function () {
        $(".terms_box").toggleClass("on");
    });

    $(".dropdown").on("click", function () {
        $(".dropdown_list").toggleClass("on")
        $(".dropdown img").toggleClass("flipped")
    });

    $(".modal_popup .submit").click(function () {
        $(".modal_popup .step.first").removeClass("on");
        $(".modal_popup .step.second").addClass("on");
    });

    $(".modal_popup .modal_close").click(function () {
        setTimeout(function () {
            $(".modal_popup .step.second").removeClass("on");
            $(".modal_popup .step.first").addClass("on");
        }, 700);
    });

    const quickWrap = $('.quick_wrap');
    const showPosition = 300;
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > showPosition) {
            quickWrap.addClass('visible');
        } else {
            quickWrap.removeClass('visible');
        }
    });

    $('.device_state > span:not(.quit)').on('click', function () {
        const offLineImg = $(this).find('.off_line');
        $(this).toggleClass('active');
        offLineImg.toggle();
        $(this).css('background-color', $(this).hasClass('active') ? '#ff2727b1' : '#17c35fb5');
    });

    $(".btn_start").click(function () {
        $(".start_wrap").css("display", "none");
        $(".camera_wrap").css("display", "block");
    });

    // 640부터 fade-in-tech 클래스 붙음
    function applyFadeInClass() {
        const section = $('.tech.AIcam');
        if (section.length && $(window).width() >= 640) {
            section.find('li:first').addClass('fade-in-tech');
        }
    }
    
    // 초기 실행
    applyFadeInClass();
    
    // 창 크기 변경 시 실행
    $(window).on('resize', applyFadeInClass);
        

    // tech_PRSP - mobile swiper slide
    const swiper = new Swiper('.cam_swiper', {
        loop: true,
        spaceBetween: 30,
  
        // 페이지네이션
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
  
        // 내비게이션 버튼
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
  
        // 자동 재생
        autoplay: {
          delay: 3000, // 3초 간격
          disableOnInteraction: false,
        },
      });



});
