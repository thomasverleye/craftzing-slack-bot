import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

interface Options extends SlackEventMiddlewareArgs<'message'> {
  client: WebClient;
}

export const handleBeerTimeMessage = async (options: Options) => {
  const { client } = options;
  const message = options.message as GenericMessageEvent;

  await client.reactions.add({
    name: 'beer',
    channel: message.channel,
    timestamp: message.ts,
  });
};
