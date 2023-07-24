const express = require('express');
const urlRouter = require('./routes/url.routes');
const { redisClient } = require('./helpers/redis');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/url', urlRouter);

app.get('/:shortId', async (req, res) => {
    try{
        const shortId = req.params.shortId;
        let url = await redisClient.get(`${shortId}`);
        res.redirect(url);
    }catch(err){
        console.log(err.message);
        res.status(500).send({msg: err.message});
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})