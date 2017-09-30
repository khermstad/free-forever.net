'use strict';

// app.js - free-forever.net - khermstad 
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');

// route imports
var index = require("./routes/index.js");
var catalog = require("./routes/catalog.js");
var artists = require("./routes/artists.js");
var register = require("./routes/register.js");

// port settings
var port = 3000;

// view settings
app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// static public directory (for css/jss and other static files)
app.use('/public', express.static(path.join(__dirname, 'public')));

// routes
app.use("/", index);
app.use("/catalog", catalog);
app.use("/artists", artists);
app.use("/register", register);

app.listen(port, function () {
  return console.log("app.js running on port: " + port);
});