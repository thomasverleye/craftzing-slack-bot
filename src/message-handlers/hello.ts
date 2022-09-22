import { MessageEvent, SayFn } from '@slack/bolt';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleHelloMessage = async ({ message, say }: Options) => {
  if (!['im', 'mpim'].includes(message.channel_type)) {
    return;
  }

  await say('Hello! :wave:');
};
