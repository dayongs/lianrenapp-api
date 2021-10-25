import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity({name:"users"})
export class UsersEntity {
  @PrimaryGeneratedColumn({
    type:"int",
    name:'id'
  })
  id:number;




  //登陆账号
  @Column("varchar",{
    unique: true,//登陆账号唯一的
    comment: '登陆账号'
  })
  username:string;


  //密码
  @Column("longtext",{  comment: '密码'
  })
  @Exclude()//排除显示密码
  password:string


  //名称
  @Column("varchar",{
    length:50,
    name:"alias",
    comment: '名称',
    default:''
  })
  alias:string


  //是否删除
  @Column({
    name:"is_remove",
    comment: '是否删除:1为删除',
    default:false
  })
  is_remove:boolean



  @CreateDateColumn()
  created:Date

  @UpdateDateColumn()
  updated:Date


  @BeforeInsert()//插入前执行函数
  @BeforeUpdate()//更新前也 执行函数
  async  hashPassword(){
    this.password=await bcrypt.hash(this.password,12)//插入前将密码hash
  }

  async comparePassword(password:string){
    return await  bcrypt.compare(password,this.password)
  }







  //方式一

  // @Column({
  //   name:"created_at",
  //   type:"datetime",
  //   default: () => "CURRENT_TIMESTAMP",
  //   comment: '创建时间'
  // })
  // created_at:Date



  // @CreateDateColumn({
  //   name:"created_at",
  //   type:"datetime",
  //   comment: '创建时间'
  // })
  // created:string
  //
  // @UpdateDateColumn({
  //   name:"updated_at",
  //   type:"timestamp",
  //   comment: '更新时间'
  // })
  // updated:string





}
