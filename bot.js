const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
});
bot.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
if (message.content.startsWith(`${prefix}eval`) && message.author.id === "406343162651738112" || message.author.id === "361951318929309707") {
		const code = message.content.split(" ").slice(1).join(" ");
        try {
         let evaled = eval(code);
         if (!code) {
             return message.channel.send("А где код?");
         }
    
         if (typeof evaled !== 'string')
           evaled = require('util').inspect(evaled);
        
           const embed = new Discord.RichEmbed()
           .setTitle(`EVAL ✅`)
       
           .setColor("0x4f351")
           .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(evaled)}\`\`\``)
       
         message.channel.send({embed});
       } catch (err) {
         const embed = new Discord.RichEmbed()
         .setTitle(`EVAL ❌`)
  
         .setColor("0xff0202")
         .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(err)}\`\`\``)
    
         message.channel.send({embed});
       }
	}
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    if(cmd === `${prefix}hello`) {
        return message.channel.send("hello!");
    }

})});
bot.login(process.env.BOT_TOKEN);
