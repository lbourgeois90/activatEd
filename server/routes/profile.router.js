const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    const newProfile = req.body;
    const user_id = req.user.id;
    console.log(newProfile);
    console.log(user_id);
    const sqlText = `INSERT INTO "teachers" ("first_name", "last_name", "email", "school_district", "user_id") VALUES ($1, $2, $3, $4, $5);`;

    pool.query(sqlText, 
        [ newProfile.first_name, newProfile.last_name, newProfile.email, newProfile.school_district, user_id]
    )
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in PROFILE POST`, error);
            res.sendStatus(500);
        });
});



module.exports = router;