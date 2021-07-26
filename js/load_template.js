var content;
$.get('body-template.html', function(data) {
    content = data;
    $('body').prepend(content);
});

$(function() {
    $("head").load("../head-template.html");
});

/*
$('#loadingscreen').css('opacity', '0');
$('#loadingscreen').delay(6000).remove;
*/