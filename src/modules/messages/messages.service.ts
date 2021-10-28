
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "./message.entity";
import {Repository} from "typeorm";
import {FindAllMessageDto} from "./dto/find.all.message.dto";
import {FindOneMessageDto} from "./dto/find.one.message.dto";
import {CreateMessageDto} from "./dto/create.message.dto";
import {UpdateMessageDto} from "./dto/update.message.dto";
import {RemoveMessageDto} from "./dto/remove.message.dto";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository:Repository<MessageEntity>
  ) {}



  async findAll(findAllMessageDto:FindAllMessageDto){
    const  wheres={}
    //分页
    let skip, take;
    console.log('携带参数',findAllMessageDto);
    //分页
    if (findAllMessageDto.pageNum) {
      skip = findAllMessageDto.pageSize * (findAllMessageDto.pageNum - 1);//当前页 current
      take = findAllMessageDto.pageSize;//每页限制多少数量
    }
    if (findAllMessageDto.pageSize) {
      take = findAllMessageDto.pageSize;//每页限制多少数量
    }

    // const skip = findAllMessageDto.pageSize * (findAllMessageDto.pageNum-1)//当前页 current
    // const take = findAllMessageDto.pageSize
    if (findAllMessageDto.is_focus) {
      wheres['is_focus'] =1;//置顶
    }

    //分类
    // if(findAllMessageDto.tag ){
    //   if(findAllMessageDto.tag!=='all'){
    //     wheres['tag']=findAllMessageDto.tag
    //   }
    //
    // }

    wheres['is_remove']=0



    //select  id，title  where   id>  5 order by id asc limit 1；
//上一页
    if (findAllMessageDto.pre) {
      take = 1;
      const res=  this.messageRepository.createQueryBuilder()
        .take(take)
        .where(wheres)
        .andWhere(`id < :id `,{id:findAllMessageDto.pre})
        .addOrderBy('id', 'DESC')
        .getManyAndCount();
      return res
    }
    //下一页
    if (findAllMessageDto.next) {
      take = 1;
      const res= this.messageRepository.createQueryBuilder()
        .take(take)
        .where(wheres)
        .andWhere(`id > :id `,{id:findAllMessageDto.next})
        .addOrderBy('id', 'ASC')
        .getManyAndCount();
      console.log(res)
      return res
    }


    return this.messageRepository.createQueryBuilder()
      .skip(skip).take(take)
      // .orderBy('is_top','DESC')
      .where(wheres)
      .addOrderBy('id', 'DESC')
      .getManyAndCount();
  }



  async findOne(findOneMessageDto:FindOneMessageDto){
    const message=await this.messageRepository.findOne(findOneMessageDto.id )
    if(!message ||(message.is_remove===true) ){
      throw new NotFoundException(`not for  message ${findOneMessageDto.id}`)
    }
    return message
  }


  async create (createMessageDto:CreateMessageDto){
    const message=new MessageEntity()
    // message.content=createMessageDto.tag
    message.content=createMessageDto.content
    message.phone=createMessageDto.phone
    message.author=createMessageDto.author
    message.mail=createMessageDto.mail
    return  await this.messageRepository.save(message)
  }


  async update(updateMessageDto:UpdateMessageDto){
    const findOneMessageDto=new FindOneMessageDto()
    findOneMessageDto.id= updateMessageDto.message
    const message=await this.findOne(findOneMessageDto)
    if(updateMessageDto.phone)message.phone=updateMessageDto.phone
    if(updateMessageDto.content)message.content=updateMessageDto.content
    // if(updateMessageDto.tag)message.tag=updateMessageDto.tag
    if(updateMessageDto.author)message.author=updateMessageDto.author
    if(updateMessageDto.mail)message.mail=updateMessageDto.mail
    // if(updateMessageDto.is_focus || (updateMessageDto.is_focus===false))message.is_focus=!message.is_focus
    if(updateMessageDto.is_remove || (updateMessageDto.is_remove===0))message.is_remove=updateMessageDto.is_remove
    return  await this.messageRepository.save(message)
  }



  async remove (removeMessageDto:RemoveMessageDto){
    const findOneMessageDto=new FindOneMessageDto()
    const message=await this.findOne(findOneMessageDto)

    await this.messageRepository.delete(message.id)
    return
  }




}
