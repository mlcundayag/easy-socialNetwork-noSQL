//import dependencies
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//use route
app.use(routes);

//server listener through mongoose
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
