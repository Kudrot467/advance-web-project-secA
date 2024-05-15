import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import * as bcrypt from 'bcrypt';
  
  @Entity('faq')
  export class faq {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique:false, nullable: false })
    question: string;
  
    @Column({ unique: true, nullable: false })
    answer: string;

    
  }