import { SlackEventMiddlewareArgs } from '@slack/bolt';

export const handleHelloMessage = async (
  options: SlackEventMiddlewareArgs<'message'>,
) => {
  const { message, say } = options;

  if (!['im', 'mpim'].includes(message.channel_type)) {
    return;
  }

  await say('Hello! :wave:');
};
