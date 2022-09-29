import { MessageEvent } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

interface Options {
  message: MessageEvent;
  client: WebClient;
}

export const handleCroqueMessage = async ({ client, message }: Options) => {
  await client.reactions.add({
    name: 'sandwich',
    channel: message.channel,
    timestamp: message.ts,
  });
};
