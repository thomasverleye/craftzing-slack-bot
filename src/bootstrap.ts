import { config as dotenv } from 'dotenv';
import { register as registerTsConfigPath } from 'tsconfig-paths';

dotenv();

registerTsConfigPath({
  baseUrl: './',
  paths: {
    '*': [
      './src/*', // dev
      './*', // dist
    ],
  },
});
