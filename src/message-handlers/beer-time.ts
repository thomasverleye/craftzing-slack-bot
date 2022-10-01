import { SlackEventMiddlewareArgs } from '@slack/bolt';

export const handleBeerTimeMessage = async (
  options: SlackEventMiddlewareArgs<'message'>,
) => {
  const { say, message } = options;

  await say({
    text: "Ayoo, let's goooo!!! :beer::beer::beer:",
    thread_ts: message.event_ts,
  });
};
