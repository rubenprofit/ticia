const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"],
});

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Chat with AI")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Talk to me.")
        .setRequired(true)
        .setMaxLength(2000)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const prompt = interaction.options.getString("prompt");

    try {
      const response = await openai.createCompletion({
        max_tokens: 146,
        model: "text-davinci-003",
        prompt,
        temperature: Math.round(Math.random() * 10) / 10,
      });

      await interaction.editReply(response.data.choices[0].text);
    } catch (error) {
      console.error(`${error.message}:\n`, error);

      await interaction.editReply(
        `Oops. Looks like something went wrong:\n${error.message}`
      );

      throw error;
    }
  },
};
