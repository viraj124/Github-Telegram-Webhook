const http = require('http')
const dotenv = require("dotenv");
const createHandler = require('github-webhook-handler')
//One Promise Cancellation feature will be deprecated in the future, but this is the latest module 4 months old.
const TelegramBot = require('node-telegram-bot-api');

dotenv.config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

//Each Repo will have a separate webhook and the secret defined below distinguishes it.
const handler = createHandler({ path: '/push', secret: process.env.SECRET })

//Creating & Starting the Server
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode(404)
    res.end(err)
  })
}).listen(process.env.PORT)

//Capturing error events
handler.on('error', function (err) {
  res.statusCode(404)
  res.end(err)
})

//The Destination of the Message depends on the chat id, currently using a sample chat id for a group.
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref)
  //Defined it here since using only once for now.
  const msg = event.payload.head_commit.author.name + " just commited with message " + event.payload.head_commit.message + " at " + event.payload.head_commit.timestamp + ". Details here " + event.payload.head_commit.url
  bot.sendMessage(process.env.CHAT_ID, msg);
})

console.log("Github WebHook Litsening at " + process.env.PORT)