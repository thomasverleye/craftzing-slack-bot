import { MessageEvent, SayFn } from '@slack/bolt';
import { AVOCADO_BIRTHDAY } from 'config';
import { format, formatDistanceToNowStrict } from 'date-fns';
import Imgur from 'services/imgur';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleAvocadoMessage = async ({ say }: Options) => {
  const url = await Imgur.upload('/webcam.jpg');
  if (!url) {
    say('Sorry, having trouble uploading photo :cry:');
    return;
  }

  say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'Heeeey, look at this! :avocado: :avocado: :avocado:',
        },
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
