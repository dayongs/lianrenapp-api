import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { UsersEntity } from '../users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService
  ) {  }



  //登陆
  @Post('login')
  async  login(
    @Body()authDto:AuthDto
  ){
    console.log('authDto',authDto);
    return this.authService.login(authDto)
  }


  //测试
  @Get('test')
  @UseGuards(AuthGuard())//获取的token交给 auth.strategy.ts里面的.validate方法
  // async authTest(@User() user:UsersEntity) {
    async authTest(@Req() req:any,){
    // console.log('user:', user);
    console.log('user',req.user)//打印出该保存的token的信息
    return{
      messages:'ok'
    }
  }




}
