import './bootstrap';

import dotenv from 'dotenv';

jest.mock('dotenv');

describe('bootstrap', () => {
  test('.env should be loaded during bootstrap', async () => {
    // then
    expect(dotenv.config).toHaveBeenCalledTimes(1);
  });
});
