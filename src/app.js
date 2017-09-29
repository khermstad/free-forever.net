const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log("app.js running on port: " + port));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/catalog', function (req, res) {
    res.render('catalog');
})
