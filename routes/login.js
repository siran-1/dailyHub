const express = require('express');
const router = express.Router();
const connection = require('../db/dbConnection');

function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

router.get('/', (req, res) => {
  console.log("this is app route"+req.session.username);
  if (req.session && req.session.userId) {
    res.render('index', { title: 'DailyHubApp', username: req.session.username });
  }
  else{
    res.redirect('/');
  }
});

router.post('/existingUser', async function(req, res,next) {
  const { uid } = req.body;
  const query = 'SELECT user_name from dailyhub.users where user_id = ?';

  const values = [uid];
  const result = await queryDatabase(query, values);
  console.log(result);
  res.json(result);  
});

router.post('/newuser', async function(req, res,next) {
    const { firebase_uid, username, email } = req.body;
    const query = 'INSERT INTO dailyhub.users(user_id, user_name, user_email) VALUES (?, ?, ?);';
    console.log(firebase_uid, username, email);

    const values = [firebase_uid, username, email];
    const result = await queryDatabase(query, values);
    console.log(result);
    res.json(result);  
});

module.exports = router;
