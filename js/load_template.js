var bodyContent;
$.get('body-template.html', function(data) {
    bodyContent = data;
    $('body').prepend(bodyContent);
});

var headContent;
$.get('head-template.html', function(data) {
    headContent = data;
    $('head').prepend(headContent);
});

/*
$('#loadingscreen').css('opacity', '0');
$('#loadingscreen').delay(6000).remove;
*/