import { MessageEvent, SayFn } from '@slack/bolt';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleBeerTimeMessage = async ({ say, message }: Options) => {
  await say({
    text: "Ayoo, let's goooo!!! :beer: :beer: :beer:",
    thread_ts: message.event_ts,
  });
};
