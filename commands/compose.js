const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"],
});

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("compose")
    .setDescription("Compose an image from a text prompt.")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("What should I draw?.")
        .setRequired(true)
        .setMaxLength(2000)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const prompt = interaction.options.getString("prompt");

    try {
      const response = await openai.createImage({
        n: 1,
        prompt,
        response_format: "url",
        size: "512x512",
      });

      await interaction.editReply(response.data.data[0].url);
    } catch (error) {
      console.error(`${error.message}:\n`, error);

      await interaction.editReply(
        `Oops. Looks like something went wrong:\n${error.message}`
      );

      throw error;
    }
  },
};
