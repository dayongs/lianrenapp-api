import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NewsEntity } from '../news.entity';
import { NewsService } from '../news.service';
import { CreateUploadDto } from './dto/create.upload.dto';
import { UpdateNewsDto } from '../dto/update.news.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';


@Injectable()
export class UploadService {
  // constructor(
  //   private readonly newsService:NewsService
  // ) {}


  // async create(createUploadDto:CreateUploadDto){
  //
  //
  //   const file=createUploadDto.file;
  //   const filename=`${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`
  //   const writeImage = createWriteStream(join(__dirname, '..','..','../upload', filename))
  //   writeImage.write(file.buffer)
  //   return filename
  //
  //
  //
  //
  //   // const updateNewsDto=new UpdateMessageDto()
  //   // updateNewsDto.content
  //   //
  //   // return await this.newsService.update(updateNewsDto)
  // }


}
