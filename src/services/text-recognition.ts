import { getUnixTime } from 'date-fns';
import { readFileSync } from 'fs';
import { capitalize } from 'radash';
import sharp from 'sharp';
import Tesseract from 'tesseract.js';

export enum TextRecognitionLanguage {
  English = 'eng',
  Dutch = 'nld',
}

class TextRecognition {
  private static async prepImage(path: string) {
    try {
      const ocrPath = `/ocr-prep-${getUnixTime(new Date())}.jpg`;

      await sharp(readFileSync(path))
        .resize(1000)
        .greyscale()
        .threshold()
        .jpeg()
        .toFile(ocrPath);

      return ocrPath;
    } catch {
      return false;
    }
  }

  static async detect(
    path: string,
    language: TextRecognitionLanguage = TextRecognitionLanguage.Dutch,
  ) {
    if (!path) {
      return null;
    }

    try {
      const preppedOcrPath = await TextRecognition.prepImage(path);
      if (!preppedOcrPath) {
        return null;
      }
      const result = await Tesseract.recognize(
        readFileSync(preppedOcrPath),
        language,
      );
      if (!result?.data?.lines) {
        return null;
      }

      const lines = result.data.lines.filter(
        ({ confidence }) => confidence > 50,
      );
      if (!lines.length) {
        return null;
      }

      const text = capitalize(
        lines.reduce(
          (acc, { text }) =>
            `${acc} ${text.replace(
              /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
              '',
            )}`
              .replace(/[^\w\s]/gi, '')
              .replace(/  +/gi, ' ')
              .trim(),
          '',
        ),
      );
      if (!text) {
        return null;
      }

      return { text, path: preppedOcrPath };
    } catch {
      return null;
    }
  }
}

export default TextRecognition;
