const { redisClient } = require('../helpers/redis');
const shortid = require('shortid');

const urlshortener = async(req, res)=>{
    try{
        const shortId = shortid();
        const {url, hrs} = req.body;
        if(!url) return res.status(400).send({msg: 'URL is required'});
        if(!hrs){
            console.log(shortId, url);
            await redisClient.set(shortId, url, 'EX', 60*60*7);
            return res.status(400).send({url: `https://hungry-tuxedo-duck.cyclic.app/${shortId}`, msg: 'This url will work only for 7 hours'})
        }
        await redisClient.set(shortId, url, 'EX', 60*60*hrs);
        return res.json({url: `https://hungry-tuxedo-duck.cyclic.app/${shortId}`, msg: `This url is only available for next ${hrs} hours`});
    }catch(err){
        console.log(err);
        res.status(500).send({msg: err.message});
    }
}

const shortenedURL = async (req, res) => {
    try{
        const shortId = req.params.shortId;
        let url = await redisClient.get(`${shortId}`);
        res.redirect(url);
    }catch(err){
        console.log(err.message);
        res.status(500).send({msg: err.message});
    }
}

module.exports = {
    urlshortener, shortenedURL
}
