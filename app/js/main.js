$(function () {
    

});


$(window).on('load', function() {
    var slider = $(".slider__items");

    if (!slider.hasClass('slick-initialized')) {
        slider.slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><img src="<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'13\' height=\'25\' viewBox=\'0 0 13 25\' fill=\'none\'><path d=\'M12.7365 3.12253L4.8192 12.4902L12.7365 22.066L10.3269 24.9803L2.42255e-07 12.4902L10.3269 -1.52439e-05L12.7365 3.12253Z\' fill=\'#8BA8BC\'/></svg>" alt="left-arrow.svg"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="" alt="right-arrow.svg"></button>',
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
            ]
        });
    }
});

