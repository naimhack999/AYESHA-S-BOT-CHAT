const fs = require("fs");
module.exports.config = {
	name: "gali",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "abal",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Ayesha Bokacoda")==0 || event.body.indexOf("ayesha mc")==0 || event.body.indexOf("chod")==0 || event.body.indexOf("ayesha notir pola")==0 || event.body.indexOf("bc")==0 || event.body.indexOf("ayesha re cudi")==0 || event.body.indexOf("ayesha re chod")==0 || event.body.indexOf("ayesha Abal")==0 || event.body.indexOf("ayesha Boakachoda")==0 || event.body.indexOf("ayesha madarchod")==0 || event.body.indexOf("ayesha re chudi")==0 || event.body.indexOf("ayesha Bokachoda")==0) {
		var msg = {
				body: "তোর মতো বোকাচোদা রে আমার মেডাম চু*দা বাদ দিছে🤣\nমেডাম 𝗔𝘆𝗲𝘀𝗵𝗮 𝗤𝘂𝗲𝗲𝗻 এখন আর hetars চু*দা না🥱😈",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
