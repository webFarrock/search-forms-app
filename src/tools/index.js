import queryString from 'query-string';
import moment from 'moment';

export function isMatchUserInput(term = '', obj) {
    term = term.toLowerCase();

    const value = obj.value ? obj.value.toLowerCase() : '';
    const value_en = obj.value_en ? obj.value_en.toLowerCase() : '';
    const value_wr = obj.value_wr ? obj.value_wr.toLowerCase() : '';

    return (
        (value && value.toLowerCase().indexOf(term) !== -1) ||
        (value_en && value_en.toLowerCase().indexOf(term) !== -1) ||
        (value_wr && value_wr.toLowerCase().indexOf(term) !== -1)
    );
}

export function isMatchUserInput4Hotel(term = '', obj) {
    term = term.toLowerCase();

    const value = obj.value ? obj.value.toLowerCase() : '';

    return (value && value.toLowerCase().indexOf(term) !== -1);
}

export function naturalSort(array, extractor) {
    "use strict";
    // преобразуем исходный массив в массив сплиттеров
    var splitters = array.map(makeSplitter);
    // сортируем сплиттеры
    var sorted = splitters.sort(compareSplitters);
    // возвращаем исходные данные в новом порядке
    return sorted.map(function (splitter) {
        return splitter.item;
    });
    // обёртка конструктора сплиттера
    function makeSplitter(item) {
        return new Splitter(item);
    }

    // конструктор сплиттера
    //    сплиттер разделяет строку на фрагменты "ленивым" способом
    function Splitter(item) {
        var index = 0;           // индекс для прохода по строке
        var from = 0;           // начальный индекс для фрагмента
        var parts = [];         // массив фрагментов
        var completed = false;       // разобрана ли строка полностью
        // исходный объект
        this.item = item;
        // ключ - строка
        var key = (typeof (extractor) === 'function') ?
            extractor(item) :
            item;
        this.key = key;
        // количество найденных фрагментов
        this.count = function () {
            return parts.length;
        };
        // фрагмент по индексу (по возможности из parts[])
        this.part = function (i) {
            while (parts.length <= i && !completed) {
                next();   // разбираем строку дальше
            }
            return (i < parts.length) ? parts[i] : null;
        };
        // разбор строки до следующего фрагмента
        function next() {
            // строка ещё не закончилась
            if (index < key.length) {
                // перебираем символы до границы между нецифровыми символами и цифрами
                while (++index) {
                    var currentIsDigit = isDigit(key.charAt(index - 1));
                    var nextChar = key.charAt(index);
                    var currentIsLast = (index === key.length);
                    // граница - если символ последний,
                    // или если текущий и следующий символы разнотипные (цифра / не цифра)
                    var isBorder = currentIsLast ||
                        xor(currentIsDigit, isDigit(nextChar));
                    if (isBorder) {
                        // формируем фрагмент и добавляем его в parts[]
                        var partStr = key.slice(from, index);
                        parts.push(new Part(partStr, currentIsDigit));
                        from = index;
                        break;
                    } // end if
                } // end while
                // строка уже закончилась
            } else {
                completed = true;
            } // end if
        } // end next
        // конструктор фрагмента
        function Part(text, isNumber) {
            this.isNumber = isNumber;
            this.value = isNumber ? Number(text) : text;
        }
    }

    // сравнение сплиттеров
    function compareSplitters(sp1, sp2) {
        var i = 0;
        do {
            var first = sp1.part(i);
            var second = sp2.part(i);
            // если обе части существуют ...
            if (null !== first && null !== second) {
                // части разных типов (цифры либо нецифровые символы)
                if (xor(first.isNumber, second.isNumber)) {
                    // цифры всегда "меньше"
                    return first.isNumber ? -1 : 1;
                    // части одного типа можно просто сравнить
                } else {
                    var comp = compare(first.value, second.value);
                    if (comp != 0) {
                        return comp;
                    }
                } // end if
                // ... если же одна из строк закончилась - то она "меньше"
            } else {
                return compare(sp1.count(), sp2.count());
            }
        } while (++i);
        // обычное сравнение строк или чисел
        function compare(a, b) {
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        };
    };
    // логическое исключающее "или"
    function xor(a, b) {
        return a ? !b : b;
    };
    // проверка: является ли символ цифрой
    function isDigit(chr) {
        var code = charCode(chr);
        return (code >= charCode('0')) && (code <= charCode('9'));
        function charCode(ch) {
            return ch.charCodeAt(0);
        };
    };
}

export function prepareUrl(opt) {

    let obUrl = {
        'city': opt.selectedStartPoint.id,
        'country': opt.selectedCountry.id,
        'region': Object.keys(opt.selectedRegions).join(','),
        'hotel': Object.keys(opt.selectedHotels).join(','),
        'dateFrom': opt.tourDate,
        'duration': opt.duration,
        'adults': opt.adults,
        'childs': opt.kids.join(','),
        'date_range': '',// todo
        'pack_type': Object.keys(opt.tourTypes).join(','),
    }

    for (let key  in obUrl) {
        if (!obUrl[key]) delete obUrl[key];
    }


    return queryString.stringify(obUrl, {encode: false});
}


export function initCalendar(reactApp) {

    $.extend($.datepick, {
        highlightThreeDays: function (picker, inst) {
            /*
            if ($('input.js-datepicker-from').parents('.form-type-out').hasClass('three-days-active')) {
                $('input#three-days').prop("checked", true);
            } else {
                $('input#three-days').prop("checked", false);
            }
            */

            __set_threedays_in_calendar();

            if ($(window).height() > 750) {
                $('.datepick-popup').css("margin-top", -($('.js-datepicker-from').parent().height() + 13) + 'px');
            } else {
                $('.datepick-popup').css("margin-top", ($('.js-datepicker-from').parent().offset().top) + 'px');
            }
        },
    });


    $('.js-datepicker-from').datepick({
        showAnim: 'fade',
        dateFormat: "dd.mm.yyyy",
        renderer: datepickerTemplate,
        changeMonth: false,
        monthsToShow: datepickerMonthToShow(),
        minDate: reactApp.state.minDate,
        onShow: $.datepick.highlightThreeDays,
        onSelect: (date) => {
            $(reactApp.refs.input).blur();
            reactApp.props.setTourDate(moment(date.toString()).format('DD.MM.YYYY'));
        },
    });

    window.__set_threedays_in_calendar = function () {
        if ($('a.datepick-selected').length > 0 && $('input#three-days').prop("checked")) {
            var selected_date = $('a.datepick-selected').attr('class').split('dp')[1].split(' ')[0];
            var inc = 86400000;
            var date_num1 = selected_date * 1 + inc * 1;
            var date_num2 = selected_date * 1 + inc * 2;
            var date_num3 = selected_date * 1 + inc * 3;
            $('.dp' + date_num1).addClass('three-days-date');
            $('.dp' + date_num2).addClass('three-days-date');
            $('.dp' + date_num3).addClass('three-days-date').addClass('tdd-last');
            var pdate_num1 = selected_date * 1 - inc * 1;
            var pdate_num2 = selected_date * 1 - inc * 2;
            var pdate_num3 = selected_date * 1 - inc * 3;
            $('.dp' + pdate_num1).addClass('three-days-date');
            $('.dp' + pdate_num2).addClass('three-days-date');
            $('.dp' + pdate_num3).addClass('three-days-date').addClass('tdd-first');
        } else {
            $('a.three-days-date').removeClass('three-days-date');
        }

        if ($('#three-days:checked').length > 0) {
            $('input.js-datepicker-from').parents('.form-type-out').addClass('three-days-active');
        } else {
            $('input.js-datepicker-from').parents('.form-type-out').removeClass('three-days-active');
        }

    }

    window.set_threedays_in_calendar = window.__set_threedays_in_calendar;
}


