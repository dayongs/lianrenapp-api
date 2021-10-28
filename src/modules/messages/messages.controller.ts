
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {MessagesService} from "./messages.service";
import {FindAllMessageDto} from "./dto/find.all.message.dto";
import {FindOneMessageDto} from "./dto/find.one.message.dto";
import {MessageEntity} from "./message.entity";
import {CreateMessageDto} from "./dto/create.message.dto";
import {UpdateMessageDto} from "./dto/update.message.dto";
import {RemoveMessageDto} from "./dto/remove.message.dto";



@Controller('message')
export class MessagesController {
  constructor(
    private readonly messagesService:MessagesService
  ) {}

  @Get()
  async findAll(
    @Query()findAllMessageDto:FindAllMessageDto
  ){
    console.log('222',findAllMessageDto)
    const res= await this.messagesService.findAll(findAllMessageDto)
    console.log(333,res[0])
    return res
  }


  @Get(':message')
  async findOne(
    @Query()findOneMessageDto:FindOneMessageDto,
    @Param('message')message:any
  ):Promise<MessageEntity>{
    findOneMessageDto.id=message
    return await this.messagesService.findOne(findOneMessageDto)
  }


  @Post()
  async create(
    @Body()createMessageDto:CreateMessageDto
  ):Promise<MessageEntity>{
    console.log('提交信息',createMessageDto);
    return await this.messagesService.create(createMessageDto)
  }


  @Put(':message')
  async update(
    @Param('message')message:any,
    @Body()updateMessageDto:UpdateMessageDto
  ):Promise<MessageEntity>{
    updateMessageDto.message=message
    return await this.messagesService.update(updateMessageDto)
  }


  @Delete(':message')
  async remove(
    @Param('message')message:any,
    @Query()removeMessageDto:RemoveMessageDto
  ){
    removeMessageDto.message=message
    return await this.messagesService.remove(removeMessageDto)
  }




}
