require('./../css/general.css');
require('./../css/home.css');
var $ = require('jquery');

function init() {
    window.scrollTo(window.scrollX + 1, window.scrollY);
}

$(document).ready(function() {
    init();

    $(document).on('click', '#top-button', function (e) {
        e.stopPropagation();
        $('html, body').animate({
            scrollTop: 0
        }, 1200);
    });

    $(document).on('click', '#work-button', function (e) {
        e.stopPropagation();
        var vheight = $(window).height();
        $('html, body').animate({
            scrollTop: (Math.floor($(window).scrollTop() / vheight)+1) * vheight
        }, 1200);
    });

    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 500) {
             $('#top-button').show();
         }
         else {
             $('#top-button').hide();
         }
    });
});