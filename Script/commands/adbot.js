module.exports.config = {
    name: "ckbot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐒𝐇𝐀𝐇𝐀𝐃𝐀𝐓 𝐒𝐀𝐇𝐔",
    description: "DESCRIPTION ABOUT BOT",
    commandCategory: "Media",
    usages: "",
    cooldowns: 4,
    dependencies: {
        "request": "",
        "fs": ""
    }
};

module.exports.run = async ({ api, event, args }) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    if (args.length == 0) {
        return api.sendMessage(
            `You can use:\n\n${prefix}${this.config.name} user => get your own info.\n${prefix}${this.config.name} user @[Tag] => get tagged user's info.\n${prefix}${this.config.name} box => get box info.\n${prefix}${this.config.name} admin => get bot admin's info.`,
            event.threadID,
            event.messageID
        );
    }

    // ===== Box Info =====
    if (args[0] == "box") {
        let targetThreadID = args[1] ? args[1] : event.threadID;
        let threadInfo = await api.getThreadInfo(targetThreadID);
        let img = threadInfo.imageSrc;
        let male = threadInfo.userInfo.filter(u => u.gender === "MALE").length;
        let female = threadInfo.userInfo.filter(u => u.gender === "FEMALE").length;
        let approval = threadInfo.approvalMode ? "Turn on" : "Turn off";

        let msg = `Group name: ${threadInfo.threadName}\nTID: ${targetThreadID}\nApproved: ${approval}\nEmoji: ${threadInfo.emoji}\nInformation:\n» ${threadInfo.participantIDs.length} members and ${threadInfo.adminIDs.length} admins.\n» ${male} male and ${female} female.\n» Total messages: ${threadInfo.messageCount}.`;

        if (!img) return api.sendMessage(msg, event.threadID, event.messageID);

        let callback = () => api.sendMessage(
            { body: msg, attachment: fs.createReadStream(__dirname + "/cache/1.png") },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/1.png"),
            event.messageID
        );

        return request(encodeURI(img)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
    }

    // ===== Admin Info =====
    if (args[0] == "admin") {
        let callback = () => api.sendMessage(
            {
                body: `———»ADMIN BOT«———\n❯ Name: 𝗔𝘆𝗲𝘀𝗵𝗮 𝗤𝘂𝗲𝗲𝗻\n❯ Facebook: https://facebook.com/61578414567795\n❯ Thanks for using ${global.config.BOTNAME} bot`,
                attachment: fs.createReadStream(__dirname + "/cache/1.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/1.png")
        );

        return request(encodeURI(`https://scontent.fjsr8-1.fna.fbcdn.net/v/t39.30808-1/520874589_122096480516947152_3798330020591247240_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=111&ccb=1-7&_nc_sid=79bf43&_nc_ohc=Wty96njhJ-0Q7kNvwELVXvy&_nc_oc=Adl1_0Pgh5mwchf8i14DygR-UGIBm02tT0sEhbRBNx-BhIgLIPeVbbPb1W475FZ8nHM&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent.fjsr8-1.fna&oh=00_AfdcX6IcrIwFicHdoSqo2P_MF7DJGejh9AwKLPKeyJLIOg&oe=69050F89`))
            .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
            .on('close', () => callback());
    }

    // ===== User Info =====
    if (args[0] == "user") {
        let id;
        if (!args[1]) {
            id = event.type == "message_reply" ? event.messageReply.senderID : event.senderID;
        } else if (Object.keys(event.mentions).length > 0) {
            id = Object.keys(event.mentions)[0];
        } else {
            id = args[1];
        }

        let data = await api.getUserInfo(id);
        let username = data[id].vanity;
        let profileUrl = username ? `https://facebook.com/${username}` : `https://facebook.com/profile.php?id=${id}`;
        let isFriend = data[id].isFriend ? "Yes" : "No";
        let name = data[id].name;
        let gender = data[id].gender == 2 ? "Male" : data[id].gender == 1 ? "Female" : "Not specified";

        let callback = () => api.sendMessage(
            {
                body: `Name: ${name}\nProfile URL: ${profileUrl}\nUID: ${id}\nGender: ${gender}\nFriend with bot: ${isFriend}`,
                attachment: fs.createReadStream(__dirname + "/cache/1.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/1.png"),
            event.messageID
        );

        return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
            .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
            .on('close', () => callback());
    }
};
