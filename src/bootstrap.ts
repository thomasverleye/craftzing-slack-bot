import { config as dotenv } from 'dotenv';
import { register as registerTsConfigPath } from 'tsconfig-paths';

export const bootstrap = () => {
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
};

bootstrap();
