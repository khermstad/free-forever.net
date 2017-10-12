// app.js - free-forever.net - khermstad 
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const parser = require('body-parser');
const session = require('express-session')

// route imports
const index = require("./routes/index.js");
const catalog = require("./routes/catalog.js");
const artists = require("./routes/artists.js");
const register = require("./routes/register.js");
const login = require("./routes/login.js");
const mycatalog = require("./routes/user/mycatalog.js");
const uploadtrack = require("./routes/user/uploadtrack.js");
const mysettings = require("./routes/user/mysettings.js");
const userhome = require("./routes/user/userhome.js");


// port settings
const port = 5000;

// sessions
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 24 * 60 * 60 * 1000}, resave: true, saveUninitialized: true}))

//body-parser setting
app.use(parser.urlencoded({extended:true}));
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
app.use("/mycatalog", mycatalog)
app.use("/uploadtrack", uploadtrack)
app.use("/mysettings", mysettings)
app.use("/userhome", userhome)


app.get("/signout", (req, res) => {
    req.session.destroy(console.log('session destroyed'))
    res.render('index')
})

app.listen(port, () => console.log("app.js running on port: " + port));

