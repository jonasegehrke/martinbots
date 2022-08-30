const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Make me leave a channel"),

  async execute(interaction, client) {
    const connection = getVoiceConnection(interaction.guildId);

    connection.destroy()

  },
};
