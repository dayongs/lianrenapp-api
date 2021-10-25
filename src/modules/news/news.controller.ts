import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {NewsService} from "./news.service";
import {FindAllNewsDto} from "./dto/find.all.news.dto";
import {FindOneNewsDto} from "./dto/find.one.news.dto";
import {NewsEntity} from "./news.entity";
import {CreateNewsDto} from "./dto/create.news.dto";
import {UpdateNewsDto} from "./dto/update.news.dto";
import {RemoveNewsDto} from "./dto/remove.news.dto";



@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService:NewsService
  ) {}

  @Get()
  async findAll(
    @Query()findAllNewsDto:FindAllNewsDto
  ){
    console.log('222',findAllNewsDto)
    const res= await this.newsService.findAll(findAllNewsDto)
    console.log(333,res[0])
    return res
  }


  @Get(':news')
  async findOne(
    @Query()findOneNewsDto:FindOneNewsDto,
    @Param('news')news:any
  ):Promise<NewsEntity>{
    findOneNewsDto.id=news
    return await this.newsService.findOne(findOneNewsDto)
  }


  @Post()
  async create(
    @Body()createNewsDto:CreateNewsDto
  ):Promise<NewsEntity>{
    return await this.newsService.create(createNewsDto)
  }


  @Put(':news')
  async update(
    @Param('news')news:any,
    @Body()updateNewsDto:UpdateNewsDto
  ):Promise<NewsEntity>{
    updateNewsDto.news=news
    return await this.newsService.update(updateNewsDto)
  }


  @Delete(':news')
  async remove(
    @Param('news')news:any,
    @Query()removeNewsDto:RemoveNewsDto
  ){
    removeNewsDto.news=news
    return await this.newsService.remove(removeNewsDto)
  }




}
