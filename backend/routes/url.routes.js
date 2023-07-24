const shortid = require('shortid');
const { Router } = require("express");
const { redisClient } = require('../helpers/redis');

const urlRouter = Router();

urlRouter.post('/', async(req, res)=>{
    try{
        const shortId = shortid();
        const {url, hrs} = req.body;
        if(!url) return res.status(400).send({msg: 'URL is required'});
        if(!hrs){
            console.log(shortId, url);
            await redisClient.set(shortId, url, 'EX', 60*60*7);
            return res.status(400).send({url: `http://localhost:8998/${shortId}`, msg: 'This url will work only for 7 hours'})
        }
        await redisClient.set(shortId, url, 'EX', 60*60*hrs);
        return res.json({url: `http://localhost:8998/${shortId}`, msg: `This url is only available for next ${hrs} hours`});
    }catch(err){
        console.log(err);
        res.status(500).send({msg: err.message});
    }
})


module.exports = urlRouter;