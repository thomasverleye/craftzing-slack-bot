import { MessageEvent, SayFn } from '@slack/bolt';
import ms from 'ms';
import { sleep } from 'radash';
import DadJokes from 'services/dad-jokes';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleJokeMessage = async ({ say }: Options) => {
  const joke = await DadJokes.randomJoke();
  if (!joke) {
    await say('Sorry, having trouble finding a joke :cry:');
    return;
  }

  await say(joke[0]);

  await sleep(ms('3.5 seconds'));

  await say(joke[1]);
};
