import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'; 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    console.log(`[LocalStrategy] validate: username=${username}, password=${password}`)
    const user = await this.authService.checkCredentials(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}