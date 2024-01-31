const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "ss",
    version: "5.2",
    author: "Siam",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Take a screenshot of a webpage.",
    },
    longDescription: {
      en: "This command takes a screenshot.",
    },
    category: "screenshot",
    guide: {
      en: "{prefix} 'url'\n{prefix} g- 'text'",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);

    if (args.length === 0) {
      message.reply(`Invalid input⚠️\nPlease use:\n${p}screenshot <url> \nor\n${p}screenshot -g <text>.`);
      return;
    }

    let url;
    if (args[0] === '-g') {
      if (args.length < 2) {
        message.reply(`Invalid text input after -g tag⚠️\nPlease use:\n${p}screenshot -g YourText`);
        return;
      }
      const query = args.slice(1).join('+');
      url = `https://www.google.com/search?q=${query}&tbm=isch`;
    } else {
      url = args[0];
      if (!url.match(/^https?:\/\/.+$/)) {
        url = `https://${url}`;
      }
    }

    const apiURL = `https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${url}`;

    try {
      const res = await fetch(apiURL);
      if (!res.ok) {
        message.reply(`API not responding. Please try again later.`);
        return;
      }

      const buffer = await res.buffer();
      const tag = Date.now();
      const filePath = `${tag}.jpg`;

      await fs.writeFile(filePath, buffer);

      message.reply({
        body: 'Here is the screenshot:',
        attachment: fs.createReadStream(filePath),
      }, () => fs.unlinkSync(filePath));
    } catch (err) {
      console.log(err);
      message.reply(`There was an error generating the screenshot for ${url}.`);
    }
  },
};