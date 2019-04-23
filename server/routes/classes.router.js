const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    const newClass = req.body;
    console.log(newClass);
    const sqlText = `INSERT INTO "classes" ("class_name", "class_period", "teacher_id") VALUES ($1, $2, $3);`;

    pool.query(sqlText, 
        [ newClass.class_name, newClass.class_period, newClass.teacher_id]
    )
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in PROFILE POST`, error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    console.log('in SERVER CLASSES GET');
    console.log(req.user.id);
    let user_id = req.user.id;
    pool.query(`SELECT "classes"."id" AS "class_id", "classes"."class_name", "classes"."class_period", "classes"."teacher_id" FROM "classes" JOIN "teachers" ON "teachers"."id" = "classes"."teacher_id" JOIN "user" on "user"."id" = "teachers"."user_id" WHERE "user"."id" = ${user_id};`)
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`Error getting teachers!`, error);
        res.sendStatus(500);
    })
})



module.exports = router;