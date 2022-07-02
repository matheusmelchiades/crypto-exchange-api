import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Exchange } from 'src/entities';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RateGateway {
  @WebSocketServer() private server: Server;

  sendRates(rates: Exchange[]) {
    this.server.emit('rates', rates);
  }
}
