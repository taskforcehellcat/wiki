'use strict';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData.append("timestamp", Date.now());

    const data = Object.fromEntries(formData.entries());

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    console.log(data); // DEBUG

    fetch('/log-submit', options).then(response => {
        // when response is received, deactivate the submit button
        button = document.getElementById('submit_btn');

        button.setAttribute('disabled', true);
        button.innerHTML = 'Eingereicht!';
        button.className = ''; // TODO: add proper class name for 'used' button

        console.log(response.body); // DEBUG
    });
});