import './src/app.js';
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const PREFIX = "!";

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/+/);
    const command = args.shift().toLowerCase();

    if (command === 'sendrules') {
        // Check if the user is an administrator
        if (!message.member.permissions.has('Administrator')) {
            return message.reply("You do not have permission to use this command.");
        }

        // Create the rules block
        const rulesEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📜 Server Rules')
            .setDescription('Welcome to our server! Please take a moment to read and follow the rules below to ensure a safe and friendly environment for everyone.')
            .addFields(
                { name: '1. Server Safety and Raiding,
• Raiding or mentions of raiding are strictly forbidden unless initiated by staff for events.
• Follow the Discord Community Guidelines at all times.' },
                { name: '2. Be Respectful and Inclusive,
• Treat all members with respect, regardless of personal feelings.
• No hate speech, racism, sexism, harassment, or personal attacks.
• Negative remarks about users, staff, or bots will not be tolerated.' },
                { name: '3. No NSFW/NSFL Content,
• Absolutely no NSFW/NSFL content, discussions, usernames, or avatars. This includes pornographic material, explicit language, and inappropriate memes. Zero tolerance.' },
                { name: '4. Follow Discord Terms', value: 'Obey the official Discord Terms of Service.' }
            );

        // Send the rules and delete the original command message
        await message.channel.send({ embeds: [rulesEmbed] });
        await message.delete();
    }
});

client.login(process.env.TOKEN);
  
