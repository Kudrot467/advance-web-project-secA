import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(@Inject('OpenAI') private readonly openai: OpenAI) {}

  //   async createChatCompletion(messages: ChatCompletionMessageDto[]) {
  //     return this.openai.chat.completions.create({
  //       messages: messages as ChatCompletionMessageParam[],
  //       model: 'gpt-4',
  //     });
  //   }
  async createChatCompletion(messages: ChatCompletionMessageDto[]) {
    try {
      if (!this.openai) {
        throw new Error('OpenAI instance is not properly initialized.');
      }

      return this.openai.chat.completions.create({
        messages: messages as ChatCompletionMessageParam[],
        model: 'gpt-3.5-turbo-16k',
      });
    } catch (error) {
      console.error('Error in createChatCompletion:', error);
      throw error;
    }
  }
}
