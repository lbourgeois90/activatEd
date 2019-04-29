const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
var unirest = require('unirest');
const axios = require('axios');

router.get('/', (req, res) =>{
    axios(`http://jservice.io/api/random`)
    .then( (result) => {
        res.send(result.data[0])
    })
    .catch( (error) => {
        console.log(error);
        res.sendStatus(500);
    })
})


module.exports = router;
