/*!
 * Moonkake v3.0.8
 *
 * http://moonkake.ru
 */

/* VAR
 -------------------------------------------------- */

var $d = $(document);
var $w = $(window);
var $b = $('body');
var curDays = 7;

if (!window.saveUserWidgets) {
    saveUserWidgets = function () {
    };
}
;

/* Number format */

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

/* FANCYBOX
 -------------------------------------------------- */

$('.js-p a[rel="gallery"], a[rel="gallery"].js-p, .js-p a, a.js-p').fancybox({
    padding: 0,
    wrapCSS: '-fancybox-photo',
    type: 'image',
    maxWidth: 780,
    maxHeight: 450,
    closeBtn: true,
    helpers: {
        overlay: {
            locked: false
        }
    },
    beforeLoad: function () {
        if (!!$(this.element).data("show-download"))
            this.title = '<a href="' + this.href + '">Загрузить</a>';
    }
});

$('.js-popup').fancybox({
    padding: 0,
    wrapCSS: '-fancybox-custom',
    helpers: {
        overlay: {
            locked: false
        }
    }
});

/* SELECT
 -------------------------------------------------- */

$('.select-white select').ikSelect({
    autoWidth: false,
    ddFullWidth: false,
    customClass: 'select-custom-white',
});

$('.select-blue select').ikSelect({
    autoWidth: false,
    ddFullWidth: false,
    customClass: 'select-custom-blue',
});

/* TOOLTIP
 -------------------------------------------------- */

$('.js-tooltip').tooltip({
    position: {
        my: 'center bottom-10',
        at: 'center top'
    },
    show: false,
    hide: false
});

/* FLY
 -------------------------------------------------- */

$('.fly__button__show').on('click touch', function (e) {
    var _ = $(this);
    var $root = $('.fly-container');

    if ($root.hasClass('-active')) {
        $root.removeClass('-active');
        _.removeClass('opened');
		_.html("Показать все варианты");
    } else {
        $root.addClass('-active');
        _.addClass('opened');
		_.html("&larr;&nbsp; Скрыть варианты");
    }

    return false;
});

$('.fly__close').on('click touch', function (e) {
    var _ = $(this);
    var $root = _.closest('.fly');

    $root.removeClass('-active');
    $root.find('.fly__button__show').text('Показать все варианты');
});

$('.fly__radio').on('change', 'input', function () {
    var _ = $(this);
    var $root = _.closest('.fly');
    var $group = _.closest('.fly__group');

    if (_.prop('checked')) {
        $group.addClass('-active').siblings().removeClass('-active');
        $root.removeClass('-active');
        $('.fly__button__show').removeClass('opened').html("Показать все варианты");
    }
});

/* HOTEL MAP
 -------------------------------------------------- */

$('.hotel-info__map-holder-toggle').on('click touch', function () {
    var _ = $(this);
    var $target = _.prev('.hotel-info__map-holder');

    if ($target.hasClass('-active')) {
        $target.removeClass('-active');
        _.text('Показать на карте');
    } else {
        $target.addClass('-active');
        _.text('Скрыть карту');
    }

    return false;
});

/* FILE
 -------------------------------------------------- */

$('.file').on('change', 'input', function () {
    var _ = $(this);
    var val = _.val();
    var value = (val === '') ? 'Прикрепить файл' : val.split(/(\\|\/)/g).pop();

    _.closest('.file').find('.file-label span').text(value);
});

/* TABS
 -------------------------------------------------- */
$(window).load(function (e) {
    $('.tabs .tab__title').on('click', '.tab__item', function () {

        var $root = $(this).closest('.tabs');
        var index = $(this).index();

        $root.find('.tab__title .tab__item').eq(index).addClass('-active').siblings('div').removeClass('-active');
        $root.find('.tab__content .tab__item').eq(index).addClass('-active').siblings('div').removeClass('-active');
    });
});


/* REGION
 -------------------------------------------------- */
$('.js-region').fancybox({
    padding: 0,
    wrapCSS: '-fancybox-region',
    minHeight: 0,
    helpers: {
        overlay: {
            locked: false
        }
    },
    afterClose: function () {
        //console.log('Region afterClose callback');
    }
});

/* MENU
 -------------------------------------------------- */
$('.navigation-main').on('click mouseenter mouseleave', '> .list__item > .list__link', function (e) {
    var _ = $(this);

    if ($w.width() <= 960) {

        if (e.type == 'click') {
            if (_.parent().hasClass('-has-sub')) {
                _.parent().siblings('.list__item').removeClass('-has-sub-opened');
                _.parent().toggleClass('-has-sub-opened');

                return false;
            }
            ;
            return true;
        }
        ;

    } else {

        if (e.type == 'mouseenter') {
            _.parent().siblings('.list__item').addClass('-not-active');
        }
        ;

        if (e.type == 'mouseleave') {
            _.parent().siblings('.list__item').removeClass('-not-active');
        }
        ;

    }
    ;
});

$w.on('resize', function () {
    if ($w.width() > 960) {
        $('.navigation-main').find('.list__item').removeClass('-has-sub-opened');
    }
    ;
});

/* SCROLL TOP
 -------------------------------------------------- */

function scrollPageTo(object, offset, callback) {
    $('html, body').stop().animate({
        scrollTop: $(object).offset().top - ((typeof(offset) == 'number') ? offset : 0)
    }, 500, function () {
        if ($(this)[0].nodeName == 'HTML') {
            if (typeof(callback) == 'function') {
                callback();
            }
            ;
        }
        ;
    });
};

$('.js-scroll').on('click', function () {
    var href = $(this).attr('href');
    var offset = $('.header').outerHeight();

    scrollPageTo(href, offset);

    return false;
});

if ($('.anchor').length) {
    function anchorToggle() {
        var $anchor = $('.anchor');
        var $filter = $('.filter');
        var anchorOffset = $anchor.offset().top;
        if ($filter.offset()) {
		  var filterOffsetTop = $filter.offset().top;
		} else {
		  var filterOffsetTop = 0;	
		}
        var filterOffsetBottom = filterOffsetTop + $filter.outerHeight();

        if (anchorOffset >= filterOffsetTop && anchorOffset <= filterOffsetBottom) {
            $anchor.addClass('-closed');
        } else {
            $anchor.removeClass('-closed');
        }
        ;
    };

    $d.on('ready', anchorToggle);
    $w.on('scroll', anchorToggle);
}
;

/* WIDGET
 -------------------------------------------------- */

//Sort Widgets

$('.widgets').sortable({
    appendTo: $('.widgets'),
    handle: '.widget__drag'
    //opacity: 0.5
});

// Widget touch

$b.on('touchstart touchend', '.widget__drag', function (event) {
    var $widget = $(this).closest('.widget');

    if (event.type == 'touchstart') {
        $widget.addClass('widget-touched');
    }
    ;

    if (event.type == 'touchend') {
        $widget.removeClass('widget-touched');
    }
    ;
});

// Add Widget

var widgetIndex = 0;
var widgetFrom = '';
var widgetEmptyTpl = '<div class="widget-add"><a href="#widget" class="widget-add__link js-widget"><span><i class="icon-add-widget"></i><span>Добавить виджет</span></span></a></div>';

function checkWidgetStatus() {
    var $checkbox = $('.widget-list input');

    $checkbox.each(function () {
        var _ = $(this);
        var id = _.attr('id');

        id = id.replace(/checkbox/g, 'widget');
        id = id.replace(/_\d+/g, '');

        if ($('.widgets').find('#' + id).length) {
            _.prop('checked', true);
        } else {
            _.prop('checked', false);
        }
        ;
    });
};

function toggleWidgetStatus() {
    var $checkbox = $('.widget-list input');

    $checkbox.each(function () {
        var _ = $(this);

        if ($checkbox.filter(':checked').length >= 4) {
            if (_.prop('checked') === false) {
                _.prop('disabled', true);
            }
            ;
        } else {
            if (_.prop('disabled') === true) {
                _.prop('disabled', false);
            }
            ;
        }
        ;
    });
};

function checkWidgetListStatus() {
    var $item = $('.widget-add-list__list .list__link');

    $item.each(function () {
        var _ = $(this);
        var id = _.attr('href');

        if ($('.widgets').find(id).length) {
            _.parent().addClass('-disabled');
        } else {
            _.parent().removeClass('-disabled');
        }
        ;
    });
};

function berryCheck() {
    $('.berry-input').each(function () {
        var $self = $(this);

        if ($self.find('input').prop('checked')) {
            $self.addClass('-berry-checked');
        } else {
            $self.removeClass('-berry-checked');
        }
        ;

        if ($self.find('input').prop('disabled')) {
            $self.removeClass('-berry-status-enabled').addClass('-berry-status-disabled');
        } else {
            $self.removeClass('-berry-status-disabled').addClass('-berry-status-enabled');
        }
        ;
    });
};

checkWidgetStatus();
checkWidgetListStatus();
toggleWidgetStatus();

// Add Widget - Open PopUp

$b.on('click', '.js-widget', function (event) {
    var _ = $(this);
    var $target = $(_.attr('href'));
    var isFromAdd = $(event.currentTarget).hasClass('widget-add__link');

    widgetFrom = (isFromAdd) ? 'add' : 'opt';
    widgetIndex = (isFromAdd) ? _.closest('.widgets__item').index() : $('.widgets').find('.widget-add').parent().index();

    $.fancybox.open($target, {
        padding: 0,
        wrapCSS: ' -fancybox-region', //-fancybox-custom
        minHeight: 0,
        helpers: {
            overlay: {
                locked: false
            }
        },
        beforeLoad: function () {
            checkWidgetStatus();
            checkWidgetListStatus();
        },
        afterClose: function () {

        }
    });

    return false;
});

// Edit Widgets - Popup

$('.widget-list input').on('change', function () {
    var id = $(this).attr('id');
    var this_ = $(this);
    id = id.replace(/checkbox/g, 'widget');
    var $target = $('#' + id);

    if (this_.prop('checked') === true) {
        var i = 0;

        if (widgetFrom == 'opt' || (widgetFrom == 'add' && i >= 1)) {
            widgetIndex = $('.widgets').find('.widget-add').closest('.widgets__item').index();
        }
        ;

        if (widgetFrom == 'add') {
            //if ( i >= 1) widgetIndex = $('.widgets').find('.widget-add').parent().index();
            i++;
            widgetFrom = 'opt';
        }
        ;

        var $root = $('.widgets').find('.widgets__item').eq(widgetIndex).find('.widget-card');

        $root.find('.widget-add').fadeOut(100, function () {
            $(this).remove();
            $root.append($target).hide().fadeIn(100, saveUserWidgets);
            checkWidgetListStatus();
            $('.carousel-widget').slick('setPosition');
        });

        saveUserWidgets();

    } else {

        var $root = $target.closest('.widget-card');

        $target.fadeOut(100, function () {
            $(this).appendTo('.widget-store').show();
            $root.append(widgetEmptyTpl).hide().fadeIn(100, saveUserWidgets);
            checkWidgetListStatus();
        });

    }
    ;

    toggleWidgetStatus();

});

// Edit Widgets - List

$b.on('click', '.widget-add-list__list .list__link', function () {
    var _ = $(this);
    var $root = _.closest('.widget-card');
    var id = _.attr('href');
    var $target = $(id);
    var oldId = $root.find('.widget').attr('id');
    var $oldTarget = $('#' + oldId);

    if (!_.parent('li').hasClass('-disabled')) {

        $oldTarget.appendTo('.widget-store').show();
        $root.append($target).show();
        $root.removeClass('widget-rotate');
        $root.find('.widget-add-list').remove();

        checkWidgetStatus();
        checkWidgetListStatus();
        toggleWidgetStatus();
        berryCheck();
        $('.carousel-widget').slick('setPosition');

        saveUserWidgets();
    }
    ;

    return false;
});

// Remove Widget

$b.on('click', '.widget__close', function () {
    var _ = $(this);
    var $root = _.closest('.widget-card');
    var $widget = _.closest('.widget');
    var id = $widget.attr('id');
    id = id.replace(/widget/g, 'checkbox');

    $widget.fadeOut(100, function () {
        $(this).appendTo('.widget-store').show();
        $root.append(widgetEmptyTpl).hide().fadeIn(100, saveUserWidgets);

        $('#' + id).prop('checked', false);

        checkWidgetStatus();
        checkWidgetListStatus();
        toggleWidgetStatus();
        berryCheck();
    });

    if ($w.outerWidth() <= 760) _.closest('.widgets__item').addClass('widget-closed');

    return false;
});

// Open/Close Widget

$b.on('click', '.widget__title', function () {
    var $item = $(this).closest('.widgets__item');

    if ($item.hasClass('widget-closed')) {
        $item.removeClass('widget-closed');
        resetCanvas();
        $('.carousel-widget').slick('setPosition');
    } else {
        $item.addClass('widget-closed');
    }
    ;
});

$d.on('ready', function () {
    if ($w.outerWidth() <= 760) {
        $('.widgets__item').addClass('widget-closed');
    } else {
        $('.widgets__item').removeClass('widget-closed');
    }
    ;
});

// Rotate Widget

$b.on('click', '.widget__opts', function () {
    var _ = $(this);
    var $root = _.closest('.widget-card');
    var $widgetList = $('.widget-store').find('.widget-add-list').clone(true);

    $root.prepend($widgetList).addClass('widget-rotate');
});

$b.on('click', '.widget-add-list__close', function () {
    var _ = $(this);
    var $root = _.closest('.widget-card');

    $root.removeClass('widget-rotate');
    $root.find('.widget-add-list').remove();
});

/* SLICK
 -------------------------------------------------- */

// Main
function updateVideoSize(player) {
    var windowW = $(player).closest('.video-viewport').width();
    var windowH = $(player).closest('.video-viewport').height();
    var windowAspect = windowW / windowH;
    var scale = parseInt($(player).attr('data-width')) / parseInt($(player).attr('data-height'));

    if (windowAspect < scale) {
        // taller
        $(player).width(windowH * scale).height(windowH);
        $(player).css('top', 0).css('left', -(windowH * scale - windowW) / 2).css('height', windowH);
        $(player + '_html5_api').css('width', windowH * scale);
    } else {
        // wider
        $(player).width(windowW).height(windowW / scale);
        $(player).css('top', -(windowW / scale - windowH) / 2).css('left', 0).css('height', windowW / scale);
        $(player + '_html5_api').css('width', '100%');
    }
    ;
};

function prepareMainVideos() {
    $('.carousel').each(function () {
        var $carousel = $(this);

        if ($carousel.find('.video-js').length) {
            $carousel.find('.video-js').each(function () {
                var id = $(this).attr('id');
                var player = videojs(id);

                if ($w.width() > 960) {
                    updateVideoSize('#' + id);

                    if ($(this).closest('.slick-current').length) {
                        player.play();
                        player.volume(0);
                    }
                } else {
                    player.pause();
                    player.currentTime(0);
                }
                ;
            });
        }

    });
};

$w.on('resize', function () {
    setTimeout(prepareMainVideos, 100);
});

var $carouselMain = $('.carousel-main');
var carouselMainTimeoutValue;
var carouselMainTimeout;

$carouselMain.on('init', function (event, slick) {
    carouselMainTimeoutValue = parseInt($(slick.$slides[0]).data('timeout'));

    carouselMainTimeout = setTimeout(function () {
        $(slick.$slider).slick('slickNext');
    }, carouselMainTimeoutValue);

    prepareMainVideos();
});

$carouselMain.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    carouselMainTimeoutValue = parseInt($(slick.$slides[nextSlide]).data('timeout'));
    $(slick.$slider).slick('slickPause');

    clearTimeout(carouselMainTimeout);

    carouselMainTimeout = setTimeout(function () {
        $(slick.$slider).slick('slickNext');
    }, carouselMainTimeoutValue);

    if ($w.width() > 960) {

        if ($(slick.$slides[currentSlide]).find('.video-js').length) {
            var id_current = $(slick.$slides[currentSlide]).find('.video-js').attr('id');
            var player_current = videojs(id_current);
            player_current.pause();
            player_current.currentTime(0);
        }
        ;

        if ($(slick.$slides[nextSlide]).find('.video-js').length) {
            var id_next = $(slick.$slides[nextSlide]).find('.video-js').attr('id');
            var player_next = videojs(id_next);
            player_next.play();
            player_next.volume(0);
        }
        ;

    }
    ;
});

var carouselMainInitialSlide = 0;
if ($w.width() <= 960) {
    carouselMainInitialSlide = +$('input[name=top-slider-initial-slide]').val() || 0;
}

$carouselMain.slick({
    accessibility: false,
    fade: true,
    dots: true,
    initialSlide: carouselMainInitialSlide,
    //autoplay: true,
    //autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    responsive: [
        {
            breakpoint: 1120,
            settings: {
                arrows: false
            }
        }
    ]
});

// Promo

var $carouselPromo = $('.carousel-promo');
var carouselPromoTimeoutValue;
var carouselPromoTimeout;

$carouselPromo.on('init', function (event, slick) {
    carouselPromoTimeoutValue = parseInt($(slick.$slides[0]).data('timeout'));

    if(!carouselPromoTimeoutValue){
        carouselPromoTimeoutValue = 10000;
    }

    carouselPromoTimeout = setTimeout(function () {
        console.log('slickNext 1');
        $(slick.$slider).slick('slickNext');
    }, carouselPromoTimeoutValue);

    prepareMainVideos();
});

$carouselPromo.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    carouselPromoTimeoutValue = parseInt($(slick.$slides[nextSlide]).data('timeout'));
    $(slick.$slider).slick('slickPause');

    clearTimeout(carouselPromoTimeout);

    carouselPromoTimeout = setTimeout(function () {
        console.log('slickNext 2');
        $(slick.$slider).slick('slickNext');
    }, carouselPromoTimeoutValue);

    if ($w.width() > 960) {

        if ($(slick.$slides[currentSlide]).find('.video-js').length) {
            var id_current = $(slick.$slides[currentSlide]).find('.video-js').attr('id');
            var player_current = videojs(id_current);
            player_current.pause();
            player_current.currentTime(0);
        }
        ;

        if ($(slick.$slides[nextSlide]).find('.video-js').length) {
            var id_next = $(slick.$slides[nextSlide]).find('.video-js').attr('id');
            var player_next = videojs(id_next);
            player_next.play();
            player_next.volume(0);
        }
        ;

    }
    ;
});

$carouselPromo.slick({
    accessibility: false,
    fade: true,
    dots: true,
    //autoplay: true,
    //autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    responsive: [
        {
            breakpoint: 1120,
            settings: {
                arrows: false
            }
        }
    ]
});


// Events

$('.carousel-events').slick({
    accessibility: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    responsive: [
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

// Inline

$('.carousel-inline').slick({
    accessibility: false,
    dots: true
});

$('.carousel-inline').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    if ($(slick.$slides[currentSlide]).find('.video-js').length) {
        var id = $(slick.$slides[currentSlide]).find('.video-js').attr('id');
        var player = videojs(id);

        player.pause();
        player.currentTime(0);
    }
    ;
});

// Rows

$('.carousel-2-rows').slick({
    accessibility: false,
    dots: true,
    arrows: false,
    rows: 2,
    slidesPerRow: 2,
    responsive: [
        {
            breakpoint: 760,
            settings: {
                slidesPerRow: 1
            }
        }
    ]
});

$('.carousel-1-rows').slick({
    accessibility: false,
    dots: true,
    arrows: false,
    slidesToShow: 2,
    responsive: [
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

// Gallery

$('.carousel-in').each(function () {
    var $root = $(this);
    var $thumbs = $root.next('.carousel-in-thumbs');

    $root.slick({
        accessibility: false,
        dots: false,
        arrows: true,
        fade: true
    });

    $thumbs.on('click', '.list__item', function () {
        $root.slick('slickGoTo', $(this).index());
    });

    $root.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $thumbs.find('li').eq(nextSlide).addClass('-active').siblings('li').removeClass('-active');
    });
});

// Widget

$('.carousel-widget').slick({
    accessibility: false,
    fade: true
});


/* CHECKBOX & RADIO
 -------------------------------------------------- */

$('.berry').berry();

/* FILTER
 -------------------------------------------------- */

function filterPlaceholder() {
    $('.filter-placeholder').css({
        height: $('.filter-bottom').outerHeight() + 'px'
    });
};

function filterToggle() {

    var offset = 100;

    if ($('.information').length) {
        offset = $('.information').outerHeight() - 150;
    }
    ;

    if ($b.height() < $w.height()) {
        $b.addClass('filter-bottom-opened');
    } else {
        if ($d.scrollTop() >= offset) {
            $b.addClass('filter-bottom-opened');
        } else {
            $b.removeClass('filter-bottom-opened');
        }
        ;
    }
    ;
};

$d.on('ready', function () {
    filterPlaceholder();
    filterToggle();
});

$w.on('resize load', function () {
    filterPlaceholder();
    filterToggle();
});

$w.on('scroll', function () {
    filterToggle();
});

/* INPUT COUNT
 -------------------------------------------------- */

$('.input-count:not(.input-day), .input__popup, .input-only-numbers').on('keydown', 'input', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


$('.input-count:not(.input-day, .input-visa)').on('click', '.input__min, .input__max', function (event) {
    var _ = $(this);
    var $input = _.closest('.input-count').find('.input__field input');
    var value = parseInt($input.val());
    var min = parseInt($input.attr('min'));
    var max = parseInt($input.attr('max'));

    if (event.currentTarget.className == 'input__min') {
        value -= 1;
        if (value <= min) value = min;
    }

    if (event.currentTarget.className == 'input__max') {
        value += 1;
        if (value >= max) value = max;
    }

    $input.val(value);

    inputDropPeopleCount();

    return false;
});

$('.input-count:not(.input-day)').on('focusout', '.input__field input', function () {
    var _ = $(this);
    var min = parseInt(_.attr('min'));
    var max = parseInt(_.attr('max'));

    if (_.val() == '') _.val(min);
    if (_.val() > max) _.val(max);

    inputDropPeopleCount();

    return false;
});

$('.input-count:not(.input-day)').on('keyup', '.input__field input', function () {
    var _ = $(this);
    var max = parseInt(_.attr('max'));

    if (_.val() > max) _.val(max);

    return false;
});

// Kids

$('.input-kids').on('click', '.input__min, .input__max', function (event) {
    var _ = $(this);
    var $input = _.closest('.input-count').find('.input__field input');
    var value = parseInt($input.val());
    var $popup = _.closest('.input-count').find('.input__popup');
    var min = parseInt($input.attr('min'));
    var max = parseInt($input.attr('max'));

    if (value >= 1) $popup.fadeIn(100);
    if (value < 1) $popup.fadeOut(100);

    if (event.currentTarget.className == 'input__min') {
        $popup.find('.input__popup__fields').find('.input__popup__item').eq(value).remove();
    }
    ;

    if (event.currentTarget.className == 'input__max') {
        if ($popup.find('.input__popup__fields').find('.input__popup__item').length < max) {
            $popup.find('.input__popup__fields').append('<div class="input__popup__item"><div class="input__popup__item__label">' + value + '</div><div class="input__popup__item__field"><input type="text" name="ChildAges[]" id="" value="0" min="0" max="16"></div></div>');
        }
        ;
    }
    ;

    inputDropPeopleCount();

    return false;
});

$('.input__popup__ok__link').on('click', function () {
    $(this).closest('.input__popup').fadeOut(100);
    return false;
});

$('.input__popup').on('focusout', 'input', function () {
    var _ = $(this);
    var min = parseInt(_.attr('min'));
    var max = parseInt(_.attr('max'));

    if (_.val() == '') _.val(min);
    if (_.val() > max) _.val(max);

    return false;
});

$('.input-kids').on('keyup', '.input__field input', function (e) {
    var _ = $(this);
    var value = _.val();
    var $popup = _.closest('.input-count').find('.input__popup');
    var min = parseInt(_.attr('min'));
    var max = parseInt(_.attr('max'));

    if (value >= 1) $popup.fadeIn(100);
    if (value < 1) $popup.fadeOut(100);

    $popup.find('.input__popup__fields').html('');

    for (var i = 0; i < value; i++) {
        if ($popup.find('.input__popup__fields').find('.input__popup__item').length < max) {
            $popup.find('.input__popup__fields').append('<div class="input__popup__item"><div class="input__popup__item__label">' + (i + 1) + '</div><div class="input__popup__item__field"><input type="text" name="ChildAges[]" id="" value="0" min="0" max="16"></div></div>');
        }
        ;
    }
    ;
});

/* INPUT DROP
 -------------------------------------------------- */

$('.input__drop').on('click', function (e) {
    e.stopPropagation();

    $(this).closest('.input').find('.input-drop').toggleClass('input-drop-opened');
});

$('.input-drop').on('click', function (e) {
    e.stopPropagation();
});

$b.on('click', function () {
    if ($('.input-drop-opened').length) {
        $('.input-drop').removeClass('input-drop-opened');
    }
    ;
});

// People

function inputDropPeopleCount() {
    if ($('.input-drop-people').length) {
        var count = 0;
        var text = '';

        $('.input-drop-people .input__field input').each(function () {
            count += parseInt($(this).val());
        });

        if (count == 1) text = 'Один турист';
        if (count == 2) text = 'Два туриста';
        if (count == 3) text = 'Три туриста';
        if (count == 4) text = 'Четыре туриста';
        if (count == 5) text = 'Пять туристов';
        if (count == 6) text = 'Шесть туристов';
        if (count == 7) text = 'Семь туристов';

        $('.input__drop-people').val(text);
    }
    ;
};

inputDropPeopleCount();

// Rating

function inputDropRating() {
    var value = $('.input-drop-rating input[name^="droprating"]').map(function () {
        if ($(this).prop('checked')) return $(this).val();
    }).get();

    return value;
};

function inputDropHotel() {
    var value = $('.input-drop-rating input[name^="drophotel"]').map(function () {
        if ($(this).prop('checked')) return $(this).val();
    }).get();

    return value;
};

function inputDropAll(status) {
    $('.input-drop-rating input[name^="droprating"], .input-drop-rating input[name^="drophotel"]').each(function () {
        $(this).prop('checked', status);
    });

    berryToggle();
};

function setInputDropRatingValue() {
    var rating = inputDropRating();
    var hotel = inputDropHotel();
    var textDeliver = (hotel.length) ? ', ' : '';
    var textStar = '';
    var textStarDeliver = '*';

    var text = rating.join(', ') + ' ' + textStarDeliver + textDeliver + hotel.join(', ');

    if (!rating.length && !hotel.length) text = 'Ничего не выбрано';

    $('.input__drop-rating').val(text);
};

setInputDropRatingValue();

$('.input-drop-rating').on('change', 'input:not([name="dropall"])', function () {
    $('input[name="dropall"]').prop('checked', false);
    berryToggle();
    setInputDropRatingValue();
});

$('input[name="dropall"]').on('change', function () {
    if ($(this).prop('checked')) {
        inputDropAll(true);
    } else {
        inputDropAll(false);
    }

    setInputDropRatingValue();
});


/* INPUT DATE
 -------------------------------------------------- */

$('.input-day').on('keydown', '.input__field input', function (e) {
    e.preventDefault();
});

$.datepick.regionalOptions['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dateFormat: 'dd.mm.yyyy',
    firstDay: 1,
    renderer: $.datepick.defaultRenderer,
    prevText: '&#x3c;Пред',
    prevStatus: '',
    prevJumpText: '&#x3c;&#x3c;',
    prevJumpStatus: '',
    nextText: 'След&#x3e;',
    nextStatus: '',
    nextJumpText: '&#x3e;&#x3e;',
    nextJumpStatus: '',
    currentText: 'Сегодня',
    currentStatus: '',
    todayText: 'Сегодня',
    todayStatus: '',
    clearText: 'Очистить',
    clearStatus: '',
    closeText: 'Закрыть',
    closeStatus: '',
    yearStatus: '',
    monthStatus: '',
    weekText: 'Не',
    weekStatus: '',
    dayStatus: 'D, M d',
    defaultStatus: '',
    isRTL: false
};
$.datepick.setDefaults($.datepick.regionalOptions['ru']);

var datepickerTemplate = $.extend({}, $.datepick.defaultRenderer, {
    picker: '<div class="datepick">' +
    '{months}' +
    '<div class="datepick-clear-fix"></div></div>',
    monthRow: '<div class="datepick-month-row">{months}</div>',
    month: '<div class="datepick-month"><div class="datepick-month-header">{link:prevJump}{link:prev}{link:nextJump}{link:next}{monthHeader:<span>MM</span><span>yyyy</span>}</div>' +
    '<table><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
});

function datepickerMonthToShow() {
    if ($w.width() <= 960) {
        return 1;
    } else {
        return 2;
    }
    ;
};

$('.js-date').datepick({
    showAnim: 'fade',
    dateFormat: "dd.mm.yyyy",
    changeMonth: false,
    renderer: datepickerTemplate
});

$('.js-datepicker-root').each(function () {
    var $root = $(this);
    var $from = $root.find('.js-datepicker-from');
    var $count = $root.find('.input-day');
    var countDays = $count.find('input').val();
    var fromStartDate;
    var toStartDate;

    window.datePickerFrom = $from;

    $first_activate_from = false;
    $toggle_picker_from = $toggle_picker_to = true;

    var today = new Date();
    today.setDate(today.getDate() + 1);

    var t_dd = today.getDate();
    var t_mm = today.getMonth() + 1;
    var t_yyyy = today.getFullYear();

    if (t_dd < 10) t_dd = '0' + t_dd;
    if (t_mm < 10) t_mm = '0' + t_mm;

    var minDateDatePickFromVal = t_dd + '.' + t_mm + '.' + t_yyyy;


    if ($from.val() != '') {
        fromStartDate = $from.val();
    } else {
        fromStartDate = new Date();
        var dd = fromStartDate.getDate();
        var mm = fromStartDate.getMonth() + 1;
        var yyyy = fromStartDate.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        fromStartDate = dd + '.' + mm + '.' + yyyy;
    }


    $from.datepick({
        showAnim: 'fade',
        //showOnFocus: false,
        dateFormat: "dd.mm.yyyy",
        alignment: ($w.width() <= 960) ? 'bottomLeft' : 'bottom',
        changeMonth: false,
        minDate: minDateDatePickFromVal,
        monthsToShow: datepickerMonthToShow(),
        onShow: function () {
            $from.blur();
        },
        onClose: function () {
            $from.blur();
        },
        onDate: function (date) {
            var date1 = new Date($from.datepick('getDate')[0].getTime());
            var duration = parseInt($('input[name=duration]').val());
            var date2 = new Date($from.datepick('getDate')[0]);
            date2.setDate(date2.getDate() + duration );

            if (date >= date1 && date <= date2) {
                return {
                    selectable: true,
                    dateClass: 'highlight',
                    title: ''
                };
            } else {
                return true;
            }

            $from.focus();
        },
        onSelect: function (dates) {

            var countDays = $count.find('input').val();
            var newDate = new Date($from.datepick('getDate')[0]);
            newDate.setDate(newDate.getDate() + parseInt(curDays));

            $from.datepick('option', 'maxDate', dates[0] || null);

            $from.blur();

        },
        renderer: datepickerTemplate
    });

    $from.datepick('setDate', fromStartDate);

    $from.on("click touch", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var duration = parseInt($('input[name=duration]').val());
        var maxDate = new Date($from.datepick('getDate')[0]);
        maxDate.setDate(maxDate.getDate() + duration + 30*100 );

        $from.datepick('option', 'maxDate', maxDate);

        $from.blur();

        if ($toggle_picker_from) {
            $from.datepick("show");
            $toggle_picker_from = false;
        } else {
            $from.datepick("hide");
            $toggle_picker_from = true;
        }


        return false;
    });


    var durationInterval = null;

    $count.on('mousedown', '.input__min, .input__max', function (event) {

        var that = this;

        updTourDuration(event, that, $count);

        durationInterval = setInterval(function() {
            updTourDuration(event, that, $count);
        }, 300);
        
    });

    $count.on('mouseup', '.input__min, .input__max', function (event) {
        clearInterval(durationInterval);
    });

    function updTourDuration(event, btn){
        var _ = $(btn);
        var $input = _.closest($count).find('.input__field input');
        var value = '';
        var string = $input.val();
        var matches = string.match(/\d+/g);
        var night = parseInt(matches[0]);
        var day = parseInt(matches[1]);
        var date = new Date($from.datepick('getDate')[0].getTime());

        if (day > 21 && event.currentTarget.className == 'input__max') return false;

        if (event.currentTarget.className == 'input__min') {
            night -= 1;
            day -= 1;
            if (night <= 1) night = 1;
            if (day <= 2) day = 2;
        }

        if (event.currentTarget.className == 'input__max') {
            night += 1;
            day += 1;
        }

        curDays = night;

        value = night + 'ночей / ' + day + 'дней';

        //$input.val(value);
        $('.input-day input').val(value);

        date.setDate(date.getDate() + curDays);

        MyDateString = ('0' + date.getDate()).slice(-2) + '.' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '.' +
        date.getFullYear();

        var duration = parseInt($('input[name=duration]').val());
        var maxDate = new Date($from.datepick('getDate')[0]);
        maxDate.setDate(maxDate.getDate() + duration + 30*100 );

        $from.datepick('option', 'maxDate', maxDate);

        $from.blur();

        event.preventDefault();
        return false;
    };

});



$('.input__date:not(.js-datepicker-to, .js-datepicker-from)').datepick({
    showAnim: 'fade',
    dateFormat: "dd.mm.yyyy",
    alignment: ($w.width() <= 960) ? 'bottomLeft' : 'bottom',
    changeMonth: false,
    renderer: datepickerTemplate,
    onSelect: function (dates) {
        $.post('/online-services/questions-archive/index_ajax.php', {
            dateFrom: $('#dateFrom').val(),
            dateTo: $('#dateTo').val(),
            searchTheme: $('#searchTheme').val()
        }).done(function (data) {
            $('.aarchive').html(data);
        })
    }
});

$('#searchTheme').keyup(function () {
    $.post('/online-services/questions-archive/index_ajax.php', {
        dateFrom: $('#dateFrom').val(),
        dateTo: $('#dateTo').val(),
        searchTheme: $('#searchTheme').val()
    }).done(function (data) {
        $('.aarchive').html(data);
    })
});

/* DROPDOWN
 -------------------------------------------------- */

function setDropdownHeight() {
    $('.dropdown__scroller').css({
        height: $w.outerHeight() - ($('.header').outerHeight() + $('.dropdown__holder').outerHeight() + 40)
    });
};

$('.dropdown-toggle').on('click', function () {
    if ($b.hasClass('dropdown-opened')) {
        $b.removeClass('dropdown-opened');
        $('.dropdown__scroller').css({
            height: 'auto'
        });
        /*$('.dropdown').css({
         height: 'auto'
         });*/
    } else {
        setDropdownHeight();
        /*
         $('.dropdown').css({
         height: $b.height() - $('.header').height() + 'px'
         });*/
        $b.addClass('dropdown-opened');
        //window.scrollTo(0, 0);
    }
    ;

    return false;
});

$w.on('resize', function () {
    if ($b.width() > 960) {
        $('.dropdown__scroller').css({
            height: 'auto'
        });
        /*$('.dropdown').css({
         height: 'auto'
         });*/
    } else {
        setDropdownHeight();
    }
});

$b.on('touchmove', function (e) {
    if ($b.hasClass('dropdown-opened')) {
        e.preventDefault();
    }
    ;
});

$('.dropdown__scroller').on('touchmove', function (e) {
    e.stopPropagation();
});

/* TRANSLIT
 -------------------------------------------------- */

$('[class^="translit-from-"]').each(function () {
    var className = $(this).attr('class');
    var classIndex = className.match(/\d+/)[0];

    $('.' + className).liTranslit({
        elAlias: $('.translit-to-' + classIndex)
    });
});

/* NICESCROLL
 -------------------------------------------------- */

$('.js-nicescroll').jScrollPane({
    verticalGutter: 20,
    hideFocus: true,
    autoReinitialise: true
});

/* SLIDER RANGE
 -------------------------------------------------- */

$('.slider-range').each(function () {
    var _ = $(this);
    var index = parseInt(_.attr('data-index'));

    var min = parseInt(_.attr('data-min'));
    var max = parseInt(_.attr('data-max'));
    var step = parseInt(_.attr('data-step'));
    var from = parseInt(_.attr('data-from'));
    var to = parseInt(_.attr('data-to'));

    _.slider({
        range: true,
        min: min,
        max: max,
        values: [from, to],
        step: step,
        slide: function (event, ui) {
            $('.js-sider-range-from-' + index).val((ui.values[0]).formatMoney(0, '.', ' '));
            $('.js-sider-range-to-' + index).val((ui.values[1]).formatMoney(0, '.', ' '));

            $('.js-sider-range-text-from-' + index).text((ui.values[0]).formatMoney(0, '.', ' '));
            $('.js-sider-range-text-to-' + index).text((ui.values[1]).formatMoney(0, '.', ' '));
        }
    });

    $('.js-sider-range-from-' + index).val((from).formatMoney(0, '.', ' '));
    $('.js-sider-range-to-' + index).val((to).formatMoney(0, '.', ' '));

    $('.js-sider-range-from-' + index).on('keyup focusout', function (e) {
        var value = parseInt(($(this).val()).replace(/\s+/g, ''));

        if (value <= min) value = min;
        if (value >= _.slider('values', 1)) value = _.slider('values', 1);

        _.slider('values', [value, _.slider('values', 1)]);

        if (e.type == 'focusout') {
            if (value >= _.slider('values', 1)) $(this).val((_.slider('values', 1)).formatMoney(0, '.', ' '));
        }
        ;
    });

    $('.js-sider-range-to-' + index).on('keyup focusout', function (e) {
        var value = parseInt(($(this).val()).replace(/\s+/g, ''));

        if (value >= max) value = max;
        if (value <= _.slider('values', 0)) value = _.slider('values', 0);

        _.slider('values', [_.slider('values', 0), value]);

        if (e.type == 'focusout') {
            if (value <= _.slider('values', 0)) $(this).val((_.slider('values', 0)).formatMoney(0, '.', ' '));
        }
        ;

    });

    $('.js-sider-range-text-from-' + index).text((from).formatMoney(0, '.', ' '));
    $('.js-sider-range-text-to-' + index).text((to).formatMoney(0, '.', ' '));
});

/* DROP
 -------------------------------------------------- */

$('.drop__select__value').on('click', function (e) {
    e.stopPropagation();

    var $root = $(this).closest('.drop');

    $('.drop').removeClass('-active');
    $root.toggleClass('-active');
});

$('.drop__select__list__item').on('click', function (e) {
    e.stopPropagation();

    var _ = $(this);
    var $root = _.closest('.drop');
    var $value = $root.find('.drop__select__value span');

    $root.removeClass('-active');
    $value.text(_.text());
});

$b.on('click', function () {
    $('.drop').removeClass('-active');
});

/* STICKY
 -------------------------------------------------- */

var stickyTimer;
var offsetTourFilter = $('.header').outerHeight(true);
var offsetTourFilterMap = $('.header').outerHeight(true) + $('.tour-filter').outerHeight(true);
var offsetTourFilterHotel = $('.header').outerHeight(true) + $('.tour-filter').outerHeight(true);
var manualTourFilterClose = false;
var manualTourFilterOpen = false;

$tour = {
    filterOpen: function () {
        //$('.tour-filter').addClass('-active');
        // $b.addClass('tour-filter-active');
       // $('.page-tour-search').find('.maain').css({
            // paddingTop: $('.header').outerHeight(true) + $('.tour-filter').outerHeight(true) + 'px'
        // });
        // $('.tour-filter-toggle').find('span').text('свернуть поиск');
      //  if ($b.width() <= 760) scrollPageTo($('#body'), 0);
    },

    filterClose: function () {
        //$('.tour-filter').removeClass('-active');
        // $b.removeClass('tour-filter-active');
        // $('.page-tour-search').find('.main').css({
            // paddingTop: $('.header').outerHeight(true) + 30 + 'px'
        // });
        // $('.tour-filter-toggle').find('span').text('развернуть поиск');
    },

    recalcSticky: function () {
        //$('.tour-filter').trigger('sticky_kit:recalc');
        //$('.tour-search__map__wrap').trigger('sticky_kit:recalc');
        $('.hotel-info__aside__wrap').trigger('sticky_kit:recalc');
    },

    mapUpdate: function (manualTourFilterOpen) {
        var offset;
        offsetTourFilter = $('.header').outerHeight(true);
        offsetTourFilterMap = $('.header').outerHeight(true) + $('.tour-filter').outerHeight(true);

        if (manualTourFilterOpen) {
            offset = offsetTourFilterMap;
        } else {
            offset = offsetTourFilter + 30;
        }
        ;

        //$('.tour-search__map__wrap').trigger('sticky_kit:detach');
       // $('.tour-search__map__wrap').stick_in_parent({
           // offset_top: offset,
           // parent: '.tour-search'
        //});
    },

    hotelUpdate: function (manualTourFilterOpen) {
        var offset;
        offsetTourFilter = $('.header').outerHeight(true);
        offsetTourFilterHotel = $('.header').outerHeight(true) + $('.tour-filter').outerHeight(true);

        if (manualTourFilterOpen) {
            offset = offsetTourFilterHotel;
        } else {
            offset = offsetTourFilter + 30;
        }
        ;

        $('.hotel-info__aside__wrap').trigger('sticky_kit:detach');
        $('.hotel-info__aside__wrap').stick_in_parent({
            offset_top: offset,
            parent: '.hotel-info',
            inner_scrolling: false,
            recalc_every: 100
        });
    },

    initSticky: function () {
        // $('.tour-filter').stick_in_parent({
        //   offset_top: offsetTourFilter,
        //   parent: 'body',
        //   //recalc_every: 100
        // });

        //$('.tour-search__map__wrap').stick_in_parent({
            //offset_top: offsetTourFilter + 30,
            //parent: '.tour-search'
            //recalc_every: 100
        //});

        $('.hotel-info__aside__wrap').stick_in_parent({
            offset_top: offsetTourFilter + 30,
            parent: '.hotel-info',
            inner_scrolling: false,
            recalc_every: 100
        });
    },

    detachSticky: function () {
        //$('.tour-filter').trigger('sticky_kit:detach');
        //$('.tour-search__map__wrap').trigger('sticky_kit:detach');
        $('.hotel-info__aside__wrap').trigger('sticky_kit:detach');
    },

    toggleSticky: function () {
        if ($b.width() <= 960) {
            $tour.detachSticky();
            $b.addClass('tour-filter-active');
            manualTourFilterClose = false;
            manualTourFilterOpen = false;
        } else {
            $tour.detachSticky();
            $tour.initSticky();
        }
        ;
    }
};

$('.tour-filter-toggle').on('click', function () {
    if ($b.hasClass('tour-filter-active')) {
        $tour.filterClose();
        if ($b.width() > 760) $tour.recalcSticky();
        manualTourFilterClose = true;
        manualTourFilterOpen = false;
    } else {
        $tour.filterOpen();
        if ($b.width() > 760) $tour.recalcSticky();
        manualTourFilterClose = false;
        manualTourFilterOpen = true;
    }
    ;

    //if ($('.tour-search__map__wrap').length && $b.width() > 760) $tour.mapUpdate(manualTourFilterOpen);
    if ($('.hotel-info__aside__wrap').length && $b.width() > 760) $tour.hotelUpdate(manualTourFilterOpen);
});

$w.on('scroll', function () {
    if ($b.width() > 960) {
        if ($d.scrollTop() >= 50) {
            if (!manualTourFilterClose && !manualTourFilterOpen) {
                $tour.filterClose();
            }
            ;
        } else {
            if (!manualTourFilterClose && !manualTourFilterOpen) {
                $tour.filterOpen();
            }
            ;
        }
        ;
    }
    ;
});

$d.on('ready', function () {
    if ($b.width() > 960) $tour.initSticky();

    if ($b.width() > 760) {
        $tour.toggleSticky();
    } else {
        $tour.detachSticky();
    }
    ;

    if ($b.width() <= 760) {
        $tour.filterClose();
    } else {
        $tour.filterOpen();
    }
    ;
});

$w.on('load resize', function (e) {
    if ($b.width() > 760) {
        $tour.toggleSticky();
    } else {
        $tour.detachSticky();
    }
    ;
    /*
     if (e.type == 'resize') {
     if ($b.width() <= 760) {
     $tour.filterClose();
     } else {
     $tour.filterOpen();
     };
     };
     */
});

/* Booking */

var offsetBooking = $('.header').outerHeight(true);

$('.booking-total:not(.booking-total-mobile)').stick_in_parent({
    offset_top: offsetBooking + 20,
    parent: '.booking-row',
    inner_scrolling: false
});

/* Navigation aside */

$navAside = {
    toggle: function () {
        var offsetNavAside = $('.header').outerHeight(true);

        if ($b.width() > 960) {

            $('.navigation-aside-fixed').stick_in_parent({
                offset_top: offsetNavAside + 20,
                parent: '.content-row',
                inner_scrolling: false
            });

        } else {

            $('.navigation-aside-fixed').trigger('sticky_kit:detach');

        }
    }
};

$d.on('ready', function () {
    $navAside.toggle();
});

$w.on('load resize', function () {
    $navAside.toggle();
});

/* KEYBOARD NAV
 -------------------------------------------------- */

var autocompleteSelected = -1;

$b.on('keyup keydown', function (e) {

    if (!window.skipMeHere) {

        var $autocomplete = $('.autocomplete-active');

        if ($autocomplete.length) {
            var _scope = $('#body').scope();
            var $autocompleteDropdown = $autocomplete.find('.quick-dropdown__list');
            var autocompleteTotal = $autocompleteDropdown.find('.list__item').length;
            var keyCode = e.keyCode || e.which;

            if (!$autocompleteDropdown.find('.-active').length) {
                autocompleteSelected = -1;
            }
            ;

            //up
            if (keyCode == 38 && e.type == 'keydown') {
                e.preventDefault();
            }
            ;

            if (keyCode == 38 && e.type == 'keyup') {
                autocompleteSelected -= 1;
                autocompleteSelected = (autocompleteSelected <= 0) ? 0 : autocompleteSelected;
                $autocompleteDropdown.find('.list__item').eq(autocompleteSelected).addClass('-active').siblings('.list__item').removeClass('-active');
            }
            ;

            //down
            if (keyCode == 40 && e.type == 'keydown') {
                e.preventDefault();
            }
            ;

            if (keyCode == 40 && e.type == 'keyup') {
                autocompleteSelected += 1;
                autocompleteSelected = (autocompleteSelected >= autocompleteTotal - 1) ? autocompleteTotal - 1 : autocompleteSelected;
                $autocompleteDropdown.find('.list__item').eq(autocompleteSelected).addClass('-active').siblings('.list__item').removeClass('-active');
            }
            ;

            if (keyCode === 13 && e.type == 'keydown') {
                e.preventDefault();
            }
            ;

            if (keyCode === 13 && e.type == 'keyup') {
                if (autocompleteSelected != -1) {
                    var value = $autocompleteDropdown.find('.-active .list__title').text();
                    var $root = $autocomplete.closest('.input');

                    if ($root.find('#autocomplete-city').length) _scope.autocompleteCity.value = value;
                    if ($root.find('#autocomplete-where').length) _scope.autocompleteWhere.value = value;
                    if ($root.find('#autocomplete-hotel').length) _scope.autocompleteHotel.value = value;

                    _scope.inFocus = false;
                    _scope.autocompleteVisibility = false;
                    _scope.$apply();

                    autocompleteSelected = -1;
                }
                ;
            }
            ;
        }
        ;
    }
});

$b.on('focusout', '.js-keyboard-item', function (e) {
    $('.autocomplete').find('.-active').removeClass('-active');
});

$('.js-keyboard-form').on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
    ;
});

/* SCROLLER TEXT HEIGHT
 -------------------------------------------------- */

function setHotelDetailTextHeight() {
    if ($b.width() > 760) {
        var textScrollContainer = $('.hotel-info-details .carousel-in img').height() - $('.hotel-info-details__section h5').outerHeight(true) - $('.hotel-info-details__section .incut').outerHeight();
        var tabsScrollContainer = $('.hotel-info-details__aside').height() - $('.hotel-info-details .carousel-in img').height() - $('.hotel-info-details .tabs .tab__title').outerHeight(true);

        $('.hotel-info-details__text').height(textScrollContainer - 20);
        $('.hotel-info-details__tabs-text').height(tabsScrollContainer - 40);
    }
    ;
};

$d.on('ready', setHotelDetailTextHeight);
$w.on('load resize', setHotelDetailTextHeight);

/* LOADER
 -------------------------------------------------- */

$loader = {
    show: function () {
        var $popup = $('.loading-popup');

        $b.addClass('loading-overlay-active');

        $popup.css({
            marginTop: -($popup.outerHeight() / 2),
            marginLeft: -($popup.outerWidth() / 2)
        });
    },

    hide: function () {
        $b.removeClass('loading-overlay-active');
    }
};

$('.js-loader-show').on('click', function () {
    $loader.show();

    return false;
});

$('.js-loader-hide').on('click', function () {
    $loader.hide();

    return false;
});

/*********************************/

function incNum(from, to, el) {
    from = +from;
    to = +to;

    if (!to) return to;
    if (from == to) return to;

    var duration = (to - from) * 20;

    $({
        n: from
    }).animate({
        n: to
    }, {
        duration: duration,
        step: function (a) {
            $(el).html(a | 0)
        }
    });

    return to;
}

$('#search-form-top').on('submit', function (e) {
    $this = $(this);

    var $from = $this.find('input[name=selected-city]');
    var $to = $this.find('input[name=selected-country]');
    var err = false;


    if (!$from.val()) {
        err = true;
        $from.siblings('input[name=StartPointName]').attr('placeholder', 'Пожалуйста, укажите город вылета')
            .parentsUntil('.input-from')
            .parent()
            .addClass('error-fld');
    }

    if (!$to.val()) {
        err = true;
        $to.siblings('input[name=destination]').attr('placeholder', 'Пожалуйста, укажите страну или город прилёта')
            .parentsUntil('.input-to')
            .parent()
            .addClass('error-fld');
    }

    if (err) {
        e.preventDefault();
    }

});

$('#search-form-top, #search-form-bottom').on('submit', function (e) {
    $this = $(this);

    if ($this.hasClass('search-started')) {
        e.preventDetailt();
        return false;
    }

    var $from = $this.find('input[name=selected-city]');
    var $to = $this.find('input[name=selected-country]');
    var err = false;

    if (!$from.val()) {
        err = true;
        $from.siblings('input[name=StartPointName]').attr('placeholder', 'Пожалуйста, укажите город вылета')
            .parentsUntil('.input-from')
            .parent()
            .addClass('error-fld');
    }

    if (!$to.val()) {
        err = true;
        $to.siblings('input[name=destination]').attr('placeholder', 'Пожалуйста, укажите страну или город прилёта')
            .parentsUntil('.input-to')
            .parent()
            .addClass('error-fld');
    }

    if (err) {
        e.preventDefault();
    } else {

        if($('#wheel').hasClass('hidden') && $this.attr('id') == 'search-form-top'){
            $('.filter__circle.circle__container').hide();
            $('#uiThrobber').css("display", "block");
            $('#wheel').removeClass('hidden');

            e.preventDefault();

            setTimeout(function(){
                $this.submit();
            }, 2000);


        }else{
            $this.addClass('search-started');
        }
    }


});

function resetErrorField(field, parentCls) {

    var placeholder = '';
    if ('.input-from' == parentCls) {
        placeholder = 'город';
    } else if ('.input-to' == parentCls) {
        placeholder = 'страна / город / курорт или отель';
    }

    $(field).attr('placeholder', placeholder).parentsUntil(parentCls).removeClass('error-fld');
}
/*
 $('#checkdropAll').on('change', function(){

 var allChecked = $(this).prop('checked') ? true : false;

 $('.input-drop-rating input[type=checkbox]').each(function(){
 if(
 (!allChecked && $(this).prop('checked')) ||
 (allChecked && !$(this).prop('checked'))
 ) $(this).click();
 });
 
 })*/


$(function () {
    $('[name=pack_type]').on('change', function () {

        var opt = {
            inputCity: $('input[name=selected-city]').val(),
            inputCountry: $('input[name=selected-country]').val(),
        }

        refreshAvaliableDates(opt);
    });

    $('body').on('click', '.js-add-to-fav-hotel-in', function (e) {
        e.preventDefault();
        addToFav(this, $(this).data('id'));
    });

    $('body').on('click', '.js-send-to-email', function (e) {
        e.preventDefault();
        var $this = $(this);
        var url = $this.data('url');
        var id = $this.data('id');
        sendToEmail(this, id, url);

    });


});


function refreshAvaliableDates(options) {

    options = options || {};
    options.inputCity = options.inputCity || '';
    options.inputCountry = options.inputCountry || '';
    options.inputRegion = options.inputRegion || $('input[name=selected-region]').val();

    var packType = $('[name=pack_type]:checked').val();
    var $dp = $('.js-datepicker-from');

    $dp.addClass('loading');

    // временное исключение для Питера
    if(156106 == options.inputRegion && 'fullBoard'  == packType){
        $('#check3').click();   

        refreshAvaliableDates(options)
    }

    if (options.inputCity && options.inputCountry && packType) {

        $.ajax({
            url: '/local/ajax/get-allowed-dates.php',
            data: {
                selectedCity: options.inputCity,
                selectedCountry: options.inputCountry,
                packType: packType,
                WhatGet: 'getAllowedDates'
            },
            dataType: 'json',
            beforeSend: function () {
                $dp.addClass('animated');
            }
        }).done(function (data) {
            $dp.datepick('option', 'allowedDatesInited', true);
            $dp.datepick('option', 'allowedDates', data);
        });
    } else {
        $dp.datepick('option', 'allowedDatesInited', false);
        $dp.datepick('option', 'allowedDates', []);
    }

}


function getFromLocalStorage(name) {
    if (!name) return false;
    if (!window.localStorage) return false;

    var date = new Date();
    var today = "day_" + date.getFullYear() + date.getMonth() + date.getDate();

    try {
        if (!localStorage.getItem(today)) {
            localStorage.clear();
        } else {
            return localStorage.getItem(name + today);
        }
    } catch (err) {
    }
}

function setToLocalStorage(name, val) {
    if (!name) return false;
    if (!window.localStorage) return false;

    var date = new Date();
    var today = "day_" + date.getFullYear() + date.getMonth() + date.getDate();

    try {
        if (!localStorage.getItem(today)) {
            localStorage.clear();
        }

        localStorage.setItem(today, 'y');
        localStorage.setItem(name + today, val);
    } catch (err) {
    }
}


function getMinPrice4Banner(banner) {
    if (!banner) return false
    var slides = [];

    $(banner).each(function () {
        var $this = $(this);
        slides.push({
            obSlide: $this,
            from: $this.data('from'),
            to: $this.data('to'),
            country: $this.data('country'),
            city: $this.data('city'),
            hotel: $this.data('hotel')
        });
    });

    run(slides);

    function run(slides) {

        if (!slides.length) return false;

        var slide = slides.shift();
        var ssGMPId = "ssGMPID" + slide.from + slide.to + slide.country + slide.city + slide.hotel;

        if (window.sessionStorage) {
            var lastUpd = sessionStorage.getItem('lastUpd' + ssGMPId);

            var nowTime = +new Date() / 1000;
            if (lastUpd && ((nowTime - lastUpd) > 600)) {
                sessionStorage.clear();
            } else {
                var dataFromStorage = JSON.parse(sessionStorage.getItem(ssGMPId));
            }
        }
        if (dataFromStorage) {
            applyData(dataFromStorage, slide);
            run(slides);
        } else {
            $.ajax({
                url: '/local/ajax/get-min-price.php',
                data: {
                    TourDateFrom: slide.from,
                    TourDateTill: slide.to,
                    country: slide.country,
                    city: slide.city,
                    hotel: slide.hotel
                },
                dataType: 'json'

            }).done(function (data) {
                applyData(data, slide);
                run(slides);

                if (window.sessionStorage && ssGMPId) {
                    sessionStorage.setItem(ssGMPId, JSON.stringify(data));
                    sessionStorage.setItem('lastUpd' + ssGMPId, +new Date() / 1000);
                }
            });
        }

    }

    function applyData(data, slide) {
        if (data.PRICE) {
            slide.obSlide.removeClass('hidden')
                .parent()
                .removeClass('hidden').attr('href', data['LINK'])
                .find('b')
                .html(data['PRICE']);
        } else if (data.LINK) {
            slide.obSlide
                .parent()
                .removeClass('hidden').attr('href', data['LINK']);
        }

        if(data.LINK){
            var el = slide.obSlide.parents('.inner');
            if(slide.obSlide.parents('.inner').hasClass('hidden')){
                slide.obSlide.parents('.carousel__item').on('click', function(e){
                    document.location.href = data.LINK;
                }).css('cursor', 'pointer');
            }
        }
    }

}

function berryToggle() {
    $('.berry-input').each(function () {
        var $self = $(this);

        if ($self.find('input').prop('checked')) {
            $self.addClass('-berry-checked');
        } else {
            $self.removeClass('-berry-checked');
        }
        ;

        if ($self.find('input').prop('disabled')) {
            $self.removeClass('-berry-status-enabled').addClass('-berry-status-disabled');
        } else {
            $self.removeClass('-berry-status-disabled').addClass('-berry-status-enabled');
        }
        ;
    });
};


$(function () {
    $('#search-form-top, #search-form-bottom, #tour-search').on('submit', function () {
        yaCounter36851130.reachGoal('button_search');
    });

    $('.login').on('click', function () {
        yaCounter36851130.reachGoal('registration_form');
    });

    $('.js-order-tour').on('click', function () {
        yaCounter36851130.reachGoal('button_bron');
    });


    (function blink() {
        $('.blink_me').fadeOut(500).fadeIn(500, blink);
    })();


    $('.js-submit-location').on('click', function(e){
        e.preventDefault();
    })

});


function formatDateTo(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
}

/*
 if (window.sessionStorage) {
 sessionStorage.clear();
 }
 if (window.localStorage) {
 localStorage.clear();
 }
 */
//Карусель на главной портретная и ландшафтная ориентация
$(document).ready(function(){
	
	if (window.innerHeight > window.innerWidth) {
	  var ImageUrl = $('div.slick-current').css('background-image');
	  $('div.slick-current').css('background-image', $('div.slick-current .span.item_mobile').css('background-image'));
	  $('div.slick-current .carousel__item__mobile').css('background-image', $('div.slick-current .span.item_mobile').css('background-image'));
	  $('div.slick-current .span.item_mobile').css('background-image', ImageUrl);
	  //$('.carousel__item__mobile').hide();
	}	
	
	$( window ).on( "orientationchange", function( event ) {
	  var ImageUrl = $('div.slick-current').css('background-image');
	  var newImageUrl = $('div.slick-current .span.item_mobile').css('background-image');
	  $('div.slick-current').css('background-image', newImageUrl);
	  $('div.slick-current .carousel__item__mobile').css('background-image', newImageUrl);
	  $('div.slick-current .span.item_mobile').css('background-image', ImageUrl);
	  //$('.carousel__item__mobile').hide();
	});
	
	//Клик на ссылку перелёт
	/*$( "li.flight" ).on('click', function (e) {
		console.log('sss');
		//e.preventDefault();
		//$(this).next(".flight-text").show('slow');
	});*/
});
