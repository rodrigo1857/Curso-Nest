import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { IncomingHttpHeaders } from 'http';

import { ValidRoles } from './interface';
import { UserRoleGuard } from './guards/user-role.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.create(CreateUserDto);
  }


  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }

  
  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    console.log(user)
    return this.authService.checkAuthStatus(user);
  }


  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request:Express.Request
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
  ) {
    // console.log({user:request.user})
    console.log({ user })
    return {
      ok: true,
      message: 'Esta es una ruta privada',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

 

  @Get('private2')
  // @RoleProtected(ValidRoles.superUser,ValidRoles.admin)
  @SetMetadata('roles', ['admin','super-user'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }


  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }

}



