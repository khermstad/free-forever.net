var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var port = 3000;

var app = express();
app.use('/public', express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

app.set('views', __dirname + '/views');


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/catalog', function (req, res) {
    res.render('catalog');
})

app.listen(port, () => console.log("app.js running on port: " + port));