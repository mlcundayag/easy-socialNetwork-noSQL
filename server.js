//import dependencies
const express = require('express');
const db = require('./config/connection');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use route
app.use(routes);

//server listener through mongoose
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
