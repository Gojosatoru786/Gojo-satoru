const axios = require('axios');

module.exports = {
  config: {
    name: "advice",
    version: "1.0",
    author: "Cruizex",
    role: 0,
    category: "Utility",
    shortDescription: {
      en: "Get a random piece of advice.",
    },
    longDescription: {
      en: "Get a random piece of advice from the Advice Slip API.",
    },
    guide: {
      en: "{pn} advice",
    },
  },

  onStart: async function ({ message }) {
    try {
      const advice = await getRandomAdvice();
      message.reply(`Random Advice: "${advice}"`);
    } catch (error) {
      console.error("Error fetching advice:", error.message);
      message.reply("Sorry, there was an error while processing your request.");
    }
  },
};

async function getRandomAdvice() {
  try {
    const response = await axios.get('https://api.adviceslip.com/advice');
    const slip = response.data.slip;
    return slip.advice;
  } catch (error) {
    throw new Error(`Could not fetch random advice. Please try again later.`);
  }
}