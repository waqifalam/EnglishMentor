const redis = require('redis');

const client = redis.createClient(process.env.REDIS_CONFIG);

module.exports = client;
