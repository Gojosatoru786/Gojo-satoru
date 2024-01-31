const axios = require('axios');

module.exports = {
  config: {
    name: "phone",
    version: "1.0",
    author: "Subash",
    countDown: 1,
    role: 0,
    shortDescription: "Ph. number info",
    longDescription: "Ph. number info",
    category: "General",
    guide: "{pn} <number>",
  },

  onStart: async function ({ api, args, event }) {
    const apiKey = "Sqhf/Iy0PmjmklQNnCjFyg==QUfLuwFxhSh3aJSm";
    const number = args[0];

    if (!number) {
      return api.sendMessage("Please provide a phone number.", event.threadID, event.messageID);
    }

    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${number}`, {
        headers: { 'X-Api-Key': apiKey },
      });

      const formattedResponse = `Phone Number Information:
        - Valid: ${response.data.is_valid ? 'Yes' : 'No'}
        - Formatted Properly: ${response.data.is_formatted_properly ? 'Yes' : 'No'}
        - Country: ${response.data.country}
        - Location: ${response.data.location}
        - Timezones: ${response.data.timezones.join(', ')}
        - Format National: ${response.data.format_national}
        - Format International: ${response.data.format_international}
        - Format E164: ${response.data.format_e164}
        - Country Code: ${response.data.country_code}`;

      api.sendMessage(formattedResponse, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
    }
  },
};