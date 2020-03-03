# Github-Telegram-Webhook

## How it Works?
For a particular repo to get the alerts you will have to create a [Webhook](https://developer.github.com/webhooks/creating/)

Then to add new repo alerts you would need to create new WebHook Handlers with a path and a secret refer App.js for more info.

To Manage the Destination of the events, [you would need a unique chat id of the group/private conversation]     (https://pupli.net/2019/02/get-chat-id-from-telegram-bot/) by adding your Bot that you   created with the help of @BotFather.

After obtaining the chat id, you can just pass it in sendMessage method of the bot along with the message and you will start getting the alerts.

