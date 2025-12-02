$(document).ready(function () {
    let scrollCount = 0;
    const maxScroll = 6; // 최대 스크롤 횟수
    const $visualImg = $('.visual_img');

    $(window).on('wheel', function (e) {
        // 화면 너비가 640px 이하라면 스크롤 애니메이션 차단
        if (window.innerWidth <= 640) {
            return; // 애니메이션 실행 중단
        }

        // 모달이 활성화되어 있으면 스크롤 애니메이션 차단
        if ($(".modal_popup.on").length > 0) {
            e.preventDefault(); // 스크롤 이벤트 차단
            return; // 애니메이션 실행 중단
        }

        // 스크롤 방향 확인 (위: deltaY < 0, 아래: deltaY > 0)
        if (e.originalEvent.deltaY > 0) {
            if (scrollCount < maxScroll) {
                scrollCount++;
            }
        } else {
            if (scrollCount > 0) {
                scrollCount--;
            }
        }

        // 확대/축소 계산
        const scaleValue = 1 + (scrollCount / maxScroll) * 0.3; // 최대 1.5배 확대
        const translateValue = scrollCount * 10; // Y축으로 최대 80px 이동
        const brightnessValue = 0.75 - (scrollCount / maxScroll) * 0.4; // 최소 밝기 0.6

        // 스타일 업데이트
        $visualImg.css({
            'transform': `translate3d(0, ${translateValue}px, 0) scale(${scaleValue})`,
            'filter': `brightness(${brightnessValue})`
        });
    });

    // -- 지도 생성
    if (typeof kakao !== 'undefined') {
        // 지도 생성 함수
        function createMap(containerId, centerLat, centerLng, level, markerImg, markerOffsetX, markerOffsetY) {
            const mapContainer = document.getElementById(containerId);
            const mapOption = {
                center: new kakao.maps.LatLng(centerLat, centerLng),
                level: level
            };
            const map = new kakao.maps.Map(mapContainer, mapOption);

            const markerImage = new kakao.maps.MarkerImage(
                markerImg,
                new kakao.maps.Size(215, 102),
                { offset: new kakao.maps.Point(markerOffsetX, markerOffsetY) }
            );

            new kakao.maps.Marker({
                position: new kakao.maps.LatLng(centerLat - 0.0004, centerLng),
                image: markerImage,
                map: map
            });
        }

        // 지도 설정
        createMap('mapHead', 37.5077809450356, 127.056821251348, 3, 
                  'http://test.s1.unipware.com/GST/images/map_pin-1.png', 107, 102);

        createMap('mapBranch', 35.1518000679446, 126.914752917327, 4, 
                  'http://test.s1.unipware.com/GST/images/map_pin-2.png', 107, 75);
    }

    // -- sub_history - 연도 활성화
    $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        $(".history .right p").each(function () {
            const elementTop = $(this).offset().top;
            const elementHeight = $(this).outerHeight();
            const threshold = 210;

            if (scrollTop + windowHeight > elementTop + threshold && scrollTop < elementTop + elementHeight) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    });

    // -- sub_history - 프로그레스 바
    $(document).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const scrollHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        $(".progressbar").css("width", scrollPercent + "%");

        // Milestone 업데이트
        $(".history_tab li").each(function () {
            const targetProgress = parseInt($(this).data("progress"), 10);
            if (scrollPercent >= targetProgress) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    });
});
