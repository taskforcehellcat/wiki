'use strict';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    document.getElementById('submit_btn').setAttribute('disabled', true);
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

    // POSTing here
    console.log(data);

    fetch('/log-submit', options).then(response => {
        alert("log sent");
    });
});