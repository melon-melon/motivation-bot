const { SlashCreator, GatewayServer } = require('slash-create');
const Eris = require('eris')
const path = require('path');
require('dotenv').config();

const client = new Eris(process.env.TOKEN);
const creator = new SlashCreator({
  applicationID: process.env.APPLICATION_ID,
  publicKey: process.env.PUBLIC_KEY,
  token: process.env.TOKEN,
})

creator.on('debug', (message) => console.log(message));
creator.on('warn', (message) => console.log(message));
creator.on('error', (error) => console.log(error));
creator.on('synced', () => console.log('Commands synced!'));
creator.on('commandRun', (command, _, ctx) => console.log(`${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`));
creator.on('commandRegister', (command) => console.log(`Registered command ${command.commandName}`));
creator.on('commandError', (command, error) => console.log(`Command ${command.commandName}:`, error));


creator
  .withServer(
    new GatewayServer((handler) => client.on('rawWS', (event) => {
      if (event.t === 'INTERACTION_CREATE') handler(event.d);
    }))
  )
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .syncCommands()

client.connect();