// app.js - free-forever.net - khermstad 
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

// view settings
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// static public directory (for css/jss and other static files)
app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log("app.js running on port: " + port));

// routes
const index = require("./routes/index.js")
app.use("/", index)


app.get('/catalog', function (req, res) {
    res.render('catalog');
})
