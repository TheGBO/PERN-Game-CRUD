const express = require('express');
const router = express.Router();
const resutil = require('./utils/response');
const pool = require('./config/db');

//C
router.post('/game', async (req, res) => {
    try {
        const data = await pool.query(`INSERT INTO games(title, category) VALUES($1, $2) RETURNING *`,[
            req.body.title,
            req.body.category
        ]);
        res.json(resutil(true, data.rows[0], "game inserted successfully"));
    } catch (error) {
        res.json(resutil(false, data, "something went wrong registrating the game"));
    }
});
//R
router.get('/game', async (req, res) => {
    try {
        const data = await pool.query(`SELECT * FROM games`);
        res.json(resutil(true, data.rows, "games retrieved successfully"));
    } catch (error) {
        res.json(resutil(false, data, "something went wrong requesting the game"));
    }
});
//U
router.put('/game/:id', async (req, res) => {
    try {
        const data = await pool.query(`UPDATE games SET title=$1, category=$2 WHERE id=$3`,[
            req.body.title,
            req.body.category,
            req.params.id
        ]);
        res.json(resutil(true, data.rows[0], "game updated successfully"));
    } catch (error) {
        res.json(resutil(false, data, "something went wrong updating the game"));
    }
});
//D
router.delete('/game/:id', async (req, res) => {
    try {
        const data = await pool.query(`DELETE FROM games WHERE id = $1`, [req.params.id]);
        res.json(resutil(true, data.rows[0], "game deleted successfully"));
    } catch (error) {
        res.json(resutil(false, data, "something went wrong deleting the game"));
    }
});

module.exports = router;