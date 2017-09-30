// app.js - free-forever.net - khermstad 
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();

// view settings
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// static public directory (for css/jss and other static files)
app.use('/public', express.static(path.join(__dirname, 'public')))

// route imports
const index = require("./routes/index.js")
const catalog = require("./routes/catalog.js")
const artists = require("./routes/artists.js")

// routes
app.use("/", index)
app.use("/catalog", catalog)
app.use("/artists", artists)

const port = 3000;
app.listen(port, () => console.log("app.js running on port: " + port));

