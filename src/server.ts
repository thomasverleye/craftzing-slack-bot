import Imgur from 'services/imgur';

console.log('Hello World');

(async () => {
  console.log('Uploading image...');
  const link = await Imgur.upload('./goed-gedaan.jpg');
  console.log({ link });
})();
