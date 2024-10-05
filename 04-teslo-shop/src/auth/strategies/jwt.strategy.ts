import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "process";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ){
        super({
           secretOrKey:configService.get('JWT_SECRET'),
           jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
           
    });
    }

    async validate(payload: JwtPayload):Promise<any>{

        const{email} = payload;
        const user = await this.userRepository.findOneBy({email});
        if(!user)
        throw new UnauthorizedException('Token no es valido')

        if(!user.isActive)
        throw new UnauthorizedException('Usuario no activo')
        return user;
    }
}