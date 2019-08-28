require('./../css/general.css');
require('./../css/work_page.css');
var $ = require('jquery');

var workPageTemplate = require('./../handlebars/work_page.hbs');

function init() {
    $('#body-wrapper').append(workPageTemplate(globals.template));
}

$(document).ready(function() {
    init();

    $('#work-button').click(function() {
       window.location = globals.base_url;
    });

    $(document).on('click', '#s2', function (e) {
        e.stopPropagation();
        $('#overlay').addClass('active');
        $('#s2').addClass('active');
    });

    $(document).on('click', '#overlay.active', function (e) {
        e.stopPropagation();
        $('#overlay').removeClass('active');
        $('#s2').removeClass('active');
    });

    $(document).on('click', '#s2.active', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '#right-arrow, #left-arrow', function (e) {
        e.stopPropagation();
        var $slides = $('.slide');
        var slideLength = $slides.length;

        if ($(this).attr('id') == 'right-arrow') {
            var slideIndex = $slides.index($('#s1'));
            var slideCheck = function() {
                slideIndex+=1;
                if (slideIndex == slideLength) {slideIndex = 0}
            };
        } else {
            slideIndex = $slides.index($('#s3'));
            slideCheck = function() {
                slideIndex-=1;
                if (slideIndex < 0) {slideIndex = slideLength-1}
            };
        }

        $($slides[slideIndex]).attr('id', '');
        slideCheck();
        $($slides[slideIndex]).attr('id', 's1');
        slideCheck();
        $($slides[slideIndex]).attr('id', 's2');
        slideCheck();
        $($slides[slideIndex]).attr('id', 's3');
    });
});