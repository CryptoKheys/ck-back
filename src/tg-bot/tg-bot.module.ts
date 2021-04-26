import { Module } from '@nestjs/common';
import { TgBotUpdate } from './tg-bot.update';

@Module({
  providers: [TgBotUpdate],
})
export class TgBotModule {}
