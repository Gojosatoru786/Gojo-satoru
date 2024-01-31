const fs = require('fs');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "approval",
    version: "1.0",
    author: "OtinXSandip",
    shortDescription: {
      en: "approval",
    },
    longDescription: {
      en: "approval",
    },
    category: "owner"
  },
  onStart: async function ({ api, event, threadsData, message }) {
    const uid = "100092010460002";

    const groupId = event.threadID;
    const threadData = await threadsData.get(groupId);
    const name = threadData.threadName;

    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync('approve.json'));
    } catch (err) {
      console.error('', err);
    } 

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await message.send({
        body: `🚫 | You added the bot without permission!\\🌸  Admin:m.me/100092010460002  \n🆔 | ID: ${groupId}\Name: ${name}`,
        attachment: await getStreamFromURL("https://i.imgur.com/1Ute8oU.jpg")
      });
    }

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      await api.sendMessage(
        `✅ | This group needs approval\🆔TID: ${groupId}\TName: ${name}\\• Approve when you see..`,
        uid,
        async () => {
          await api.removeUserFromGroup(api.getCurrentUserID(), groupId);
        }
      );
    }
  }
};