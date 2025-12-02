$(document).ready(function () {
    // -- 언어 변경 드롭다운
    const toggleDropdown = (selector, activeClass) => {
        $(selector).on("click", function (e) {
            e.stopPropagation();
            $(this).toggleClass(activeClass);
        });
        $(document).on("click", function () {
            $(selector).removeClass(activeClass);
        });
    };

    toggleDropdown(".lang_w", "active");

    $(".drop_w button").on("click", function () {
        $(".lang_w").removeClass("active");
    });

    // -- 모바일 메뉴 열기/닫기
    let scrollPosition = 0;
 
    const toggleMobileMenu = (isOpen) => {
        if (isOpen) {
            scrollPosition = window.pageYOffset;
            $("body, html").addClass("no-scroll").css({
                top: -scrollPosition + "px",
                width: "100%",
            });
            $(".nav_bg_mobile").css({
                right: "0",
                width: "100%",
            });
            $("header").removeClass("on");
        } else {
            $("body, html").removeClass("no-scroll").css({
                top: "",
                position: "",
                width: "",
            });
            window.scrollTo(0, scrollPosition);
            $(".nav_bg_mobile").css({
                right: "-960px",
                width: "0",
            });
            $("header").addClass("on");
        }
    };

    $(".mobile_menu img").on("click", () => toggleMobileMenu(true));
    $(".nav_bg_mobile img.close").on("click", () => toggleMobileMenu(false));

    // -- 모달 열기/닫기
    $(".btn_contact").on("click", function () {
        $("#modalContact").addClass("on");
        $("body").addClass("no-scroll");
    });

    $(".modal_close").on("click", function () {
        $(".modal_popup").removeClass("on");
        $("body").removeClass("no-scroll");

        setTimeout(() => {
            $(".modal_popup .step").removeClass("on");
            $(".modal_popup .step.first").addClass("on");
        }, 700);
    });

    // -- contact us 모달 드롭박스 및 이용약관
    $(".dropdown").on("click", function () {
        $(this).find(".dropdown_list").toggleClass("on");
        $(this).find("img").toggleClass("flipped");
    });

    $(".checkbox_wrap p").on("click", function () {
        $(".terms_box").toggleClass("on");
    });

    $(".modal_popup .submit").on("click", function () {
        $(".modal_popup .step").removeClass("on");
        $(".modal_popup .step.second").addClass("on");
    });

    // -- fade 애니메이션 통합
    const fadeItems = $(".fade-left, .fade-in");
    const handleFadeScroll = () => {
        fadeItems.each(function (index) {
            const $this = $(this);
            const elementTop = $this.offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();

            if (elementTop < viewportBottom && !$this.hasClass("visible")) {
                setTimeout(() => $this.addClass("visible"), index * 200); // 200ms 간격
            }
        });
    };

    // -- Scroll 이벤트 등록
    $(window).on("scroll", handleFadeScroll);

    // -- 초기 호출
    handleFadeScroll();


    // -- 헤더 스크롤 처리
    const THRESHOLD = 50;
    const handleHeaderClass = () => {
        const scrollTop = $(window).scrollTop();
        if (!$("body").hasClass("no-scroll")) {
            $("header").toggleClass("on", scrollTop > THRESHOLD);
        }
    };

    $(window).on("scroll", handleHeaderClass);
    handleHeaderClass();

    // -- aside 드롭메뉴
    $(".aside_mobile").on("click", function () {
        $(".dropdown_list").toggleClass("on");
        $(".dropdown_aside img").toggleClass("flipped");
    });

    // -- quick_wrap top 버튼
    $(".quick_wrap").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 300, function () {
            $("header").removeClass("on");
        });
    });

    // -- 헤더 서브메뉴 토글
    $("header ul li.about").on("click", function () {
        const subMenu = $(this).find(".sub_menu");
        $(".sub_menu").not(subMenu).slideUp();
        subMenu.stop(true, true).slideToggle();
    });

    // -- header hover 상태 처리
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
});
