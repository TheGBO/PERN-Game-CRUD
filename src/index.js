const express = require('express');
const app = express();
require('dotenv').config();
const resutil = require('./utils/response');
const routes = require('./routes');
const cors = require('cors');

const port = process.env.PORT || 3200

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', async (req, res) => {
    res.json(resutil(true,{},"root"));
})

app.listen(port, () => {
    console.info(`Running at http://localhost:${port}`);
})