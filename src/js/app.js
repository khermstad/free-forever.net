// app.js - free-forever.net - khermstad 
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const parser = require('body-parser');
const Sequelize = require('sequelize')


// route imports
const index = require("./routes/index.js");
const catalog = require("./routes/catalog.js");
const artists = require("./routes/artists.js");
const register = require("./routes/register.js");
const login = require("./routes/login.js");

// port settings
const port = 5000;

// database connection
const db_config = require('../../db-config')
const sequelize = new Sequelize(db_config.dbname, db_config.username, db_config.password, {
    host: db_config.host,
    dialect: db_config.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    operatorsAliases: false
})

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

app.listen(port, () => console.log("app.js running on port: " + port));

module.exports = sequelize;