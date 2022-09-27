import { MessageEvent, SayFn } from '@slack/bolt';
import ms from 'ms';
import { sleep } from 'radash';
import DadJokes from 'services/dad-jokes';

interface Options {
  say: SayFn;
  message: MessageEvent & { thread_ts?: string };
}

export const handleJokeMessage = async ({
  message: { thread_ts },
  say,
}: Options) => {
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
