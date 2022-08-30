const { SlashCommandBuilder } = require("discord.js");
const {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { join } = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('overtime')
    .setDescription("Let them know that its overtime"),

  async execute(interaction, client) {
    if(interaction.user.id != process.env.OWNER_ID) return
    const connection = getVoiceConnection(interaction.guildId);
    const player = createAudioPlayer();
    const resource = createAudioResource(join(__dirname+ "/../../sounds/", "Overtime.mp3"));
    player.play(resource);

    connection.subscribe(player);
    await interaction.reply("All ships has been told that overtime has begun");
  },
};
