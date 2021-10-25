import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api'); // 全局路由前缀 例如  localhost:3000/api
  await app.listen(3000);
}
bootstrap();
