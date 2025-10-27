module.exports.config = {
	name: "load",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "reload config file data",
	commandCategory: "Admin",
	usages: "[]",
	cooldowns: 30
};
module.exports.run = async function({ api, event, args,Threads, Users }) {
delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("[𝗢𝗸 𝗔𝘆𝗲𝘀𝗵𝗮 𝗤𝘂𝗲𝗲𝗻] Reloaded all ✅...", event.threadID, event.messageID);    
} 
