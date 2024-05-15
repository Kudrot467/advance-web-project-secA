import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import * as bcrypt from 'bcrypt';
@Entity('Booking')
export class Booking {
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




}

