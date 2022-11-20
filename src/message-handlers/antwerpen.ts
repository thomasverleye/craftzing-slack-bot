import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { CHANNELS } from 'config';
import Imgur from 'services/imgur';

interface Options extends SlackEventMiddlewareArgs<'message'> {
  client: WebClient;
}

export const handleAntwerpenMessage = async (options: Options) => {
  const { say, client } = options;
  const message = options.message as GenericMessageEvent;
  const { thread_ts } = message;

  if (
    // if posted in a channel
    message.channel_type === 'channel' &&
    // and it is not #cz-office-antwerpen
    message.channel !== CHANNELS.CZ_OFFICE_ANTWERPEN
  ) {
    // don't post image but reply with emoji
    await client.reactions.add({
      name: 'x',
      channel: message.channel,
      timestamp: message.ts,
    });
    return;
  }

  const url = await Imgur.upload('/antwerpen.jpg');
  if (!url) {
    await say({
      text: 'Sorry, having trouble uploading photo :cry:',
      thread_ts: thread_ts || message.event_ts,
    });
    return;
  }

  await say({
    thread_ts,
    blocks: [
      {
        type: 'image',
        image_url: url,
        title: {
          type: 'plain_text',
          text: 'craftzing-antwerpen.jpg',
        },
        alt_text: 'craftzing-antwerpen.jpg',
      },
    ],
  });
};
