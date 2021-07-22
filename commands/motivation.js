const { SlashCommand } = require('slash-create')
const fetch = require('node-fetch')

module.exports = class MotivationCommand extends SlashCommand {
  constructor (creator) {
    super(creator, {
      name: 'motivation',
      description: 'Motivational Melon 😎',
      options: [],
    })

    this.filePath = __filename
  }

  async run (ctx) {
    const data = await fetch('https://hopeful-hopper-87cfe8.netlify.app/api/get-daily-quote')
    const quote = data.json()

    return quote.author ? `> ${quote.text}\n- ${quote.author}` : `> ${quote.text}`
  }
}