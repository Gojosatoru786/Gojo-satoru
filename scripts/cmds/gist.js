const axios = require('axios');

module.exports = {

  config: {

    name: "gist",

    version: "1.0",

    author: "Cruizex",

    description: "Interact with GitHub Gist API to create gists.",

  },

  async createGist(apiGistCode, apiGistPrivate = false, apiGistDescription = 'Untitled') {

    try {

      const response = await axios.post(

        'https://api.github.com/gists',

        {

          description: apiGistDescription,

          public: !apiGistPrivate,

          files: {

            'gistfile.txt': {

              content: apiGistCode,

            },

          },

        },

        {

          headers: {

            'Authorization': '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', // Replace with your GitHub token

            'Content-Type': 'application/json',

          },

        }

      );

      const rawUrl = Object.values(response.data.files)[0].raw_url;

      return rawUrl; // Return the Gist raw content URL

    } catch (error) {

      console.error("Error creating Gist:", error.message);

      throw error;

    }

  },

  async handleCommand({ message, event, args }) {

    const userInput = event.messageReply ? event.messageReply.body : args.join(" ");

    try {

      const rawUrl = await this.createGist(userInput);

      message.reply(`Gist created successfully. Raw Content URL: ${rawUrl}`);

    } catch (error) {

      console.error("Error handling command:", error.message);

      message.reply("An error occurred while creating the Gist.");

    }

  },

  onStart: function (params) {

    return this.handleCommand(params);

  },

  onReply: function (params) {

    return this.handleCommand(params);

  },

};