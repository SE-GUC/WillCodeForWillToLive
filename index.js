const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const external_entities=require('./routes/api/external_entities')

app.use('/api/ExternalEntity',external_entities)

app.get('/', (req, res) => { res.send('<h1>WillCodeToLive</h1>\n<h3>Index Page<h3>') })

app.use((req, res) => {
    res.status(404).send({ err: 'wrong route input' })
})

app.listen(port, () => console.log (`Listening on port ${port}`));