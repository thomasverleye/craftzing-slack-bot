import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';
import ms from 'ms';
import { sleep } from 'radash';
import DadJokes from 'services/dad-jokes';

export const handleJokeMessage = async (
  options: SlackEventMiddlewareArgs<'message'>,
) => {
  const { say } = options;
  const message = options.message as GenericMessageEvent;
  const { thread_ts } = message;

  const joke = await DadJokes.randomJoke();
  if (!joke) {
    await say({
      text: 'Sorry, having trouble finding a joke :cry:',
      thread_ts,
    });
    return;
  }

  await say({
    text: joke[0],
    thread_ts,
  });

  await sleep(ms('3.5 seconds'));

  await say({
    text: joke[1],
    thread_ts,
  });
};
