import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { AVOCADO_BIRTHDAY, AVOCADO_PUBLIC_POST_INTERVAL } from 'config';
import {
  differenceInMinutes,
  format,
  formatDistanceToNowStrict,
} from 'date-fns';
import Imgur from 'services/imgur';

// in memory cache of the last avocado image we posted
const lastPostPerChannel: Record<string, Date> = {
  // [channelId]: Date
};

interface Options extends SlackEventMiddlewareArgs<'message'> {
  client: WebClient;
}

export const handleAvocadoMessage = async (options: Options) => {
  const { say, client } = options;
  const message = options.message as GenericMessageEvent;
  const { thread_ts } = message;

  if (message.channel_type === 'channel') {
    // try to avoid spamming the channel with avocado images
    if (
      lastPostPerChannel[message.channel] &&
      differenceInMinutes(new Date(), lastPostPerChannel[message.channel]) <
        AVOCADO_PUBLIC_POST_INTERVAL
    ) {
      await client.reactions.add({
        name: 'x',
        channel: message.channel,
        timestamp: message.ts,
      });
      return;
    }

    // keep track of the last time we posted an avocado photo
    lastPostPerChannel[message.channel] = new Date();
  }

  // antwerpen
  if (message.channel === 'C023RTSH98T') {
    await client.reactions.add({
      name: 'x',
      channel: message.channel,
      timestamp: message.ts,
    });
    return;
  }

  const url = await Imgur.upload('/webcam.jpg');
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
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Birthday*\n${format(AVOCADO_BIRTHDAY, 'MMMM do, yyyy')}`,
          },
          {
            type: 'mrkdwn',
            text: `*Age*\n${formatDistanceToNowStrict(AVOCADO_BIRTHDAY)}`,
          },
        ],
      },
      {
        type: 'image',
        image_url: url,
        title: {
          type: 'plain_text',
          text: 'craftzing-avocado.jpg',
        },
        alt_text: 'craftzing-avocado.jpg',
      },
    ],
  });
};
