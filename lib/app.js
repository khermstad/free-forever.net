'use strict';

// app.js - free-forever.net - khermstad 
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();
var port = 3000;

// view settings
app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// static public directory (for css/jss and other static files)
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  return console.log("app.js running on port: " + port);
});

// routes
var index = require("./routes/index.js");
app.use("/", index);

var catalog = require("./routes/catalog.js");
app.use("/catalog", catalog);