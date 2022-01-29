document.body.insertAdjacentHTML('afterbegin', '<div id="loading"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="120px" height="120px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="red" stroke-width="5" r="30" stroke-dasharray="165 59"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg></div>');

const wait = (delay = 0) =>
    new Promise(resolve => setTimeout(resolve, delay));

var domLoaded = false
document.addEventListener('DOMContentLoaded', () =>
    wait(500).then(() => {
        document.querySelector("#loading").style.display = "none";
        domLoaded = true;
    })
);