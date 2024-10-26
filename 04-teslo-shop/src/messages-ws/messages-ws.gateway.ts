import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interface';

@WebSocketGateway({cors:true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss:Server
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}
  

  async handleConnection(client: Socket) {
    //console.log('Cliente conectado')
    const token = client.handshake.headers.authentication as string
    let payload : JwtPayload;
    try {
        payload = this.jwtService.verify(token)
        await this.messagesWsService.registerClients(client,payload.id)
    } catch (error) {
      client.disconnect(); 
      return; 
    }
    //console.log({payload})
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
    // console.log({
    //   connectedClients: this.messagesWsService.getConnectedClients()
    // })
  }


  handleDisconnect(client: Socket) {
    
    //console.log('Cliente desconectado',client.id)
    this.messagesWsService.removeCLiente(client.id)
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())

  }

  @SubscribeMessage('message-from-client')
  onMessageClient(client: Socket, payload: NewMessageDto) {
  //   client.broadcast.emit('message-from-server', {
  //     fullName: 'Soy yo!!!!',
  //     message: payload.message||'no-message!!!!'
  //   })

    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message||'no-message!!!!'
  });
}

}
