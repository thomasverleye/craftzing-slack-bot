import { MessageEvent, SayFn } from '@slack/bolt';
import { AVOCADO_BIRTHDAY } from 'config';
import { format, formatDistanceToNowStrict } from 'date-fns';
import Imgur from 'services/imgur';

interface Options {
  say: SayFn;
  message: MessageEvent & { thread_ts?: string };
}

export const handleAvocadoMessage = async ({
  message: { thread_ts },
  say,
}: Options) => {
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
