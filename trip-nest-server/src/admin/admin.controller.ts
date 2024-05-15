import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    ParseIntPipe,
    ValidationPipe,
    UseGuards,
    UseInterceptors,
    Delete
} from '@nestjs/common';
import { CreateAdminDto } from "./dto/create-admin.dto";
import { CreateRoomDto } from "./dto/create-room.dto";
import { CreateFaqDto } from "../faq/dto/create-faq.dto";
import { adminService } from "./admin.service";

// import { SessionGuard } from "./session.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Admin, Room } from "src/admin/entities/admin.entity";
// import { Rider } from "src/rider/entities/rider.entity";
interface FileParams { fileName: string; }
@Controller('admin')

export class AdminController {
    constructor(private readonly adminService: adminService) {
    }

    @Get('allroom')
    // @UseGuards(SessionGuard)
    async FindAllrooms() {
        return this.adminService.FindAllrooms();
    }


    @Get(":id")
    // @UseGuards(SessionGuard)
    findOne(@Param("id") id: number) {
        return this.adminService.findById(id);
    }




    @Get()
    // @UseGuards(SessionGuard)
    findAll() {
        return this.adminService.findAll();
    }





    @Post('create')
    createAdmin(@Body(ValidationPipe) CreateAdminDto: CreateAdminDto) {
        return this.adminService.create(CreateAdminDto);
    }

    @Post('addfaq')
    addfaq(@Body(ValidationPipe) CreateFaqDto: CreateFaqDto) {
        return this.adminService.addfaq(CreateFaqDto);
    }



    // @Patch(":id")
    // // @UseGuards(SessionGuard)
    // update(@Param("id") id:number, @Body()UpdateAdminDto:UpdateAdminDto){
    //     return this.adminService.update(id,UpdateAdminDto);
    // }

    @Delete(':id')
    // @UseGuards(SessionGuard)
    remove(@Param('id') id: number) {
        return this.adminService.deleteById(+id);
    }

    @Delete(":name")
    // @UseGuards(SessionGuard)
    removeByName(@Param('name') name: string) {
        return this.adminService.removeByName(name);
    }


    @Post('/addroom')
    createroom(@Body(ValidationPipe) CreateRoomDto: CreateRoomDto) {
        return this.adminService.createroom(CreateRoomDto);
    }



    @Delete("remove/:id")
    // @UseGuards(SessionGuard)
    removeById(@Param('id') id: number) {
        return this.adminService.removeById(id);
    }







}