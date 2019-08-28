require('./../css/general.css');
require('./../css/contact.css');
require('./../library/fontawesome/fontawesome.js');
var $ = require('jquery');

var messageSentTemplate = require('./../handlebars/message_sent.hbs');

$(document).ready(function() {
    $(document).on('click', '#message-submit', function () {
        var $errors = $('.error');
        $errors.hide();

        var city = $('#city-input').val().trim();
        var state = $('#state-input').val().trim();
        var company = $('#company-input').val().trim();
        var firstName = $('#first-name-input').val().trim();
        var lastName = $('#last-name-input').val().trim();
        var phone = $('#phone-input').val().trim();
        var email = $('#email-input').val().trim();
        var message = $('#message-input').val().trim();

        if(message.length == 0) {
            $('.error.message').show();
            return;
        }

        var postData = {
            'city': city,
            'state': state,
            'company': company,
            'first_name': firstName,
            'last_name': lastName,
            'phone': phone,
            'email': email,
            'message': message
        };

        $.ajax({
            headers: {"X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').attr('value')},
            url: globals.base_url + '/contact/message/',
            data: postData,
            dataType: 'json',
            type: "POST",
            success: function (response) {
                var $rightWrapper = $('#right-wrapper');
                $rightWrapper.empty();
                $rightWrapper.append(messageSentTemplate());
            },
            error: function (response) {

            }
        });
    });
});