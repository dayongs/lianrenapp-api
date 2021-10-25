import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneUsersDto } from './dto/find.one.users.dto';
import { FindAllUsersDto } from './dto/find.all.users.dto';
import { CreateUsersDto } from './dto/create.users.dto';
import { UsersEntity } from './users.entity';
import { UpdateUsersDto } from './dto/update.users.dto';
import { RemoveUsersDto } from './dto/remove.users.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService:UsersService
  ) {}



  //1查询所有用户
  @Get()
  async findAll(findAllUsersDto:FindAllUsersDto):Promise<UsersEntity[]>{
    return  await  this.userService.findAll(findAllUsersDto)
  }



  //2查询一个用户
  @Get(':user')
  @UseInterceptors(ClassSerializerInterceptor)//设置密码拦截器 和entity的 @Exclude()配合使用
  async findOne(
    @Query()findOneUsersDto:FindOneUsersDto,
    @Param('user')user:any
  ):Promise<UsersEntity>{
    findOneUsersDto.id=user
    return  await this.userService.findOne(findOneUsersDto)
  }




  //3添加
  @Post()
  async create(
    @Body()createUsersDto:CreateUsersDto
  ):Promise<UsersEntity>{
    console.log('createUsersDto',createUsersDto);
    return  await  this.userService.create(createUsersDto)
  }



  //4 更新
  @Put(':user')
  async update(
    @Param('user')user:any,
    @Body()updateUsersDto:UpdateUsersDto
  ):Promise<UsersEntity>{
    updateUsersDto.user=user
    console.log('222',updateUsersDto);
    return  await  this.userService.update(updateUsersDto)
  }


  //4 更新密码
  @Put(':user/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Param('user')user:any,
    @Body()updatePasswordDto:UpdatePasswordDto
  ):Promise<UsersEntity>{
    updatePasswordDto.user=user
    return  await  this.userService.updatePassword(updatePasswordDto)
  }


  //5删除
  @Delete(':user')
  async remove(
    @Param('user')user:any,
    @Query() removeUsersDto:RemoveUsersDto
  ):Promise<any>{
    removeUsersDto.user=user
    await  this.userService.remove(removeUsersDto)
    return
  }


}
