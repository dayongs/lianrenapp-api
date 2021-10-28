import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

import { NewsModule } from './modules/news/news.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
    //   {
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3309,
    //   username: 'root',
    //   password: '123456',
    //   database: 'lianrenappcn',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }



    ),
    NewsModule,
    UsersModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
