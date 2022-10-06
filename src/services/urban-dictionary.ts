import axios from 'axios';
import RemoveMarkdown from 'remove-markdown';

type Definition = {
  definition: string;
  example: string;
  permalink: string;
  thumbs_down: number;
  thumbs_up: number;
  author: string;
  written_on: Date;
  approval_rate: number;
};

class UrbanDictionary {
  static async define(term: string) {
    try {
      const { status, data: response } = await axios.get(
        `https://api.urbandictionary.com/v0/define`,
        {
          params: { term },
        },
      );

      if (status === 200 && response.list.length > 0) {
        const definitions = response.list
          .map((definition: Definition) => ({
            ...definition,
            written_on: new Date(definition.written_on),
            definition: RemoveMarkdown(definition.definition).replace(
              /[\r\n]/gm,
              '\n>',
            ),
            example: RemoveMarkdown(definition.example),
            approval_rate: Math.ceil(
              100 *
                (definition.thumbs_up /
                  (definition.thumbs_up + definition.thumbs_down)),
            ),
          }))
          .filter((definition: Definition) => {
            if (definition.thumbs_up === 0) {
              return false;
            }

            if (definition.thumbs_down === 0) {
              return false;
            }

            return true;
          })
          .sort((a: Definition, b: Definition) => b.thumbs_up - a.thumbs_up)
          .slice(0, 3)
          .sort(
            (a: Definition, b: Definition) =>
              b.written_on.getTime() - a.written_on.getTime(),
          );

        return definitions.shift() as Definition;
      }

      return false;
    } catch {
      return false;
    }
  }
}

export default UrbanDictionary;
