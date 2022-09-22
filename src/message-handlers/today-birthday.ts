import { MessageEvent, SayFn } from '@slack/bolt';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleTodayBirthdayMessage = async ({ say, message }: Options) => {
  await say({
    text: 'Happy birthday!! :party-parrot:',
    thread_ts: message.event_ts,
  });
};
