const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER STUDENT CLASSES GET');
    console.log(req.user.id);
    let user_id = req.user.id;
    pool.query(`SELECT "classes"."class_name", "classes"."class_period", "classes"."id" FROM "classes" JOIN "students" ON "students"."class_id" = "classes"."id" JOIN "user" ON "user"."id" = "students"."user_id" WHERE "user"."id" = ${user_id}`)
    .then((result) => {
        console.log('Result is:', result.rows);
        res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`Error getting student classes!`, error);
        res.sendStatus(500);
    })
})


module.exports = router;