import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async checkCredentials(username: string, password: string): Promise<boolean> {
    // Find the user by username
    const user: User | undefined = await this.usersService.findByUsername(username);
    
    // If the user does not exist, return false
    if (!user) {
      return false;
    }
   
    // Check if the provided password matches the user's password
    const isPasswordValid: boolean = await this.comparePassword(password, user.password);
    return isPasswordValid;
  }

  async signIn(user: any) {

    const isCredentialsValid = await this.checkCredentials(user.username, user.password);
    if (!isCredentialsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.sign(payload),
      email: user.email,
      name: user.name
    };
  }
  

}
