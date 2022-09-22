import { MessageEvent, SayFn } from '@slack/bolt';
import Giphy from 'services/giphy';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleTodayBirthdayMessage = async ({ say, message }: Options) => {
  const giphyUrl = await Giphy.randomGif('birthday');
  if (giphyUrl) {
    await say({
      thread_ts: message.event_ts,
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
