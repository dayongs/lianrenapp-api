import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';
import { UsersService } from '../../users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly usersService:UsersService
  ) {
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),//获取头部的签名
      secretOrKey:'ChongQingYiShiYiXianWenHuaChuangYiCeHuaYouXianGongSi'//签名随机数 和modules相同
    });

  }

  //验证当前携带的token是否有效
   async validate( jwtPayload:JwtPayload
     // ,done: VerifiedCallback
   ){
      console.log('jwtPayload',jwtPayload)
     const {username}=jwtPayload
     const entity=await  this.usersService.findByName(username)

     if(!entity){
       // done(new UnauthorizedException('没找到用户。'));
       throw new UnauthorizedException('没有找到用户')
     }
     // done(null, entity);
     // console.log('entity',entity)
      return entity
   }

}
