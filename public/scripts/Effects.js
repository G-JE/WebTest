//function to type out some of the text on the website
function typewriter(element, selector, extra_char,delay, callback) {
    if (!extra_char) extra_char = '';
    text = $.trim(element.text());
    element.html("");
    element.show();

    function type_next(final_text, element, delay, i, callback) {
        $(element).html( final_text.substr(0, i)+extra_char );
        if (final_text.length > i) {
            setTimeout(function() {
                type_next(final_text, element, delay, i+1, callback);
            }, delay);
        }
        else {
            $(element).html( final_text );
            var next = $(element).next(selector);
            if (next.length) {
                typewriter(next, selector, extra_char, delay, callback);
            }
            else if (callback) callback();
        }
    }
    type_next(text,element, delay, 0, callback);
}

$(document).ready(function(){

    //calls typewriter for the header and the about
    typewriter($('h1:first'),'h1', "&#10074;", 200, function(){
        $('h1').append("<span class='blinky' style='animation-duration:1s'>&#10074</span>");
    });
    typewriter($('#info:first'),'#info', "&#10074;", 50, function(){
        $('#info').append("<span class='blinky' style='animation-duration:1s'>&#10074</span>");
    });

    //Scrolls to href element
    $('a[href^="#"]').on('click', function(event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });

    //Adds Active Class to chosen href
    $(".nav a").on("click", function() {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    //Adds Active Class to element in view


});