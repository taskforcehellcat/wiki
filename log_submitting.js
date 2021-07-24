'use strict';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const valueJSON = Object.fromEntries(data.entries());

    // POSTing here
    console.log(valueJSON);
});