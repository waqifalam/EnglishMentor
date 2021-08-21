const axios = require('axios').default;

const {
  GRAMMARBOT_URI,
  GRAMMARBOT_HOST,
  GRAMMARBOT_KEY,
} = process.env;

const defaultOptions = {
  method: 'POST',
  url: GRAMMARBOT_URI,
  params: { text: 'Susan go to the market yesterday. I goes to feel bad' },
  headers: {
    'x-rapidapi-host': GRAMMARBOT_HOST,
    'x-rapidapi-key': GRAMMARBOT_KEY,
  },
};

const getCorrections = async (text) => {
  const options = {
    ...defaultOptions,
    params: { text },
  };

  const response = await axios.request(options);
  return response.data;
};

module.exports = {
  getCorrections,
};
