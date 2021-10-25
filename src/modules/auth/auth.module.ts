import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport'
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({
      secretOrPrivateKey:'ChongQingYiShiYiXianWenHuaChuangYiCeHuaYouXianGongSi',//签名随机数
      signOptions:{
        expiresIn:'12h'  // 12小时，300, 秒  '7d'，
      }
    }),
    PassportModule.register({//验证用户的身份
      defaultStrategy:'jwt'//默认验证策略
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}


