import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';
import { format } from 'date-fns';
import { remark } from 'remark';
import UrbanDictionary from 'services/urban-dictionary';
import strip from 'strip-markdown';

export const handleDefineMessage = async (
  options: SlackEventMiddlewareArgs<'message'>,
) => {
  const { say } = options;
  const message = options.message as GenericMessageEvent;
  const { thread_ts } = message;

  const term = message.text?.replace('!define', '').trim();
  if (!term) {
    await say({
      text: 'Invalid search term, example usage: `!define warre`',
      thread_ts,
    });
    return;
  }

  const result = await UrbanDictionary.define(term);
  if (!result) {
    await say({
      text: `No definition found for *"${term}"* :cry:`,
      thread_ts,
    });
    return;
  }

  await say({
    unfurl_links: false,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `>*Definition:*\n>${await remark()
            .use(strip)
            .process(result.definition)}\n>*Example:*\n>${await remark()
            .use(strip)
            .process(result.example)}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Approval rate: ${Math.ceil(
              100 *
                (result.thumbs_up / (result.thumbs_up + result.thumbs_down)),
            )}% | Posted on ${format(result.written_on, 'MMMM do, yyyy')} by ${
              result.author
            } | ${result.permalink}`,
          },
        ],
      },
    ],
    thread_ts,
  });
};
