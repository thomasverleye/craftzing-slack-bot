import { MessageEvent, SayFn } from '@slack/bolt';
import Imgur from 'services/imgur';

interface Options {
  say: SayFn;
  message: MessageEvent;
}

export const handleAvocadoMessage = async ({ say }: Options) => {
  const url = await Imgur.upload('/webcam.jpg');
  if (!url) {
    say('Sorry, having trouble uploading photo :cry:');
    return;
  }

  say(`Uploaded photo to ${url}`);
};
