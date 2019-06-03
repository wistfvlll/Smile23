
 const yourID = "262917684423950337"; 
const setupCMD = "-reacon"//الرساله لتشغيل امر الرياكشن
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["▶ 『 Members 』 ◀"];//الرتب الي يعطيها البوت يمديك تعدل
const reactions = [":ballot_box_with_check:" ];//الايموجي الي يعطي رياكشن بس كل رتبه لها رياكسن بالترتيب 
const botToken = "NTg0NzMxNDE4NTA5MzEyMDIy.XPSdHA.5Nja-bG_pLneON52jkYu6dynxwI"; //حط توكن بوتك
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login(botToken);

if (roles.length !== reactions.length) throw "__**Gaming Roles**__";
//لالالالالا نغير شي ابداا
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`*React below to get the*, **"${role}"** ,*role!*`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});
