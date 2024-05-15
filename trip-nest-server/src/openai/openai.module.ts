import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule],
  providers: [
    OpenaiService,
    {
      provide: 'OpenAI',
      useFactory: async (configService: ConfigService) => {
        return new OpenAI({
          apiKey: configService.getOrThrow('OPENAI_API_KEY'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [OpenaiService],
})
export class OpenaiModule {}
