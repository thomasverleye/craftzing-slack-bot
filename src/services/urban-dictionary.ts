import axios from 'axios';

type Definition = {
  definition: string;
  example: string;
  permalink: string;
  thumbs_down: number;
  thumbs_up: number;
  author: string;
  written_on: Date;
};

class UrbanDictionary {
  static async define(term: string) {
    try {
      const { status, data: response } = await axios.get(
        `https://${process.env.URBAN_DICTIONARY_API_HOST}/define`,
        {
          headers: {
            'X-RapidAPI-Key': process.env.URBAN_DICTIONARY_API_KEY as string,
            'X-RapidAPI-Host': process.env.URBAN_DICTIONARY_API_HOST as string,
          },
          params: { term },
        },
      );

      if (status === 200 && response.list.length > 0) {
        const definition = response.list.shift();
        definition.written_on = new Date(definition.written_on);

        return definition as Definition;
      }

      return false;
    } catch {
      return false;
    }
  }
}

export default UrbanDictionary;
