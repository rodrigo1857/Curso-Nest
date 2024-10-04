import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import *as bcrypt from 'bcrypt'

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createAuthDto: CreateUserDto) {
    
    try {
      const {password, ...userData} = createAuthDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password,10)
      }
        );
      await this.userRepository.save(user); 
      return user;
    } catch (error) {
      this.HandleError(error)
    }
    
  }

  
  async login(loginUserDto: LoginUserDto) {

      const {email,password} = loginUserDto;
      const user = await this.userRepository.findOne({
        where:{email},
        select:{email:true,password:true}
      });
      console.log(email);
      console.log(password);
      console.log(user);

      if(!user){
        throw new UnauthorizedException('Usuario no encontrado ')
      }

      if(!bcrypt.compareSync(password,user.password))
        throw new UnauthorizedException('Credenciales no son correctas por la contraseña')
      
      return user;

      //TODO implementar JWT
   
  }




  private HandleError(error:any): never{
    if(error.code = '23505'){
      throw new BadRequestException(error.detail)      
  }
  throw new InternalServerErrorException('Error inesperado') 
  }



}

