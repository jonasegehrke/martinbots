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
    .setName(`${process.env.SHIP_COLOR}-bounds`)
    .setDescription("Let them know that thier ship is out of bounds"),

  async execute(interaction, client) {
    if(interaction.user.id != process.env.OWNER_ID) return
    const connection = getVoiceConnection(interaction.guildId);
    const player = createAudioPlayer();
    const resource = createAudioResource(join(__dirname+ "/../../sounds/", "OutofBounds.mp3"));
    player.play(resource);

    connection.subscribe(player);

    await interaction.reply(process.env.SHIP_COLOR + " has been told to return to the playing area");
  },
};
