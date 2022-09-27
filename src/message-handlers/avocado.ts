import { MessageEvent, SayFn } from '@slack/bolt';
import { AVOCADO_BIRTHDAY } from 'config';
import { format, formatDistanceToNowStrict } from 'date-fns';
import Imgur from 'services/imgur';

interface Options {
  say: SayFn;
  message: MessageEvent & { thread_ts?: string };
}

export const handleAvocadoMessage = async ({
  message: { thread_ts, ...message },
  say,
}: Options) => {
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
