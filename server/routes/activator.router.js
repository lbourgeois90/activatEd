const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER GET ACTIVATORS')
  
    // let user_id = req.user.id;
    // pool.query(`SELECT "classes"."id" AS "class_id", "classes"."class_name", "classes"."class_period", "classes"."teacher_id" FROM "classes" JOIN "teachers" ON "teachers"."id" = "classes"."teacher_id" JOIN "user" on "user"."id" = "teachers"."user_id" WHERE "user"."id" = ${user_id} ORDER BY "classes"."class_period" ASC;`)
    .then((result) => {
        // console.log(result.rows);
    //     res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`Error getting teachers!`, error);
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
