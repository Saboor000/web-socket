import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ChatMessage {
  user: string;
  text: string;
  time: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const username = this.connectedUsers.get(client.id);
    if (username) {
      console.log(`${username} disconnected`);
      this.connectedUsers.delete(client.id);
      this.broadcastUserList();
    }
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(client.id, username);
    console.log(`${username} joined with id ${client.id}`);
    this.broadcastUserList();

    // Welcome message to the user
    client.emit('receiveMessage', {
      user: 'System',
      text: `Welcome to the chat, ${username}!`,
      time: new Date().toLocaleTimeString(),
      isSystem: true,
    });
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { user: string; text: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ConnectedSocket() client: Socket,
  ) {
    const message: ChatMessage = {
      user: data.user,
      text: data.text,
      time: new Date().toLocaleTimeString(),
    };

    console.log(`Message from ${data.user}: ${data.text}`);
    this.server.emit('receiveMessage', message);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('userTyping', username);
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('userStopTyping');
  }

  private broadcastUserList() {
    const users = Array.from(this.connectedUsers.values());
    this.server.emit('userList', users);
  }
}
