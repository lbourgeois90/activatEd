const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();



router.post('/', async (req, res) => {
    const client = await pool.connect();
  
    try {
       console.log(req.body);
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
  
  
  
  






// router.post('/', (req, res, next) => {  
//   const username = req.body.username;
//   const password = encryptLib.encryptPassword(req.body.password);
//   const permissions = req.body.permissions;
//   console.log('here', username);
  

//   const queryText = 'INSERT INTO "user" (username, password, permissions) VALUES ($1, $2, $3) RETURNING id';
//   pool.query(queryText, [username, password, permissions])
//   .then((result) => {
//     console.log(id);
// })
//     .catch(() => res.sendStatus(500));
// });

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
// router.post('/login', userStrategy.authenticate('local'), (req, res) => {
//   res.sendStatus(200);
// });

// clear all server session information about this user
// router.post('/logout', (req, res) => {
//   // Use passport's built-in method to log out the user
//   req.logout();
//   res.sendStatus(200);
// });

module.exports = router;
