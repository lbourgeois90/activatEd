const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
var unirest = require('unirest');
const axios = require('axios');

router.get('/', (req, res) =>{
    axios(`http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`)
    .then( (result) => {
        console.log(result);
        res.send(result.data)
    })
    .catch( (error) => {
        console.log(error);
        res.sendStatus(500);
    })
})


module.exports = router;