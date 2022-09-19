import { App as Slack } from '@slack/bolt';

(async () => {
  const slack = new Slack({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  slack.message('hello', async ({ message, say }) => {
    console.log({ message });

    await say('hello');
  });

  await slack.start();

  console.log('⚡️ Slack bot started!');
})();
