import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}
  async findByUsername(username: string): Promise<User | undefined>{
    return await this.userRepository.findOne({ where: { username }});
  }
  async getUserLoginInfoByEmail(email: string):  Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email: email })
  }
  async login(inputPassword: string, userPassword: string): Promise<boolean> {
    try {
      // const match: boolean = await bcrypt.compare(inputPassword, userPassword);
      console.log(inputPassword,userPassword);
    if(inputPassword===userPassword){
      return true;
    }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async create(createUserDto: CreateUserDto): Promise<User>{
    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
  async findAll(){
    return await this.userRepository.find({});
  }
  async remove(id: number): Promise<void> {
    const userToRemove = await this.userRepository.findBy({userId : id});
    if (!userToRemove) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(userToRemove);
  }
}
