import { forwardRef, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { NewsModule } from '../news.module';

@Module({
  imports:[

    // forwardRef(()=>NewsModule),
    // NewsModule,
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
