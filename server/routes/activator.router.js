const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();
var moment = require('moment');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER GET ACTIVATORS')
    console.log('Req query is', req.query);
    let user_id = req.user.id;
    let class_id = req.query.class_id;
    let activatorDate = moment().format('YYYY-MM-DD');
    console.log(activatorDate);
    const sqlText = `SELECT "questions"."id", "questions"."class_id", "questions"."date", left("questions"."time_start"::text, 5) AS "time_start", left("questions"."time_end"::text, 5) AS "time_end", "questions"."question_type", "questions"."question" FROM "questions" WHERE "questions"."date" = $1 AND "questions"."class_id" = $2;`;
    pool.query(sqlText, 
        [ activatorDate, class_id]
    )
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows[0]);
    })
    .catch((error) =>{
        console.log(`Error getting activators!`, error);
        res.sendStatus(500);
    })
})


router.get('/mc', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER GET ACTIVATOR MC')
    console.log('Req query is', req.query);
    let question_id = req.query.question_id;
    console.log(question_id)
    const sqlText = `SELECT * FROM "multiple_choice_options" WHERE "multiple_choice_options"."questions_id" = $1`;
    pool.query(sqlText, 
        [ question_id]
    )
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows[0]);
    })
    .catch((error) =>{
        console.log(`Error getting activators!`, error);
        res.sendStatus(500);
    })
})






router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
  
    try {
       console.log(req.body);
       console.log(req.body.newActivator);
       const class_id = req.body.newActivator.class_id;
       const date = req.body.newActivator.date;
       const time_start = req.body.newActivator.time_start;
       const time_end = req.body.newActivator.time_end;
       const question_type = req.body.newActivator.question_type;
       const question = req.body.newActivator.question;
       const mc_a = req.body.multipleChoiceOptions.mc_a
       const mc_b = req.body.multipleChoiceOptions.mc_b
       const mc_c = req.body.multipleChoiceOptions.mc_c
       const mc_d = req.body.multipleChoiceOptions.mc_d

      questionsQuery= `INSERT INTO "questions" ("class_id", "date", "time_start", "time_end", "question_type", "question" ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`
      mcQuery = `INSERT INTO "multiple_choice_options" ("mc_a", "mc_b", "mc_c", "mc_d", "questions_id") VALUES ($1, $2, $3, $4, $5);`

      await client.query('BEGIN')
        const questionInsertResults = await client.query(questionsQuery, [class_id, date, time_start, time_end, question_type, question ]);
        const questionId = questionInsertResults.rows[0].id;
        console.log(questionId);
  
        if(mc_a !== ''){
            const insertMultipleChoice =  await client.query(mcQuery, [mc_a, mc_b, mc_c, mc_d, questionId]);
        }
        await client.query('COMMIT')
        res.sendStatus(201)
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST ACTIVATOR', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
  });



module.exports = router;
