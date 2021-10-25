import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsEntity} from "./news.entity";
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      NewsEntity,
    ]),
    UploadModule,
  ],
  controllers: [NewsController, UploadController],
  providers: [NewsService],
  exports:[NewsService]
})
export class NewsModule {}
