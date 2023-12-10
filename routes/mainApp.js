let express = require('express');
let router = express.Router();
let userId = null;
/* GET login page. */
router.post('/', async (req, res) => {
    userId = req.session.userId;
    console.log(userId);

    const connection = req.db;
    const { action } = req.body;
    console.log("action is " + action);
    switch (action) {
        case 'fetch_quotes':
            try {
                await fetch_quotes(req, res, connection);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching quotes' });
            }
            break;
        case 'submit_task':
            try {
                await submit_task(req, res, connection, userId);
            } catch (error) {
                res.status(500).json({ error: 'Error submitting task' });
            }
            break;
        case 'fetch_all_active_tasks':
            try {
                await fetch_active_tasks(req, res, connection, userId);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching active tasks' });
            }
            break;
        case 'update_tasks':
            try {
                await update_task(req, res, connection, userId);
            } catch (error) {
                res.status(500).json({ error: 'Error updating tasks' });
            }
            break;
        case 'delete_task':
            try {
                await delete_task(req, res, connection, userId);
            } catch (error) {
                res.status(500).json({ error: 'Error updating tasks' });
            }
            break;
        case 'completed_tasks':
            try {
                await completed_tasks(req, res, connection, userId);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching completed tasks' });
            }
            break;
        default:
            res.status(400).json({ error: 'Invalid action' });
    }
});

async function fetch_quotes(req, res, connection) {
    const query = 'SELECT * FROM dailyhub.dailyhub_quotes;';
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching quotes' });
            return;
        }
        res.json(results);
    });
}

async function submit_task(req, res, connection, userId) {
    const { task_name } = req.body.data;
    const query = 'INSERT INTO dailyhub.tasks (task_name,user_id) VALUES(?,?)';
    connection.query(query, [task_name, userId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error inserting task' });
            return;
        }
        res.status(200).json({ success: true, message: 'task data inserted successfully' });
    });
}

async function fetch_active_tasks(req, res, connection, userId) {
    const query = 'SELECT * FROM dailyhub.tasks WHERE (due_date is NULL OR due_date > CURDATE()) AND user_id = ?;';
    connection.query(query, [userId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching tasks' });
            return;
        }
        res.json(results);
    });
}

async function update_task(req, res, connection, userId) {
    const task_desc = req.body.data.task_desc;
    console.log(task_desc)
    const task_due_date = req.body.data.task_due_date;
    console.log(task_due_date)
    const task_id = req.body.data.task_id;
    console.log(task_id);

    const query = 'UPDATE dailyhub.tasks SET description = ?, due_date = ? WHERE task_id = ? and user_id = ?';
    const queryParams = [task_desc, task_due_date, task_id, userId];
    console.log(userId);
    connection.query(query, queryParams, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error updating tasks' });
            return;
        }
        res.json(results);
    });
}

async function delete_task(req, res, connection, userId) {
    const task_id = req.body.data;
    console.log("task id is " + task_id);
    const query = 'DELETE from dailyhub.tasks WHERE task_id = ? AND user_id = ?';
    const queryParams = [task_id, userId];

    connection.query(query, queryParams, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error deleting tasks' });
            return;
        }
        res.json(results);
    });
}

async function completed_tasks(req, res, connection, userId) {
    const query = 'SELECT * FROM dailyhub.tasks where due_date < CURDATE() AND user_id = ?;';
    connection.query(query, [userId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching completed tasks' });
            return;
        }
        res.json(results);
    });
}

module.exports = router;
