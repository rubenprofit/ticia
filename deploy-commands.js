const { REST, Routes } = require("discord.js");
const commands = require("./commands/index.js");
require('dotenv').config();

const rest = new REST({ version: "10" }).setToken(process.env["DISCORD_TOKEN"]);

(async () => {
  try {
    console.info(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env["DISCORD_CLIENT_ID"],
        process.env["DISCORD_GUILD_ID"]
      ),
      { body: commands.map((command) => command.data.toJSON()) }
    );

    console.info(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(`${error.message}:\n`, error);
  }
})();
