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

  const axiosResponse = await axios.request(options);
  const grammarbotResponse = axiosResponse.data;

  const { matches } = grammarbotResponse;

  // Filter all spelling mistakes from speech to text API
  const filteredMatches = matches.filter((match) => match.shortMessage !== 'Spelling mistake');

  const corrections = filteredMatches.map((match) => {
    const {
      message, replacements, offset, length, sentence,
    } = match;
    return {
      status: 'success',
      message,
      replacements,
      offset,
      length,
      sentence,
    };
  });

  return corrections.length ? corrections : [];
};

module.exports = {
  getCorrections,
};
