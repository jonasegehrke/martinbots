const { SlashCommandBuilder, ChannelType } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
} = require("@discordjs/voice");
const { join } = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`${process.env.SHIP_COLOR}-join`)
    .setDescription("Make me join a channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to join")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    ),

  async execute(interaction, client) {
    const voiceConnection = joinVoiceChannel({
      channelId: interaction.options.getChannel("channel").id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    await interaction.reply(process.env.SHIP_COLOR + " has been told to join channel");
  },
};
