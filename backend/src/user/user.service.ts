import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ){}

  async findById(id:number){
    const user = await this.userRepo.findOneBy({id});

    if(!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async findByUsername(username:string){
    return this.userRepo.findOneBy({username});
  }

  async create(dto:CreateUserDto){
    const existing = await this.findByUsername(dto.username);

    if(existing) throw new ConflictException('Username Already Exists');

    const passwordHash= await bcrypt.hash(dto.password,10);
    const user= this.userRepo.create({username: dto.username,passwordHash});

    return this.userRepo.save(user);
  }

  async update(id:number,dto:UpdateUserDto){
    const user= await this.findById(id);

    if(dto.username) user.username= dto.username;
    if(dto.password) user.passwordHash= await bcrypt.hash(dto.password,10);

    return this.userRepo.save(user);
  }

  async remove(id:number){
    const user = await this.findById(id);
    return this.userRepo.remove(user);
  }
}
