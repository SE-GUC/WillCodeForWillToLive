const express = require('express');
const app = express();
app.use(express.json());

const cases = require('./routes/api/cases');

app.get('/',(req,res)=>{
    res.send(`Welcome </br>
    <a href="/api/cases">Cases</a>`);
})
app.use('/api/cases',cases);

app.use((req,res)=>{
    res.status(404).send({err: 'We can not find what you are looking for'});
})



const port = 3000;
app.listen(port,()=>{
    console.log('Listening on port 3000....');
})