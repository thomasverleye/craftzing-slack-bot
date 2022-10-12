import TextRecognition from 'services/text-recognition';
import { compareTwoStrings } from 'string-similarity';

let cachedQuote = '';

export const handleDetectQuoteJob = async () => {
  const quote = await TextRecognition.detect('./webcam.jpg');
  if (!quote) {
    return;
  }

  const similarity = compareTwoStrings(cachedQuote, quote);
  if (similarity >= 0.5) {
    return;
  }

  console.log('Quote detected', { quote });

  cachedQuote = quote;
};
