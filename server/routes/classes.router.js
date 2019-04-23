const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    const newClass = req.body;
    console.log(newClass);
    const sqlText = `INSERT INTO "classes" ("class_name", "class_period", "teacher_id") VALUES ($1, $2, $3);`;

    // pool.query(sqlText, 
    //     [ newClass.class_name, newClass.class_period, newClass.teacher_id]
    // )
    //     .then((result) => {
    //         res.sendStatus(201);
    //     })
    //     .catch((error) => {
    //         console.log(`ERROR in PROFILE POST`, error);
    //         res.sendStatus(500);
    //     });
});


module.exports = router;