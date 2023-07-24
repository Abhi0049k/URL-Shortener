const redis = require('ioredis');
require('dotenv').config();

const redisClient = new redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: 'default'
});

redisClient.on('connect', async () => {
  console.log('Connected to Redis');
});

redisClient.on('error', async (err) => {
  console.error('Redis Error:', err.message);
});

module.exports = {
    redisClient
}