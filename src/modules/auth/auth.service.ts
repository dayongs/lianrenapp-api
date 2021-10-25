import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FindOneUsersDto } from '../users/dto/find.one.users.dto';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthDto } from './auth.dto';
import { JwtPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { createDeflateRaw } from 'zlib';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService:UsersService,
    private readonly jwtService:JwtService
  ) {}

  async  login(authDto:AuthDto){
    const {username,password}=authDto
    const entity=await this.usersService.findByName(username)
    // const entity1=await this.usersService.findByName(authDto.username)

    if(!entity){
      throw new UnauthorizedException('用户名不存在！')
    }
   if(!(await entity.comparePassword(authDto.password))) {
     throw  new UnauthorizedException('密码不正确')
   }

   // return entity
    const {id}=entity
    const payload={id,username};
   const token=this.signToken(payload)//传入参数
    return{
     ...payload,
      token
    }
  }

  //签发token
  signToken(jwtPayload:JwtPayload){
    return  this.jwtService.sign(jwtPayload)
  }




  //2查询一个用户
  // async findOne(findOneUsersDto:FindOneUsersDto):Promise<UsersEntity>{
  //
  //   const adminUser= await this.usersService.findOne(findOneUsersDto.id)
  //   if(!adminUser){
  //     throw new NotFoundException(`NOT FIND FOR USER ${findOneUsersDto.username}`)
  //   }
  //   if(adminUser.password!==findOneUsersDto.password){
  //     throw new NotFoundException(`Incorrect account or password `)
  //   }
  //   return adminUser
  // }
}
