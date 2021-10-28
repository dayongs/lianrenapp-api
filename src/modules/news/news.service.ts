import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {NewsEntity} from "./news.entity";
import {Repository} from "typeorm";
import {FindAllNewsDto} from "./dto/find.all.news.dto";
import {FindOneNewsDto} from "./dto/find.one.news.dto";
import {CreateNewsDto} from "./dto/create.news.dto";
import {UpdateNewsDto} from "./dto/update.news.dto";
import {RemoveNewsDto} from "./dto/remove.news.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository:Repository<NewsEntity>
  ) {}



 async findAll(findAllNewsDto:FindAllNewsDto){
    const  wheres={}
    //分页
   let skip, take;
   console.log('携带参数',findAllNewsDto);
   //分页
   if (findAllNewsDto.pageNum) {
     skip = findAllNewsDto.pageSize * (findAllNewsDto.pageNum - 1);//当前页 current
     take = findAllNewsDto.pageSize;//每页限制多少数量
   }
   if (findAllNewsDto.pageSize) {
     take = findAllNewsDto.pageSize;//每页限制多少数量
   }

    // const skip = findAllNewsDto.pageSize * (findAllNewsDto.pageNum-1)//当前页 current
    // const take = findAllNewsDto.pageSize
   if (findAllNewsDto.is_focus) {
     wheres['is_focus'] =1;//置顶
   }

   //分类
   if(findAllNewsDto.tag ){
     if(findAllNewsDto.tag!=='all'){
       wheres['tag']=findAllNewsDto.tag
     }

   }

   wheres['is_remove']=0



   //select  id，title  where   id>  5 order by id asc limit 1；
//上一页
   if (findAllNewsDto.pre) {
     take = 1;
     const res=  this.newsRepository.createQueryBuilder()
       .take(take)
       .where(wheres)
       .andWhere(`id < :id `,{id:findAllNewsDto.pre})
       .addOrderBy('id', 'DESC')
       .getManyAndCount();
     return res
   }
   //下一页
   if (findAllNewsDto.next) {
     take = 1;
    const res= this.newsRepository.createQueryBuilder()
       .take(take)
       .where(wheres)
       .andWhere(`id > :id `,{id:findAllNewsDto.next})
       .addOrderBy('id', 'ASC')
       .getManyAndCount();
    console.log(res)
     return res
   }


   return this.newsRepository.createQueryBuilder()
     .skip(skip).take(take)
     // .orderBy('is_top','DESC')
     .where(wheres)
     .addOrderBy('id', 'DESC')
     .getManyAndCount();
 }



  async findOne(findOneNewsDto:FindOneNewsDto){
   const news=await this.newsRepository.findOne(findOneNewsDto.id )
    if(!news ||(news.is_remove===true) ){
      throw new NotFoundException(`not for  news ${findOneNewsDto.id}`)
    }
    return news
  }


  async create (createNewsDto:CreateNewsDto){
    const news=new NewsEntity()
    // news.tag=createNewsDto.tag
    news.content=createNewsDto.content
    news.title=createNewsDto.title
    news.author=createNewsDto.author
    news.source=createNewsDto.source
    return  await this.newsRepository.save(news)
  }


  async update(updateNewsDto:UpdateNewsDto){
    const findOneNewsDto=new FindOneNewsDto()
    findOneNewsDto.id= updateNewsDto.news
    const news=await this.findOne(findOneNewsDto)
    if(updateNewsDto.title)news.title=updateNewsDto.title
    if(updateNewsDto.content)news.content=updateNewsDto.content
    if(updateNewsDto.tag)news.tag=updateNewsDto.tag
    if(updateNewsDto.author)news.author=updateNewsDto.author
    if(updateNewsDto.source)news.source=updateNewsDto.source
    if(updateNewsDto.is_focus || (updateNewsDto.is_focus===false))news.is_focus=!news.is_focus
    if(updateNewsDto.is_remove || (updateNewsDto.is_remove===0))news.is_remove=updateNewsDto.is_remove
    return  await this.newsRepository.save(news)
  }



  async remove (removeNewsDto:RemoveNewsDto){
    const findOneNewsDto=new FindOneNewsDto()
    const news=await this.findOne(findOneNewsDto)

    await this.newsRepository.delete(news.id)
    return
  }




}
