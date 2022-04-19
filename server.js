var express = require('express');
var app = express();
app.use(express.static('content'));
const port = 3000;
app.listen(port, () => console.log(`Listening on localhost: ${port}`));