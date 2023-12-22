$(function () {
    

});


$(window).on('load', function() {
    var slider = $(".slider-history__items");

  if (!slider.hasClass('slick-initialized')) {
    slider.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: $('.slider-history__arrow--left'),
      nextArrow: $('.slider-history__arrow--right'),
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

