const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    commandFolders.forEach((folder) => {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      commandFiles.forEach((file) => {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log("Command: " + command.data.name + " Has been added");
      });
    });

    const clientId = process.env.BOT_ID; //right-click bot -> copy id
    const guildId = "754003644789293177"; //right-click server -> copy id

    const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN_1);

    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      })
      .then((data) =>
        console.log(
          `Successfully registered ${data.length} application commands.`
        )
      )
      .catch(console.error);
  };
};
