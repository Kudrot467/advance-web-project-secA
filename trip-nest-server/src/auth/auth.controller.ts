import { Controller, Post, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description:'login success'
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Request() req: Request) {
    return this.authService.signIn(req.body);
  }
}
