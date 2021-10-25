import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import multer = require('multer');
import * as fs from 'fs';
import { join} from 'path'
// import { NewsService } from '../news.service';
// import { CreateUploadDto } from './dto/create.upload.dto';




@Controller('upload')
export class UploadController {
  // constructor(
  //   // private readonly uploadService:UploadService,
  //
  // ) {}


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('news')news:any,
    @UploadedFile() file,
    @Body() body
  ){
    // console.log('22',file);
    const filename=`${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`
    const writeImage = createWriteStream(join(__dirname, '..','..','..','../public', filename))//路径产生变化需要修改
    writeImage.write(file.buffer)
    //const domain =`http://localhost:3001/static/${filename}`//切换
    const domain =`https://cc.qileguai.com/api/static/${filename}`
    return {
      url:domain
    }

  }


  // @Post(':upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file) {
  //   console.log(file);
  //   fs.writeFileSync('./hah.jpg', file.buffer);
  // }



  // @Post(':upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: multer.diskStorage({
  //     destination: (req, file, cb) => {
  //       cb(null, '../../../public/upload');
  //     },
  //     filename: (req, file, cb) => {
  //       cb(null, file.originalname);
  //     },
  //   }),
  // }))
  // async upload(
  //   @UploadedFile() file,
  //   @Param('news')news:any,
  // ) {
  //   return file;
  // }


}
