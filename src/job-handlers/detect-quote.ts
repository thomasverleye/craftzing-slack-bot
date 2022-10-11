import TextRecognition from 'services/text-recognition';

let lastDetectedQuote: string | null = null;

export const handleDetectQuoteJob = async () => {
  const quote = await TextRecognition.detect('./webcam.jpg');
  if (!quote) {
    return;
  }

  if (quote === lastDetectedQuote) {
    return;
  }

  if (lastDetectedQuote) {
    console.log('New quote detected!', { quote });
    return;
  }

  console.log('Quote detected!', { quote });

  lastDetectedQuote = quote;
};
