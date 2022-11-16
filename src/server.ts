import { App as Slack } from '@slack/bolt';

import {
  handleAvocadoMessage,
  handleBeerTimeMessage,
  handleCroqueMessage,
  handleHelloMessage,
  handleJokeMessage,
  handleTodayBirthdayMessage,
} from './message-handlers';

(async () => {
  // Configure & create Slack instance
  const slack = new Slack({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  // hello
  slack.message('hello', handleHelloMessage);
  slack.message('Hello', handleHelloMessage);
  slack.message('hallo', handleHelloMessage);
  slack.message('Hallo', handleHelloMessage);

  // croqueskes
  slack.message('croque', handleCroqueMessage);
  slack.message('Croque', handleCroqueMessage);

  // avocado
  slack.message('!avocado', handleAvocadoMessage);

  // joke
  slack.message('!joke', handleJokeMessage);

  // birthdays
  slack.message("it's the birthday of", handleTodayBirthdayMessage);
  slack.message('celebrating their birthday today', handleTodayBirthdayMessage);

  // beertime
  slack.message('it is now beer time!', handleBeerTimeMessage);

  // Open Slack connection & start listening
  await slack.start();

  console.log('⚡️ Slack bot started!');
})();
