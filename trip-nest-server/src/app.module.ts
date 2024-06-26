import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { CurrencyConverterModule } from './currency-converter/currency-converter.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CommentsModule } from './comments/comments.module';
import config from 'ormconfig';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(config), PostsModule, CurrencyConverterModule, WishlistModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
