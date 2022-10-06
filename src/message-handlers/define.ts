import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';
import { format } from 'date-fns';
import UrbanDictionary from 'services/urban-dictionary';

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
          text: `>*Definition:*\n>${result.definition
            .replace(/[\r\n]/gm, '\n>')
            .replace(
              /\[([\w\s]+)\]+/gm,
              `<https://www.urbandictionary.com/define.php?term=$1|$1>`,
            )}\n>\n>*Example:*\n>${result.example
            .replace(/[\r\n]/gm, '\n>')
            .replace(
              /\[([\w\s]+)\]+/gm,
              `<https://www.urbandictionary.com/define.php?term=$1|$1>`,
            )}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Approval rate: ${result.approval_rate}% | Posted on ${format(
              result.written_on,
              'MMMM do, yyyy',
            )} by ${result.author} | ${result.permalink}`,
          },
        ],
      },
    ],
    thread_ts,
  });
};
