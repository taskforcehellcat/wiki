const express = require('express');
const app = express();

const PORT = 1337;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
app.use(express.static('public'));
app.use(express.json({
    limit: '10kb'
}));

app.post('/log-submit', (request, response) => {
    console.log(request.body);
});