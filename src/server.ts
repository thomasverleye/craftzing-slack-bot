import { App as Slack } from '@slack/bolt';

import {
  handleAvocadoMessage,
  handleHelloMessage,
  handleJokeMessage,
  handleTodayBirthdayMessage,
} from './message-handlers';

(async () => {
  const slack = new Slack({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  slack.message('hello', handleHelloMessage);
  slack.message('!avocado', handleAvocadoMessage);
  slack.message('!joke', handleJokeMessage);
  slack.message("Today it's the birthday of", handleTodayBirthdayMessage);

  await slack.start();

  console.log('⚡️ Slack bot started!');
})();
