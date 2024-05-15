import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import * as bcrypt from 'bcrypt';
  
  @Entity('Admin')
  export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique:false, nullable: false })
    name: string;
  
    @Column({ unique: true, nullable: false })
    password: string;

    @Column({ unique: true, nullable: false })
    email: string;
  }

  @Entity('Room')
  export class Room {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique:false, nullable: false })
    Hotelname: string;
  
    @Column({ unique: false, nullable: false })
    price: string;

    @Column({ unique: false, nullable: false })
      location: string;

      @Column({ unique: false, nullable: false })
      type: string;

      @Column({ unique: false, nullable: true })
      review: string;

 

 
}

  
  