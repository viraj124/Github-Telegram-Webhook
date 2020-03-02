var http = require('http')

const TelegramBot = require('node-telegram-bot-api');
 
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/push', secret: process.env.SECRET })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(4567)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  const data = event.payload.head_commit;
  bot.sendMessage(process.env.CHAT_ID, JSON.stringify(data));
})
