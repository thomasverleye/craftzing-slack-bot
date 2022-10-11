import { App as Slack } from '@slack/bolt';
import TextRecognition from 'services/text-recognition';

import {
  handleAvocadoMessage,
  handleBeerTimeMessage,
  handleCroqueMessage,
  handleDefineMessage,
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
  slack.message('Hello', handleHelloMessage);
  slack.message('hallo', handleHelloMessage);
  slack.message('Hallo', handleHelloMessage);
  slack.message('croque', handleCroqueMessage);
  slack.message('Croque', handleCroqueMessage);
  slack.message('!avocado', handleAvocadoMessage);
  slack.message('!joke', handleJokeMessage);
  slack.message('!define', handleDefineMessage);
  slack.message("Today it's the birthday of", handleTodayBirthdayMessage);
  slack.message('beer time', handleBeerTimeMessage);

  await slack.start();

  const text = await TextRecognition.detect('/webcam.jpg');
  console.log({ text });
})();
