"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Lukap is online.'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// Import
const Discord = require("discord.js");
const uniqueRandomArray = require("unique-random-array");
const config = require("./config.json");
const db = require('quick.db');

const myintents = new Discord.Intents();
myintents.add(['GUILDS','GUILD_MEMBERS','GUILD_BANS','GUILD_EMOJIS','GUILD_INTEGRATIONS','GUILD_WEBHOOKS','GUILD_INVITES','GUILD_VOICE_STATES','GUILD_PRESENCES','GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS','GUILD_MESSAGE_TYPING','DIRECT_MESSAGES','DIRECT_MESSAGE_REACTIONS','DIRECT_MESSAGE_TYPING']);

// Create an instance of a Discord client
const client = new Discord.Client({ ws: { intents: myintents } });

// File System
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  client.commands.set(command.name, command);
}


// Colors
const redcolors = uniqueRandomArray([`#F24848`, `#F35757`, `#ED4141`, `#D42E2E`]);
const greencolors = uniqueRandomArray([`#90D690`, `#89E390`, `#74CC7B`, `#499E50`]);

// Config
const p = config.prefix;
const o = config.owner;

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

client.on("ready", () => {
	console.log(`${config.botname} has started, with ${client.users.cache.size} members, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);

	const types = uniqueRandomArray(['WATCHING', 'LISTENING', 'PLAYING', 'PLAYING', 'WATCHING']);
	const status = uniqueRandomArray(['idle', 'dnd', 'idle']);
	const bdaw = uniqueRandomArray([`Serving ${client.users.cache.size} users.`, `Researching about search engines...`, `Giving information to ${client.users.cache.size} users.`, `Moderating ${client.guilds.cache.size} servers.`, `Random Numbers: 321881`, `Random Numbers: 312107`, `Random Numbers: 313475`, `Random Numbers: 333308`, `Random Numbers: 304671`, `Random Numbers: 160556`, `Random Numbers: 100094`, `Random Numbers: 308989`, `Random Numbers: 328105`, `Random Numbers: 321087`, `Random Numbers: 329224`, `Random Numbers: 258762`, `Random Numbers: 263247`, `Random Numbers: 258827`, `Random Numbers: 259827`, `Random Numbers: 253687`, `Random Numbers: 266402`, `Random Numbers: 245994`, `Random Numbers: 259827`, `Random Numbers: 203371`, `Random Numbers: 142490`])
	setInterval(() => {
		//client.user.setStatus(status);
		client.user.setActivity(` ${p}help | `+bdaw(), { type: types() });
	}, 100000);
});

client.on("guildCreate", async guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

	const yes = client.emojis.cache.get(`752066559786090518`);
	const no = client.emojis.cache.get(`752066560943718493`);

	const errormsg = new Discord.MessageEmbed()
	.setColor(redcolors())

    guild.channels.cache.filter(x => x.type != "category").random().createInvite({maxUses: 0, maxAge:0}).then(inv => console.log(`${guild.name} | ${inv.url}`));
    
    if ((guild.members.cache.filter(m=> !m.user.bot).size < guild.members.cache.filter(m=> m.user.bot === true).size) && (guild.members.cache.filter(m=> !m.user.bot).size < 5)) {
    	guild.owner.send(errormsg.setDescription(`${no} The following requirement/s aren't complete for me to join:\n• **Atleast 5 or more human members**\n• **More humans than bots**\n\nRead the light requirements [here](https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started#-requirements).`));
    	guild.channels.cache.filter(x => x.type != "category").random().send(errormsg.setDescription(`${no} The following requirement/s aren't complete for me to join:\n• **Atleast 5 or more human members**\n• **More humans than bots**\n\nRead the light requirements [here](https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started#-requirements).`));
    	await guild.leave();
    }
    else if((guild.members.cache.filter(m=> !m.user.bot).size < guild.members.cache.filter(m=> m.user.bot === true).size) && (guild.members.cache.filter(m=> !m.user.bot).size >= 5)){
    	guild.owner.send(errormsg.setDescription(`${no} The following requirement/s aren't complete for me to join:\n• **More humans than bots**\n\nRead the light requirements [here](https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started#-requirements).`));
    	guild.channels.cache.filter(x => x.type != "category").random().send(errormsg.setDescription(`${no} The following requirement/s aren't complete for me to join:\n• **More humans than bots**\n\nRead the light requirements [here](https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started#-requirements).`));
    	await guild.leave();
    }
    else if((guild.members.cache.filter(m=> !m.user.bot).size > guild.members.cache.filter(m=> m.user.bot === true).size) && (guild.members.cache.filter(m=> !m.user.bot).size < 5)){
    	guild.owner.send(errormsg.setDescription(`${no} The following requirement/s aren't complete for me to join:\n• **Atleast 5 or more human members**\n\nRead the light requirements [here](https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started#-requirements).`));
    	guild.channels.cache.filter(x => x.type != "category").random().send(errormsg.setDescription(`${no} The following requirement/s aren't complete for me to join:\n• **Atleast 5 or more human members**\n\nRead the light requirements [here](https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started#-requirements).`));
    	await guild.leave();
    }
    else if((guild.members.cache.filter(m=> !m.user.bot).size > guild.members.cache.filter(m=> m.user.bot === true).size) && (guild.members.cache.filter(m=> !m.user.bot).size >= 5)){
    	if (guild.me.hasPermission(['VIEW_CHANNEL', 'SEND_MESSAGES'])){
    		const randomchannel = guild.channels.cache.filter(x => x.type != "category").random()
    		return randomchannel.send(`\`\`\`The Mothership has successfully landed...\`\`\`\n\nGreetings humans, my name is **Lukap** and from now on, I will be serving this server!\n\nI will teach you the very basics on how to use my functions and abilities.\nLet's get started shall we?\n\n***Note:** \`command_name\` is just a placeholder for a command.*\n\nFor starters, to be able to execute the commands that has been implemented inside my brain, the messages that you send must have \`,,\` as the prefix following it with a command (\`,,command_name\`).\n\nTo get all of my available commands, run \`,,help\`. If you want to show a much more detailed information of a single command, run \`,,help command_name\`.\n\nFor setting me up, you should go and read the wiki, specifically the 'Getting Started' page, that Lenin worked hard on.\n\n**https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started**`).catch(err=>console.log(err));
    	}else{
    		return guild.owner.send(`\`\`\`The Mothership has successfully landed...\nBut my eyes were sealed or my mouth was shut...\nI was unable to communicate... in that particular place only...\nSo I had no choice but to contact the owner...\`\`\`\n\nGreetings humans, my name is **Lukap** and from now on, I will be serving this server!\n\nI will teach you the very basics on how to use my functions and abilities.\nLet's get started shall we?\n\n***Note:** \`command_name\` is just a placeholder for a command.*\n\nFor starters, to be able to execute the commands that has been implemented inside my brain, the messages that you send must have \`,,\` as the prefix following it with a command (\`,,command_name\`).\n\nTo get all of my available commands, run \`,,help\`. If you want to show a much more detailed information of a single command, run \`,,help command_name\`.\n\nFor setting me up, you should go and read the wiki, specifically the 'Getting Started' page, that Lenin worked hard on.\n\n**https://github.com/HLenin/Lukap-Bot/wiki/Getting-Started**`)
    	}
    }
});

client.on("guildDelete", async guild => {
	console.log(`I have been removed from or left: ${guild.name} (id: ${guild.id})`);
	let damuterolelmao = db.get(`mutedrole_${guild.id}`);
	let ticketrole = db.get(`ticketrole_${guild.id}`);
	if (damuterolelmao !== null) {
		db.delete(`mutedrole_${guild.id}`);
		await console.log('Deleted muted role database of a certain guild.')
	}
	if (ticketrole !== null) {
		db.delete(`ticketrole_${guild.id}`);
		await console.log('Deleted ticket role database of a certain guild.')
	}
});

client.on("message", async message => {
	// EMOJIS
	const yes = client.emojis.cache.get(`752066559786090518`);
	const no = client.emojis.cache.get(`752066560943718493`);
	const maybe = client.emojis.cache.get(`752066560625213483`);

	// EMBEDS
	const errormsg = new Discord.MessageEmbed()
	.setColor(redcolors())

	const embed = new Discord.MessageEmbed()
	.setColor(greencolors())

	// BASIC SETUP
	if(message.author.bot) return;
	if(!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	// args and usage
	if (command.args && !args.length && !command.usage) {
		return message.channel.send(errormsg.setDescription(`${no} You didn't provide any arguments!`));
	}
	else if (command.args && command.usage && !args.length) {
		errormsg.setDescription(`${no} You didn't provide any arguments!\n\`\`\`The proper usage would be: ${p}${command.name} ${command.usage}\`\`\` `)
	}

	// guildOnly, dmOnly, nsfwOnly, & ownerOnly
	if (command.guildOnly && message.channel.type === 'dm') return message.channel.send(errormsg.setDescription(`${no} This command should be executed at a server!`));

	if (command.dmOnly && message.channel.type !== 'dm') return message.channel.send(errormsg.setDescription(`${no} This command should be executed through DMs!`));

	if (command.nsfwOnly && message.channel.nsfw === false) return message.channel.send(errormsg.setDescription(`${no} This command should be executed at an NSFW CHANNEL ONLY!`));

	if (command.ownerOnly && message.author.id != `${o}`) return message.channel.send(errormsg.setDescription(`${no} This command is for THE CREATOR ONLY!`));

	if (command.managerOnly && !message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(errormsg.setDescription(`${no} You need the \`MANAGE_SERVER\` permission to use this command!`));

	// modOnly
	//let modrole = db.get(`modRole_${message.guild.id}`);
	//if (!modrole || modrole === null) modrole = "none";
	
	/*if (command.modOnly && !message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_ROLES'])) {
		return message.channel.send(errormsg.setDescription(`${no} This command is for STAFF ONLY!`));
	}*/

	// executor
	try{
		command.execute(message, args);
	}catch (error) {
		console.error(error);
		message.channel.send(errormsg.setDescription(`${no} There was an error trying to execute the command!`));
	}
});

client.login(process.env.TOKEN);