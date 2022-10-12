import TextRecognition from 'services/text-recognition';
import { compareTwoStrings } from 'string-similarity';

let cachedQuote = '';

export const handleDetectQuoteJob = async () => {
  const result = await TextRecognition.detect('/webcam.jpg');
  if (!result?.text) {
    return;
  }

  const similarity = compareTwoStrings(cachedQuote, result.text);
  if (similarity > 0.5) {
    return;
  }

  cachedQuote = result.text;

  console.log({ quote: result.text });
};
