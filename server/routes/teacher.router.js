const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER TEACHER GET');
    console.log(req.user.id);
    let user_id = req.user.id;
    pool.query(`SELECT "teachers"."id", "teachers"."first_name", "teachers"."school_district" FROM "teachers" JOIN "user" ON "user"."id" = "teachers"."user_id" WHERE "teachers"."user_id" = ${user_id} GROUP BY "teachers"."id", "teachers"."first_name";`)
    .then((result) => {
        res.send(result.rows[0]);
    })
    .catch((error) =>{
        console.log(`Error getting teachers!`, error);
        res.sendStatus(500);
    })
})


module.exports = router;