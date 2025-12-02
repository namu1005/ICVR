$(document).ready(function () {

    const sectionSecond = $("section.second_section");
    const txtWrap = $(".txt_wrap h1 span");
    const paragraph = $(".txt_wrap p");

    const observerOptions = {
        root: null, // viewport 기준
        threshold: 0.5 // 요소가 10% 이상 보일 때 실행
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                txtWrap.addClass("animate"); // 애니메이션 클래스 추가
                paragraph.addClass("animate"); // p 태그 애니메이션 추가
                observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(sectionSecond[0]); // jQuery 객체에서 DOM 요소 추출




    gsap.registerPlugin(ScrollTrigger);

    let pinStart = 80;
    let gap = 30;

    // section.technology 스크롤 고정
    ScrollTrigger.create({
        trigger: ".pin-spacer", // section.technology가 화면에 보일 때
        start: "top top", // section.technology의 top이 화면 상단에 닿을 때
        end: "bottom bottom", // section.technology의 bottom이 화면 하단에 닿을 때까지
        pin: true, // 해당 섹션을 고정
        pinSpacing: true, // 고정된 후에도 공간을 유지
        scrub: 1, // 스크롤에 따라 부드럽게 이동
    });

    $("section.technology .tech_item").each(function (i, e) {
        // 핀 고정 및 회전 애니메이션
        ScrollTrigger.create({
            trigger: e,
            start: `top +=${pinStart + i * gap + 30}`,
            endTrigger: "section.technology .tech_item.last",
            end: "top +=80",
            pin: true,
            pinSpacing: true, // 각 item에 대해서도 고정된 후 공간을 유지하도록 설정
        });

        // 회전 애니메이션
        gsap.to($(e).find(".gsap_container"), {
            rotateX: -3,
            ease: "none",
            scrollTrigger: {
                trigger: e,
                start: `top +=${pinStart + i * gap + 40}`,
                end: "top -=30%",
                scrub: 1,
            },
        });

        // 스케일 및 밝기 감소 애니메이션
        gsap.to($(e).find(".gsap_container"), {
            scale: 0.2,
            filter: "brightness(0)",
            top: -200,
            ease: "none",
            scrollTrigger: {
                trigger: e,
                start: `top +=${pinStart + i * gap + 40}`,
                end: "top -=700%",
                scrub: 1,
            },
        });
    });


    // 최상단 버튼 구현
    $('.goto_top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 'smooth'); // 부드럽게 맨 위로 이동
    });
    const quickWrap = $('.quick_wrap'); // 대상 요소
    const showPosition = 300; // 표시할 스크롤 높이 (px)
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > showPosition) {
            quickWrap.addClass('visible'); // 높이를 넘으면 보이기
        } else {
            quickWrap.removeClass('visible'); // 높이를 넘지 않으면 숨기기
        }


    });


    // ScrollTrigger 설정
    ScrollTrigger.create({
        trigger: "section.application", // 섹션 자체를 트리거로 설정
        start: "top top", // section.application의 top이 뷰포트 상단에 닿으면 시작
        end: () => `+=${document.querySelector("ul.application_list").scrollHeight - 800}`, // ul.application_list의 높이만큼 스크롤
        pin: "section.application .txt", // .txt를 고정
        pinSpacing: true, // 고정된 후에도 섹션 공간 유지
        scrub: 1, // 스크롤에 따라 부드럽게 이동
    });


    // -- news 게시글 swiper slide
    // .news_swiper 초기화 (기존 코드)
    const swiper2 = new Swiper('.news_swiper', {
        slidesPerView: 3,
        spaceBetween: 68,
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 1700,
            disableOnInteraction: false,
        }, 
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.news-button.next',
            prevEl: '.news-button.prev',
        },
        breakpoints: {
            1024: {
                spaceBetween: 40
            },
            960: {
                slidesPerView: 2
            },
            568: {
                spaceBetween: 28,
                slidesPerView: 2
            },
            540: {
                slidesPerView: 1
            },
            0: {
                slidesPerView: 1
            }
        }
    });

    // .mobile_technology 슬라이드 초기화
    const swiper3 = new Swiper('.mobile_technology', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.app-button.next',
            prevEl: '.app-button.prev',
        }
    });

    // .mobile_application 슬라이드 초기화
    const swiper4 = new Swiper('.mobile_application', {
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: '.app-button.next',
            prevEl: '.app-button.prev',
        }
    });





});


