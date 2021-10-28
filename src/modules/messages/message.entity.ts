import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
// import { NewsTag } from '../../common/enums/news.tag';



@Entity({name:'messages'})
export class MessageEntity {
  @PrimaryGeneratedColumn({
    type:"int",
    name:"id"
  })
  id:number

  // @Column({
  //   type:"varchar",
  //   length:"255"
  // })
  // title:string

  @Column({
    type:"varchar",
    length:"50",
    comment: '发布者名称',
  })
  author:string



  @Column({
    type:"varchar",
    length:"100",
    comment: '邮箱',
  })
  mail:string

  @Column({
    type:"varchar",
    length:"100",
    comment: '电话',
  })
  phone:string



  @Column({
    type:"text",
    comment: '信息内容',
  })
  content:string | null;

  // @Column({
  //   name:"tag",
  //   type:"enum",
  //   comment: '分类',
  //   enum: [NewsTag.company,NewsTag.industry , NewsTag.notice],
  //   // default: NewsTag.company,
  // })
  // tag:string | null;

  // @Column({
  //   name:"is_focus",
  //   comment: '是否置顶:1为置顶',
  //   default:false
  // })
  // is_focus:boolean


  @Column({
    name:"is_remove",
    comment: '是否删除:1为删除',
    default:false
  })
  is_remove:boolean




//   @CreateDateColumn({
//     name:"created_at",
//     type:"datetime",
//     comment: '创建时间'
// })
//   created_at:string
//
//
//
//
//   @UpdateDateColumn({
//     name:"updated_at",
//     type:"timestamp",
//     comment: '更新时间'
//   })
//   updated_at:string


  @CreateDateColumn()
  created:Date

  @UpdateDateColumn()
  updated:Date

  // @CreateDateColumn("datetime",{
  //   name:"created_at",
  //   // default: () => "CURRENT_TIMESTAMP",
  // })
  // created_at:Date
  // private datefield: Date



}
