$(document).ready(function() {
    // Обработчик placeholder
    if(!Modernizr.input.placeholder) {
        $('input[type=search]').focus(function() {
            var input = $(this);
            if(input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if(input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
});