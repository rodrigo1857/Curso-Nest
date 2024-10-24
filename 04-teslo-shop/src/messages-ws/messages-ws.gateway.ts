import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({cors:true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss:Server
  constructor(private readonly messagesWsService: MessagesWsService) {}
  

  handleConnection(client: Socket) {
    //console.log('Cliente conectado')
    this.messagesWsService.registerClients(client)
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
    client.broadcast.emit('message-from-server', {
      fullName: 'Soy yo!!!!',
      message: payload.message||'no-message!!!!'
    })
  }

}
