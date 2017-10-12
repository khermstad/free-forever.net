'use strict';

// app.js - free-forever.net - khermstad 
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var parser = require('body-parser');
var session = require('express-session');

// route imports
var index = require("./routes/index.js");
var catalog = require("./routes/catalog.js");
var artists = require("./routes/artists.js");
var register = require("./routes/register.js");
var login = require("./routes/login.js");
var mycatalog = require("./routes/user/mycatalog.js");
var uploadtrack = require("./routes/user/uploadtrack.js");
var mysettings = require("./routes/user/mysettings.js");
var userhome = require("./routes/user/userhome.js");

// port settings
var port = 5000;

// sessions
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 24 * 60 * 60 * 1000 }, resave: true, saveUninitialized: true }));

//body-parser setting
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// view settings
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/../views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/../views');

// static public directory (for css/jss and other static files)
app.use('/public', express.static(path.join(__dirname, '/../public')));

// routes
app.use("/", index);
app.use("/catalog", catalog);
app.use("/artists", artists);
app.use("/register", register);
app.use("/login", login);
app.use("/mycatalog", mycatalog);
app.use("/uploadtrack", uploadtrack);
app.use("/mysettings", mysettings);
app.use("/userhome", userhome);

app.get("/signout", function (req, res) {
    req.session.destroy(console.log('session destroyed'));
    res.render('index');
});

app.listen(port, function () {
    return console.log("app.js running on port: " + port);
});