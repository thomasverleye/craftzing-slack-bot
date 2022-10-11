import sharp from 'sharp';
import Tesseract from 'tesseract.js';

export enum TextRecognitionLanguage {
  English = 'eng',
  Dutch = 'nld',
}

class TextRecognition {
  private static async prepImage(path: string) {
    return await sharp(path)
      .resize(1024)
      .greyscale()
      .threshold()
      .jpeg()
      .toBuffer();
  }

  static async detect(
    path: string,
    language: TextRecognitionLanguage = TextRecognitionLanguage.Dutch,
  ) {
    if (!path) {
      return null;
    }

    try {
      const buffer = await TextRecognition.prepImage(path);
      const result = await Tesseract.recognize(buffer, language);
      if (!result?.data?.lines) {
        return null;
      }

      const lines = result.data.lines.filter(
        ({ confidence }) => confidence > 50,
      );
      if (!lines.length) {
        return null;
      }

      return (
        lines.reduce(
          (acc, { text }) =>
            `${acc} ${text.replace(/[^\w\s]/gi, '').trim()}`.trim(),
          '',
        ) || null
      );
    } catch {
      return null;
    }
  }
}

export default TextRecognition;
