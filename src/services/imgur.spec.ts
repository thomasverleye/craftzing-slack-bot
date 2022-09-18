import axios from 'axios';
import fs from 'fs';
import { Readable } from 'stream';

import Imgur from './imgur';

jest.mock('fs');
jest.mock('axios');

const mockReadStream = jest.fn().mockImplementation(() => {
  const readable = new Readable();
  readable.push('hello');
  readable.push('world');
  readable.push(null);

  return readable;
});

describe('Imgur.upload', () => {
  test('when empty path provided, the function should return false', async () => {
    // given
    const path = '';

    // when
    const response = await Imgur.upload(path);

    // then
    expect(axios.post).toHaveBeenCalledTimes(0);
    expect(response).toBe(false);
  });

  test('when path provided, and the api upload is succesful, the function should return a url', async () => {
    // given
    const path = 'image.jpg';
    jest.spyOn(fs, 'createReadStream').mockReturnValueOnce(mockReadStream());
    jest.spyOn(axios, 'post').mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          status: 200,
          data: {
            success: true,
            data: { link: 'https://i.imgur.com/123456.jpg' },
          },
        }),
      ),
    );

    // when
    const response = await Imgur.upload(path);

    // then
    expect(fs.createReadStream).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(response).toContain('https://i.imgur.com');
  });
});
