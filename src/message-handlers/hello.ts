import { MessageEvent, SayFn } from '@slack/bolt';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleHelloMessage = async ({ message, say }: Options) => {
  if (message.channel_type !== 'im') {
    return;
  }

  say('Hello! :wave:');
};
