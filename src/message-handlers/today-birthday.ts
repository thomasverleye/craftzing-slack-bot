import { SlackEventMiddlewareArgs } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import Giphy from 'services/giphy';

interface Options extends SlackEventMiddlewareArgs<'message'> {
  client: WebClient;
}

export const handleTodayBirthdayMessage = async ({
  say,
  message,
  client,
}: Options) => {
  await client.reactions.add({
    name: 'birthday',
    channel: message.channel,
    timestamp: message.ts,
  });

  await client.reactions.add({
    name: 'partying_face',
    channel: message.channel,
    timestamp: message.ts,
  });

  const giphyUrl = await Giphy.randomGif('birthday');
  if (giphyUrl) {
    await say({
      thread_ts: message.event_ts,
      text: 'Happy birthday!!',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: 'Happy birthday!! :party-parrot:',
          },
        },
        {
          type: 'image',
          image_url: giphyUrl,
          alt_text: 'birthday.gif',
        },
      ],
    });
    return;
  }

  await say({
    text: 'Happy birthday!! :party-parrot:',
    thread_ts: message.event_ts,
  });
};
