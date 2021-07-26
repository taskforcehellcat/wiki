getLogs()

async function getLogs() {
    const response = await fetch('/get_logs');
    const data = await response.json();
    console.log(data); // debug

    if (data.length === 0) {
        const msg = document.createElement('p');
        msg.innerText = 'no missions to display.';
        document.getElementById('no-missions').appendChild(msg);

        const link = document.createElement('a');
        link.href = "mlg.html";
        link.innerHTML = '<span class="material-icons">add</span>';
        document.getElementById('no-missions').appendChild(link);
    }
}