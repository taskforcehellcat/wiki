'use strict';

function handleSubmit (event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    const JSONToSave = JSON.stringify(value)

    console.log({ JSONToSave });
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);