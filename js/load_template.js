/* --- old static site generator (deprecated) --- */
/* --- why did i ever think this was a good idea */
/* --- the fuck even is this --- */

var contentData;
$.get('nav-template.html', function(data) {
    contentData = data;
    $('main').prepend(contentData);
});

var footerData;
$.get('footer-template.html', function(data) {
    footerData = data;
    $('body').append(footerData);
});

var headData;
$.get('head-template.html', function(data) {
    headData = data;
    $('head').prepend(headData);
});