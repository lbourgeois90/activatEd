const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();


router.delete('/:id', (req,res) => {
    console.log('in SERVER STUDENT DELETE');
    let studentId = req.params.id;
    // console.log('ProjectId is,', studentId);
    const sqlText = `DELETE FROM "students" WHERE "id" = $1;`
    pool.query(sqlText, [studentId])
    .then( (result) => {
        res.sendStatus(201);
    })
    .catch( (error) => {
        console.log('ERROR in DELETE', error);
        res.sendStatus(500);
    })
})


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER STUDENT GET');
    console.log(req.user.id);
    let user_id = req.user.id;
    pool.query(`SELECT "students"."date_added", "students"."id", "students"."first_name", "students"."last_name", "students"."student_id", "classes"."class_period", 
                "students"."class_id","classes"."class_name", "students"."user_id" FROM "students" JOIN "classes" ON "classes"."id" = "students"."class_id" JOIN "teachers" 
                ON "teachers"."id" = "classes"."teacher_id" JOIN "user" ON "user"."id" = "teachers"."user_id" WHERE "teachers"."user_id" = ${user_id} 
                GROUP BY "students"."id", "students"."date_added", "students"."first_name", "students"."last_name", "classes"."class_period", 
                "classes"."class_name", "students"."user_id" ORDER BY "students"."date_added" DESC LIMIT 10;`)
    .then((result) => {
        // console.log(result.rows);
        res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`Error getting students!`, error);
        res.sendStatus(500);
    })
})

router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
  
    try {
    //    console.log(req.body);
      const username = req.body.username;
      const password = encryptLib.encryptPassword(req.body.password);
      const permissions = req.body.permissions;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const date_added = req.body.date_added;
      const class_id = req.body.class_id;
      const student_id = req.body.student_id;
    

      usernameQuery= `INSERT INTO "user" ("username", "password", "permissions") VALUES ($1, $2, $3) RETURNING id;`
      studentQuery = `INSERT INTO "students" ("date_added", "student_id", "first_name", "last_name", "user_id", "class_id") VALUES ($1, $2, $3, $4, $5, $6)`

      await client.query('BEGIN')
        const userInsertResults = await client.query(usernameQuery, [username, password, permissions]);
        const userId = userInsertResults.rows[0].id;
        console.log(userId);
  
        const insertStudentText =  await client.query(studentQuery, [date_added, student_id, first_name, last_name, userId, class_id]);
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST STUDENT', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
  });


  router.put('/:id', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
  
    try {
        console.log('in SERVER STUDENT PUT');
        let studentId = req.params.id;
        console.log('Student ID is', studentId);
        let updatedStudent = req.body;
        console.log(updatedStudent);
        console.log(updatedStudent.username);
        
        studentQuery = `UPDATE "students" SET "date_added" = $1, "student_id" = $2, "first_name" = $3, 
        "last_name" = $4, "class_id" = $5  WHERE "id" = $6;`;
        usernameQuery = `UPDATE "user" SET "username" = $1 WHERE "id" = $2; `
        
        
      await client.query('BEGIN')
        const updateStudentResult = await client.query(studentQuery,[updatedStudent.date_added, updatedStudent.username, updatedStudent.first_name, updatedStudent.last_name, updatedStudent.class_id, studentId] );
        const updateUsernameResult =  await client.query(usernameQuery, [updatedStudent.username, updatedStudent.userId]);
        console.log('UpdatedUsernameResult is:', updateUsernameResult);
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error UPDATE STUDENT', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
  });



// router.put('/:id', (req, res) => {
//     console.log('in SERVER STUDENT PUT');
//     let studentId = req.params.id;
//     console.log('Student ID is', studentId);
//     let updatedStudent = req.body;
//     console.log(updatedStudent);
//     let sqlText = `UPDATE "students" SET "date_added" = $1, "student_id" = $2, "first_name" = $3, 
//     "last_name" = $4, "class_id" = $5  WHERE "id" = $6;`;
//     pool.query(sqlText, [updatedStudent.date_added, updatedStudent.username, updatedStudent.first_name, updatedStudent.last_name, updatedStudent.class_id, studentId])
// .then( (result) => {
//     let usernameQuery = `UPDATE "user" SET "username" = $1 WHERE "id" = $2; `
//     pool.query(usernameQuery, [updatedStudent.username, updatedStudent.user_id]);
//     res.sendStatus(200);
// }).catch( (error) => {
//     console.log('Failed to update gallery item likes', error);
//     res.sendStatus(500);
// })
// })

  
  
  
  





module.exports = router;
