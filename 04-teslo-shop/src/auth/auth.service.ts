import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import *as bcrypt from 'bcrypt'

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
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
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({id:user.id})
      };
    } catch (error) {
      this.HandleError(error)
    }
    
  }

  
  async login(loginUserDto: LoginUserDto) {

      const {email,password} = loginUserDto;
      const user = await this.userRepository.findOne({
        where:{email},
        select:{email:true,password:true, id:true}
      });

      if(!user){
        throw new UnauthorizedException('Usuario no encontrado ')
      }

      if(!bcrypt.compareSync(password,user.password))
        throw new UnauthorizedException('Credenciales no son correctas por la contraseña')
      
      return {
        ...user,
        token: this.getJwtToken({id:user.id})
      };
   
  }

  private getJwtToken(payload:JwtPayload){  
    const token = this.jwtService.sign(payload);
    return token;

  }


  private HandleError(error:any): never{
    if(error.code = '23505'){
      throw new BadRequestException(error.detail)      
  }
  throw new InternalServerErrorException('Error inesperado') 
  }



}

