import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  //创建实例
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.setGlobalPrefix('api'); // 全局路由前缀 例如  localhost:3000/api

  // 处理跨域
  app.enableCors();

  // 在根目录创建静态文件 'uploads'
  // app.useStaticAssets('uploads');

  //设置虚拟路径
  app.useStaticAssets(join(__dirname, '..', 'uploads'),{
    prefix: '/static/',   //目录地址
  });

  await app.listen(3002);
}
bootstrap();
