import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';


interface ConnectedClients{
    [id: string]: {
        socket:Socket,
        user:User
    }
}
@Injectable()
export class MessagesWsService {
    private connectedClients:ConnectedClients={}
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ) {}
    
    
    async registerClients(client: Socket, userId:string){
        const user = await this.userRepository.findOneBy({id:userId})
        if(!user) throw new Error('User not found')
        if(!user.isActive) throw new Error('User not active')
    
        this.checkUserConection(user);   
        this.connectedClients[client.id] = {
            socket:client,
            user:user
        };
    }

    removeCLiente(clienteId:string){

        delete this.connectedClients[clienteId]
    }
    getConnectedClients():string[]{
        console.log(this.connectedClients)
        return Object.keys(this.connectedClients)
    }


    getUserFullName(clientId:string){
        return this.connectedClients[clientId].user.fullName
    }

    private checkUserConection(user:User){
        for (const clienteId of Object.keys(this.connectedClients)) {
            const conectedClient = this.connectedClients[clienteId];
            if(conectedClient.user.id === user.id) {
                conectedClient.socket.disconnect();
                break;
            }
        }
    }
}
