// app.js - free-forever.net - khermstad 
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

// route imports
const index = require("./routes/index.js")
const catalog = require("./routes/catalog.js")
const artists = require("./routes/artists.js")

// port settings
const port = 3000;

// view settings
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// static public directory (for css/jss and other static files)
app.use('/public', express.static(path.join(__dirname, 'public')))

// routes
app.use("/", index)
app.use("/catalog", catalog)
app.use("/artists", artists)

app.listen(port, () => console.log("app.js running on port: " + port));

