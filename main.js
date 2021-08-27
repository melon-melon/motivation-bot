require('dotenv').config()
const Discord = require('discord.js')
const fetch = require('node-fetch')

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })

client.once('ready', () => {
  console.log('I am a running watermelon :D')
})

client.on('interactionCreate', async interaction => {
  console.log('Request found :o')
  if (!interaction.isCommand()) return

  const { commandName } = interaction;

  if (commandName === 'motivation') {
    console.log('Gotta motivate :D')
    const data = await fetch('https://motivation.melonmelon.dev/api/get-daily-quote')
    const quote = await data.json()

    interaction.reply(quote.author ? `> ${quote.text}\n- ${quote.author}` : `> ${quote.text}`)
  }
})

client.login(process.env.TOKEN)