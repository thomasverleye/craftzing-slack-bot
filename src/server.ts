import { App as Slack } from '@slack/bolt';

// import cron from 'node-cron';
// import { handleDetectQuoteJob } from './job-handlers';
import {
  handleAvocadoMessage,
  handleBeerTimeMessage,
  handleCroqueMessage,
  handleDefineMessage,
  handleHelloMessage,
  handleJokeMessage,
  handleQuoteOfTheDayMessage,
  handleTodayBirthdayMessage,
} from './message-handlers';

(async () => {
  // cron.schedule('*/15 * * * *', handleDetectQuoteJob);

  const slack = new Slack({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  slack.message('hello', handleHelloMessage);
  slack.message('Hello', handleHelloMessage);
  slack.message('hallo', handleHelloMessage);
  slack.message('Hallo', handleHelloMessage);
  slack.message('croque', handleCroqueMessage);
  slack.message('Croque', handleCroqueMessage);
  slack.message('!avocado', handleAvocadoMessage);
  slack.message('!quote', handleQuoteOfTheDayMessage);
  slack.message('!joke', handleJokeMessage);
  slack.message('!define', handleDefineMessage);
  slack.message("Today it's the birthday of", handleTodayBirthdayMessage);
  slack.message('beer time', handleBeerTimeMessage);

  await slack.start();

  console.log('⚡️ Slack bot started!');
})();
