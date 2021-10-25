import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneUsersDto } from './dto/find.one.users.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllUsersDto } from './dto/find.all.users.dto';
import { CreateUsersDto } from './dto/create.users.dto';
import { UpdateUsersDto } from './dto/update.users.dto';
import { RemoveUsersDto } from './dto/remove.users.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';

//管理员
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {
  }


  //1查询所有用户
  async findAll(findAllUsersDto: FindAllUsersDto): Promise<UsersEntity[]> {

    const wheres = {};
    wheres['is_remove'] = 0;
    return await this.usersRepository.find({
      where: wheres,
    });

  }


  //2查询一个用户
  async findOne(findOneUsersDto: FindOneUsersDto): Promise<UsersEntity> {

    const adminUser = await this.usersRepository.findOne(findOneUsersDto.id);
    if (!adminUser) {
      throw new NotFoundException(`NOT FIND FOR USER ${findOneUsersDto.username}`);
    }
    // if(adminUser.password!==findOneUsersDto.password){
    //   throw new NotFoundException(`Incorrect account or password `)
    // }
    return adminUser;
  }

  //3添加
  async create(createUsersDto: CreateUsersDto): Promise<UsersEntity> {
    const { username } = createUsersDto;
    const oldUser = await this.usersRepository.findOne({ username });
    console.log('oldUser', oldUser);
    if (oldUser) {
      throw new BadRequestException('用户已经存在了');
    }
    const user = new UsersEntity();
    user.username = createUsersDto.username;
    user.password = createUsersDto.password;
    user.alias = createUsersDto.alias;

    return await this.usersRepository.save(user);

  }


  //4 更新
  async update(updateUsersDto: UpdateUsersDto): Promise<UsersEntity> {
    const findOneUsersDto = new FindOneUsersDto();
    findOneUsersDto.id = updateUsersDto.user;
    const user = await this.findOne(findOneUsersDto);

    if (updateUsersDto.username) user.username = updateUsersDto.username;
    if (updateUsersDto.password) user.password = updateUsersDto.password;
    if (updateUsersDto.alias) user.alias = updateUsersDto.alias;
    if (updateUsersDto.is_remove) user.is_remove = updateUsersDto.is_remove;

    return await this.usersRepository.save(user);

  }

  //4 更新密码
  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<UsersEntity> {
    const findOneUsersDto = new FindOneUsersDto();
    findOneUsersDto.id = updatePasswordDto.user;
    const user = await this.findOne(findOneUsersDto);

    //使用entity里面comparePassword 方法对密码是否正确
    const pass = await user.comparePassword(updatePasswordDto.password);
    if (!pass) {
      throw new BadRequestException('密码验证失败，请重新驶入正确的密码');
    }
    user.password = updatePasswordDto.newPassword;
    return await this.usersRepository.save(user);
  }


  // 根据名称查找用户
  async findByName(username:string){
     return  await this.usersRepository.findOne({username})
  }



  //5删除
  async remove(removeUsersDto: RemoveUsersDto): Promise<any> {
    const findOneUsersDto = new FindOneUsersDto();
    findOneUsersDto.id = removeUsersDto.user;
    const user = await this.findOne(findOneUsersDto);
    await this.usersRepository.delete(user.id);
    return;
  }


}
