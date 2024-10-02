import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createAuthDto: CreateUserDto) {
    
    try {
      const user = this.userRepository.create(createAuthDto);
      await this.userRepository.save(user); 
      return user;
    } catch (error) {
      this.HandleError(error)
    }
    
  }

  
  private HandleError(error:any): never{
    if(error.code = '23505'){
      throw new BadRequestException(error.detail)      
  }
  throw new InternalServerErrorException('Error inesperado') 
  }
}

