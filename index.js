const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const mysql = require('mysql2');

// Load environment variables
require('config.sample.json').config();

const allIntents = Object.values(GatewayIntentBits);
const client = new Client({ 
  intents: allIntents,
  partials: ['Message', 'Channel', 'Reaction', 'GuildMember', 'User', 'ThreadMember'],
 });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);

    if (!command.data || !('name' in command.data) || !('description' in command.data)) {
      console.error(`[ERROR] Command ${file} is missing required 'data' properties.`);
      continue;
    }

    if (!command.execute) {
      console.error(`[ERROR] Command ${file} is missing an 'execute' function.`);
      continue;
    }

    client.commands.set(command.data.name, command);
  }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`[ERROR] Command ${interaction.commandName} not found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (!interaction.replied) {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// Database Connection
const { connectToDatabase } = require('./events/database');
client.once('ready', () => {
    console.log('Bot is ready!');
    connectToDatabase();
});

// Load events
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Login using environment variable
client.login(process.config.sample.json.BOT_TOKEN);
