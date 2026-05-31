import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return null;
    return user;
  }

  async register(dto: RegisterDto) {
    const user = await this.userService.create(dto);
    return this.signToken(user.id, user.username);
  }

  async login(userId: number, username: string) {
    return this.signToken(userId, username);
  }


  private signToken(userId: number, username: string, roomIds: number[] = []) {
    const payload = { userId, username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
