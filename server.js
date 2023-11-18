const express = require('express');
const path = require('path')
const app = express();
const routes = require('./routes');
const sequelize = require("./config/connection")

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Home Page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.use("*", routes);

const okToSync = (process.env.NODE_ENV === 'production') ? false : true;
sequelize.sync({force: okToSync}).then(() => {
  app.listen(PORT, () => console.log('Now Listening'))
})