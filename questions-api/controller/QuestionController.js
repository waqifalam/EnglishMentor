const client = require('../lib/RedisClient');
const Logger = require('../lib/Logger');

const defaultQuestion = {
  id: 1,
  text: '',
};

const getQuestionController = (callback) => {
  client.sendCommand('SRANDMEMBER', [process.env.QUESTIONS_SET, '1'], (err, data) => {
    if (err || !data.length) callback(null, defaultQuestion);
    try {
      const question = {
        ...defaultQuestion,
        ...JSON.parse(data.pop()),
      };

      callback(null, question);
    } catch (e) {
      Logger.error(`Error getting question from Redis: ${e.message}`);
      callback(null, defaultQuestion);
    }
  });
};

module.exports = {
  getQuestionController,
};
