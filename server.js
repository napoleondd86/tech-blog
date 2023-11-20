const path = require('path')
const express = require('express');
const app = express();
const session = require("express-session")
const routes = require('./controllers');
const sequelize = require("./config/connection")
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Handlebar standard 
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    // is this the standard
    maxAge: 1 * 24 * 60 * 60 * 1000, //expire after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// have session run
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Home Page route


app.use(routes);

const okToSync = (process.env.NODE_ENV === 'production') ? false : true;
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log('Now Listening'))
})