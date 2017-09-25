var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

app.set('views', __dirname + '/views');


app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);