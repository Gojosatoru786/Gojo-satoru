const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "mms",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 1,
    role: 0,
    shortDescription: "MMS Image!",
    longDescription: "",
    category: "fun",
    guide: ".ai [mention|leave_blank]",
    envConfig: {
      deltaNext: 5
    }
  },
  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: "You must tag the person you want to "
    }
  },
  onStart: async function ({ event, message, usersData, args, getLang }) {
    const permission = ["100082247235177"];
    if (!Array.isArray(permission) || !permission.includes(event.senderID)) {
      api.sendMessage("You don't have enough permission to use this command. Only My Authors Have Access.", event.threadID, event.messageID);
      return;
    }

    let mention = Object.keys(event.mentions);
    let uid;

    if (event.type == "message_reply") {
      uid = event.messageReply.senderID;
    } else {
      if (mention[0]) {
        uid = mention[0];
      } else {
        console.log(" jsjsj");
        uid = event.senderID;
      }
    }

    let url = await usersData.getAvatarUrl(uid);
    let avt = await new DIG.Mms().getImage(url);
    const pathSave = `${__dirname}/tmp/mms.png`;

    fs.writeFileSync(pathSave, Buffer.from(avt));

    // Send the image as a reply to the command message
    message.reply(
      {
        attachment: fs.createReadStream(pathSave)
      },
      () => fs.unlinkSync(pathSave)
    );
  }
};