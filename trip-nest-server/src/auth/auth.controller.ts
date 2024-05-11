import { Controller, Post, HttpCode, HttpStatus, Request, UsePipes, ValidationPipe, Session, Body, UnauthorizedException, NotFoundException, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import session from 'express-session';
import { Login } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SessionGuard } from 'src/users/SessionGuard.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiCreatedResponse({
    description:'login success'
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: Login,@Session() session): Promise<User | { message: string }>  {
    const user = await this.usersService.getUserLoginInfoByEmail(data.email);
    console.log(user)
  if (user != null) {
    const res = await this.usersService.login(data.password,user.password);
    console.log(res);

    if (res) {
      if (user ) {
        
        session.user = user;
        console.log(user);
        return user;
      } else {
        throw new UnauthorizedException({ message: 'Unauthorized User' });
      }
    } else {
      throw new NotFoundException({ message: 'Wrong Email or Password' });
    }
  } else {
    throw new UnauthorizedException({ message: 'User is not authorized' });
  }
  }

  @Get('logout')
@UseGuards(SessionGuard)
async logout(@Session() session) {
  if (session.user) {
    session.destroy();
    return { message: 'Logout successful' };
  } else {
    return { message: 'No user in the session' };
  }
}

}
