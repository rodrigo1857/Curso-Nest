import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';


interface ConnectedClients{
    [id: string]: Socket
}
@Injectable()
export class MessagesWsService {
    private connectedClients:ConnectedClients={}

    registerClients(client: Socket){
        this.connectedClients[client.id] = client
    }

    removeCLiente(clienteId:string){

        delete this.connectedClients[clienteId]
    }
    getConnectedClients():number{
        return Object.keys(this.connectedClients).length
    }
}
