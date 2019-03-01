const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const external_entities=require('./routes/api/external_entities')

app.use('/api/ExternalEntity',external_entities)


app.get('/', (req, res)=> {
    res.send('Home page');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log (`Listening on port ${port}`));