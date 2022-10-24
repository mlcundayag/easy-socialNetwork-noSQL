//import express and api routes
const router = require('express').Router();
const apiRoutes = require('./api');

//localhost:3001/api
router.use('/api', apiRoutes);

//return message if url incomplete without api routes
router.use((req, res) => {
    res.send('Incomplete query... Please check your url parameters')
})

module.exports = router