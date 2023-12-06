const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    try {
        req.session.username = req.body.username;
        req.session.userId = req.body.uid; 
        console.log("Session username set: " + req.session.username);
        res.send('Username set in session');
    } catch (error) {
        console.error('Error setting username in session:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
