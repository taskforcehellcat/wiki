'use strict';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    const options = {
        method: 'POST',
        headers: {
            'mode': 'no-cors',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // POSTing here
    console.log(data);
    fetch('/log-submit', options);

});