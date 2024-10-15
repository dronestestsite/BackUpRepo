jQuery(document).ready(function ($) {
    //Fixed header
    let header_top = $('.header-center').offset().top;
    let header_height = $('.header-center').innerHeight();

    function fixedHeader() {
        if ($(this).scrollTop() > header_top) {
            $('header.site-header').addClass('active');
            $('main.site-main').css('margin-top', header_height);
            $('body').addClass('fixed-header');
        } else {
            $('header.site-header').removeClass('active');
            $('main.site-main').css('margin-top', 'inherit');
            $('body').removeClass('fixed-header');
        }
    }
    $(window).scroll(function () {
        fixedHeader();
    });
    fixedHeader();

    //Calculate margin
    function mainMargin() {
        let header = $('.site-header').innerHeight();
        $('main.site-main').css('margin-top', header);
    }
    //mainMargin();

    if (window.matchMedia('(max-width: 1230px)').matches) {
        //mobile_container = $('.mobile_wrap');
        //mobile_container.append();

        // интерактивное меню(три полоски)
        $('.toggle_mnu').click(function () {
            $(this).toggleClass('active');
            $('.sandwich').toggleClass('active');
            $('html').toggleClass('active');
        });

        // всплывающее меню на весь экран(с анимацией)
        $('.toggle_mnu').click(function () {
            if ($('.top_mnu').is(':visible')) {
                $('.top_mnu').fadeOut(600);
            } else {
                $('.top_mnu').fadeIn(600);
            }
        });

        //Cубменю
        $('ul#primary-menu li.menu-item-has-children > a')
            .wrap('<div class="toggle-wrap"></div>')
            .after('<span class="menu-toggle transition"></span>');
        $('.menu-toggle').click(function () {
            $(this).closest('li').toggleClass('opened');
            $(this).closest('li').find('ul.sub-menu').slideToggle(300);
        });

        //Mobile search toggle
        $('.mobile-search').click(function () {
            $('.asl_w_container').slideToggle(150);
        });

        //Mobile filter
        $('.sidebar-wrap').wrap('<div class="mobile-sidebar-filter"></div>');
        $('.mobile-sidebar-filter').prepend('<div class="side_menu_opa"></div>');
        $('.sidebar-wrap').append(
            '<span class="side_menu_close"><i class="fa fa-times"></i></span>',
        );

        //Отступ сверху
        //let header_height = $('header.site-header').innerHeight();
        //$('.sidebar-wrap').css('top', header_height + 'px');

        $('.mobile-filter-button').click(function () {
            if ($(this).hasClass('opened')) {
                $('.mobile-sidebar-filter').removeClass('is-active');
                $('body').removeClass('menu-active');
            } else {
                $('.mobile-sidebar-filter').addClass('is-active');
                $('body').addClass('menu-active');
            }
            $(this).toggleClass('opened');
        });

        //Закрыть крестик
        $('.side_menu_close').click(function () {
            $('.mobile-sidebar-filter').removeClass('is-active');
            $('body').removeClass('menu-active');
            $('.mobile-filter-button').toggleClass('opened');
        });

        //Закрыть по клику в пустое место( в данном случае opacity блок )
        $('.side_menu_opa').mouseup(function (e) {
            // событие клика по веб-документу
            var div = $('.side_menu'); // тут указываем ID элемента
            if (
                !div.is(e.target) && // если клик был не по нашему блоку
                div.has(e.target).length === 0
            ) {
                // и не по его дочерним элементам
                $('.mobile-sidebar-filter').removeClass('is-active');
                $('body').removeClass('menu-active');
                $('.mobile-filter-button').toggleClass('opened');
            }
        });
    }

    //Открытие поиска по клику на иконку
    $('.toggle-search, .close-search').click(function () {
        $('.asl_w_container').slideToggle(300);
        $('html').toggleClass('active');
    });

    //Кнопка наверх
    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    });

    //Табы
    $('.tab-item').click(function () {
        if (!$(this).hasClass('opened')) {
            $(this).addClass('opened').find('.tab-answer').slideToggle(300);
        } else {
            $(this).removeClass('opened').find('.tab-answer').hide(300);
        }
    });
    //Табы FAQ
    $('body').on('click', '.faq-item', function () {
        if (!$(this).hasClass('opened')) {
            $('.faq-answer').hide(300);
            $('.faq-item').removeClass('opened');

            $(this).addClass('opened').find('.faq-answer').slideToggle(300);
        } else {
            $(this).removeClass('opened').find('.faq-answer').hide(300);
        }
    });
    //Табы сопуцтвующие товары
    $('.tab').click(function () {
        $('.tab').removeClass('opened').eq($(this).index()).addClass('opened');
        $('.tab_item').hide().eq($(this).index()).fadeIn();
    });

    //Наверх по клику на кнопку или лого
    $('.top, .top_mnu .custom-logo').click(function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
    });

    //Слайдер sale на главной
    $('.owl-carousel.main-cat-wrap').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        nav: true,
        dots: false,
        items: 2,
        autoHeight: true,
        navContainer: '#owl-nav-cat',
        navText: ["<i class='far fa-angle-left'></i>", "<i class='far fa-angle-right'></i>"],
        responsive: {
            480: {
                items: 2,
                margin: 10,
                autoHeight: false,
            },
            992: {
                items: 4,
                margin: 10,
            },
        },
    });
    //Слайдер sale на главной
    $('.owl-carousel.home-top-products').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        nav: true,
        dots: false,
        items: 2,
        autoHeight: true,
        navContainer: '#owl-nav-top',
        navText: ["<i class='far fa-angle-left'></i>", "<i class='far fa-angle-right'></i>"],
        responsive: {
            480: {
                items: 2,
                margin: 10,
                autoHeight: false,
            },
            992: {
                items: 4,
                margin: 10,
            },
        },
    });

    //Попап галереи
    $('.gallery').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: '',
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            closeBtnInside: true,
            closeOnBgClick: true,
            gallery: { enabled: true },
        });
    });

    //Бегущий текст
    //if ($('body.home').length) {
    //Marquee3k.init();
    //}

    //Cart sidebar
    //Отступ сверху
    /* setTimeout(function(){
		let header_height = $('header.site-header').innerHeight();
		$('.sidebar-filter').css('top', header_height);
	}, 100); */

    //Nicescroll
    $('body').on('click', 'a.cart-contents.menu-item', function (e) {
        e.preventDefault();

        if ($(this).hasClass('opened')) {
            $('.mobile-sidebar-filter').removeClass('is-active');
            $('html').removeClass('menu-active');
        } else {
            $('.mobile-sidebar-filter').addClass('is-active');
            $('html').addClass('menu-active');
            miniCartScrollUpdate();
        }
        $(this).toggleClass('opened');
    });

    //Закрыть крестик
    $('body').on('click', '.side_menu_close', function () {
        $('.mobile-sidebar-filter').removeClass('is-active');
        $('html').removeClass('menu-active');
        $('.open-filer, a.cart-contents.menu-item').toggleClass('opened');
    });

    //Закрыть по клику в пустое место( в данном случае opacity блок )
    $('body').on('mouseup', '.side_menu_opa', function (e) {
        // событие клика по веб-документу
        var div = $('.side_menu'); // тут указываем ID элемента
        if (
            !div.is(e.target) && // если клик был не по нашему блоку
            div.has(e.target).length === 0
        ) {
            // и не по его дочерним элементам
            $('.mobile-sidebar-filter').removeClass('is-active');
            $('html').removeClass('menu-active');
            $('a.cart-contents.menu-item').toggleClass('opened');
        }
    });

    function miniCartScrollUpdate() {
        $('ul.woocommerce-mini-cart').niceScroll({
            scrollspeed: 40,
            zindex: 'auto',
            cursorcolor: '#ff3131',
            cursorwidth: '5px',
            cursorminheight: 100,
            cursoropacitymin: 0.1,
            cursorborderradius: '5px',
            cursorborder: 'none',
            autohidemode: false,
            smoothscroll: true,
            background: '#e7e7e7',
            railoffset: { top: 0, left: 10 },
        });
    }

    // Перезапуск скролла после обновления корзины
    $(document.body).on('added_to_cart removed_from_cart', function () {
        console.log('Refreshed!');
        setTimeout(function () {
            miniCartScrollUpdate();
        }, 10);
    });

    //Select2
    /* if($('select').length){
		$('select').each(function(){
			$(this).select2();
		});
	}; */

    //Валидация формы
    $.validate({
        form: 'form.default_form',
        onElementValidate: function (valid, $el, $form, errorMess) {
            //console.log('Input ' +$el.attr('name')+ ' is ' + ( valid ? 'VALID':'NOT VALID') );
        },
    });

    $('form.default_form').submit(function (e) {
        e.preventDefault();
        errors = [];
        //Данные в инпуты
        let currentForm = $(this);

        if (!$(this).isValid()) {
            //displayErrors( errors );
        } else {
            $.ajax({
                type: 'POST',
                url: '/submit.php', //url
                data: $(this).serialize(),
            }).done(function (data) {
                currentForm.find('.result').html(data);
                currentForm.trigger('reset');
            });
            return false;
        }
    });

    //Маска телефона
    $(document.body).on('updated_checkout updated_shipping_method', function (event, xhr, data) {
        //Masked input
        maskedInput();
    });

    if ($("input[type='tel']").length) {
        maskedInput();
    }

    function maskedInput() {
        $.mask.definitions['~'] = '[12345679]';
        $("input[type='tel']").mask('+38 099 999 9999');

        //Курсор всегда в начале
        $("input[type='tel']")
            .click(function () {
                $(this).setCursorPosition(5);
            })
            .mask('+38 099 999 9999');

        $.fn.setCursorPosition = function (pos) {
            if ($(this).get(0).setSelectionRange) {
                $(this).get(0).setSelectionRange(pos, pos);
            } else if ($(this).get(0).createTextRange) {
                var range = $(this).get(0).createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    }
});
