require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = [
  new SlashCommandBuilder().setName('motivation').setDescription('Motivational Melon 😎'),
].map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.APPLICATION_ID),
      { body: commands },
    );

    console.log('Successfully registered application commands.')
  } catch (error) {
    console.error(error)
  }
})()