import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateRoomDto } from "./dto/create-room.dto";
import { CreateFaqDto } from "../faq/dto/create-faq.dto";
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Room } from 'src/admin/entities/admin.entity';
import { faq } from 'src/faq/entities/faq.entity';
import { promises } from 'dns';
import { AllUser } from 'src/all-user/entities/all-user.entity';

@Injectable()
export class adminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    @InjectRepository(faq) private readonly faqRepo: Repository<faq>,
    @InjectRepository(AllUser) private readonly alluserrepo: Repository<AllUser>,
  ) {}

  async findAll() {
   
    return await this.adminRepo.find({});
  }

  async findById(id: number) {
    
    return await this.adminRepo.find({ where: { id: id } });
  }

  async create(createProductDto: CreateAdminDto) {
    const admin = await this.adminRepo.create(createProductDto);
    return await this.adminRepo.save(admin);
  }

  async addfaq(createFaqDto: CreateFaqDto) {
    const faq = await this.faqRepo.create(createFaqDto);
    return await this.faqRepo.save(faq);
  }
  async deleteById(id: number) {
    return this.adminRepo.delete(id);
}

async removeByName(name: string) {
 
  return this.adminRepo.delete({ name: name });
}

async createroom(createRoomDto: CreateRoomDto) {
  const admin = await this.roomRepo.create(createRoomDto);
  return await this.roomRepo.save(admin);
}



async FindAllrooms() {
   
    return await this.roomRepo.find({});
  }


  async removeById(id:number) {
  
  return this.alluserrepo.delete({ id: id });
}


}
