const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error destroying session:", error);
            res.status(500).send("Error logging out");
        } else {
            res.send("Logged out successfully");
        }
    });
});

module.exports = router;
