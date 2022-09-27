import { MessageEvent, SayFn } from '@slack/bolt';
import { AVOCADO_BIRTHDAY, AVOCADO_CHANNEL_POST_INTERVAL } from 'config';
import {
  addHours,
  differenceInHours,
  format,
  formatDistanceStrict,
  formatDistanceToNowStrict,
} from 'date-fns';
import ms from 'ms';
import { sleep } from 'radash';
import Imgur from 'services/imgur';

// in memory cache of the last avocado image we posted
const lastPostPerChannel: Record<string, Date> = {
  // [channelId]: Date
};

interface Options {
  say: SayFn;
  message: MessageEvent & { thread_ts?: string; user?: string };
}

export const handleAvocadoMessage = async ({
  message: { thread_ts, ...message },
  say,
}: Options) => {
  if (message.channel_type === 'channel') {
    // try to avoid spamming the channel with avocado images
    // if less than {AVOCADO_CHANNEL_POST_INTERVAL} hours ago, ignore
    if (
      lastPostPerChannel[message.channel] &&
      differenceInHours(new Date(), lastPostPerChannel[message.channel]) <
        AVOCADO_CHANNEL_POST_INTERVAL
    ) {
      const distance = formatDistanceStrict(
        new Date(),
        addHours(
          lastPostPerChannel[message.channel],
          AVOCADO_CHANNEL_POST_INTERVAL,
        ),
      );

      await say({
        thread_ts: message.event_ts,
        text: `To avoid spamming public channels there's a limit on how many times I can post an avocado image. Channel has ${distance} more to cooldown.`,
      });

      await sleep(ms('1 seconds'));

      await say({
        thread_ts: message.event_ts,
        text: `But, you can always DM with me though, as much as you want!`,
      });
      return;
    }

    // keep track of the last time we posted an avocado photo
    lastPostPerChannel[message.channel] = new Date();
  }

  // antwerpen
  if (message.channel === 'C023RTSH98T') {
    await say({
      thread_ts,
      unfurl_links: false,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: "Allright allright, we'll need a couple of things before we can get started! :avocado::seedling:\n• avocado pit\n• Raspberry Pi [<https://shop.pimoroni.com/products/raspberry-pi-3-a-plus|link>]\n• cheap USB webcam [<https://www.aliexpress.com/item/1005003077609523.html|link>]",
          },
        },
      ],
    });
    return;
  }

  const url = await Imgur.upload('/webcam.jpg');
  if (!url) {
    await say({
      text: 'Sorry, having trouble uploading photo :cry:',
      thread_ts,
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
