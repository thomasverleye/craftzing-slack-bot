import axios from 'axios';

import Imgur from './imgur';

jest.mock('axios');

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
});
