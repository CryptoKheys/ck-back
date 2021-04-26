import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Command,
  Ctx,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

@Update()
export class TgBotUpdate {
  @Start()
  async start(@Ctx() ctx: Context) {
    const extra: ExtraReplyMessage = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Button 1', url: 'https://google.com' },
            {
              text: 'Button 2',
              // url: 'https://apple.com',
              login_url: { url: process.env.LOGIN_URL },
            },
          ],
          [{ text: 'Button 2', url: 'https://google.com' }],
        ],
      },
    };
    await ctx.reply('Salut toi', extra);
  }
}
