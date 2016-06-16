const app = require('express')();

app.get('/', (req, res) => {
    res.sendFile('./index.html',  { root: __dirname });
});

app.listen();