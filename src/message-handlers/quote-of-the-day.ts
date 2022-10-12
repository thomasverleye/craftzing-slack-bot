import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';
import { getHours } from 'date-fns';
import TextRecognition from 'services/text-recognition';

export const handleQuoteOfTheDayMessage = async (
  options: SlackEventMiddlewareArgs<'message'>,
) => {
  const { say } = options;
  const message = options.message as GenericMessageEvent;
  const { thread_ts } = message;

  const hours = getHours(new Date());
  if (hours < 10 || hours > 14) {
    await say({
      text: 'Only between 10:00 & 14:00 I can be sure there are optimal lighting conditions and try to read the quote from the webcam :face_with_spiral_eyes:',
      thread_ts: thread_ts || message.ts,
    });
    return;
  }

  const quote = await TextRecognition.detect('/webcam.jpg');
  if (!quote) {
    await say({
      text: "Sorry, coudn't read quote :cry:",
      thread_ts: thread_ts || message.ts,
    });
    return;
  }

  await say({
    thread_ts,
    text: `>_${quote}_`,
  });
};
