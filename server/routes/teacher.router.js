const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('in SERVER TEACHER GET');
    pool.query(`SELECT "teachers"."id", "teachers"."first_name" FROM "teachers";`)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`Error getting teachers!`, error);
        res.sendStatus(500);
    })
})


module.exports = router;