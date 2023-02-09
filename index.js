const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const commands = require("./commands/index.js");
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async (interaction) => {
  console.log(`Interaction ${interaction.id} from ${interaction.user.username}.`);

  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.warn(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`${error.message}:\n`, error);

    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env["DISCORD_TOKEN"]);
