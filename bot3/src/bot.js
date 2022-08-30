require("dotenv").config();
const fs = require("fs");
const {
  Client,
  Collection,
  GatewayIntentBits,
  IntentsBitField,
} = require("discord.js");
const {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const { join } = require("node:path");

const { BOT_TOKEN_1 } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.on("messageCreate", async (message) => {
  if (message.content === "!overtime") {
    if (message.author.id === process.env.OWNER_ID) {
      const connection = getVoiceConnection(message.guildId);
      console.log(connection)
      const player = createAudioPlayer();
      const resource = createAudioResource(
        join(__dirname + "/sounds/", "Overtime.mp3")
      );
      player.play(resource);

      connection.subscribe(player);
      message.channel.send("All Ships has been told overtime is starting");
    }
  }
});

client.handleEvents();
client.handleCommands();

client.login(BOT_TOKEN_1);
