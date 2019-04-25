const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
var moment = require('moment');



router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER GET ACTIVATORS');
   
    let user_id = req.user.id;
    let class_id = req.query.class_id;
    let activatorDate = "'" + req.query.date + "'";
    // let activatorDate = moment(req.query.date).toDate();
    // activatorDate = moment(req.query.date).format("YYYY-MM-DD");
    console.log(activatorDate);
    pool.query(`SELECT "student_answers"."date", "students"."first_name", "students"."last_name", "questions"."question", "student_answers"."answer", "student_answers"."id" FROM "student_answers" JOIN "students" ON "student_answers"."students_id" = "students"."id" JOIN "questions" ON "questions"."id" = "student_answers"."questions_id" JOIN "user" ON "user"."id" = "students"."user_id" WHERE "student_answers"."date" =  ${activatorDate} AND "questions"."class_id" = ${class_id} ;`)
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`Error getting answers!`, error);
        res.sendStatus(500);
    })
})




module.exports = router;