import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat/chat.service';

@WebSocketGateway({cors: {origin: '*'}})
export class EventsGateway{
    @WebSocketServer()
    server!: Server;

    constructor(private chatService: ChatService) {}

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@MessageBody() data: { roomId: string; username: string }, @ConnectedSocket() client: Socket) {
        client.join(data.roomId);

        const pastMessages = await this.chatService.getMessages(Number(data.roomId), undefined, 50);
        for (const msg of pastMessages) {
        client.emit('chatMessage', {
            id: msg.id,
            username: msg.sender?.username || 'Unknown',
            message: msg.message,
            isRoll: msg.diceRoll
        });
        }

        this.server.to(data.roomId).emit('chatMessage', {
            username: 'System',
            message: `${data.username || 'Someone'} entered the realm.`,
            isRoll: false
        });
    }

    @SubscribeMessage('loadMoreMessages')
    async handleLoadMoreMessages(@MessageBody() data: { roomId: string; beforeId: number }, @ConnectedSocket() client: Socket) {
        const olderMessages = await this.chatService.getMessages(Number(data.roomId), data.beforeId, 50);
        
        const formatted = olderMessages.map(msg => ({
        id: msg.id,
        username: msg.sender?.username || 'Unknown',
        message: msg.message,
        isRoll: msg.diceRoll
        }));
        client.emit('moreMessagesLoaded', formatted);
    }

    @SubscribeMessage('chatMessage')
    async handleChatMessage(@MessageBody() data:any, @ConnectedSocket() client: Socket){
        if(data.senderId && data.roomId){
            await this.chatService.create(Number(data.roomId),{
                message: data.message,
                diceRoll: data.isRoll,
                senderId: data.senderId
            });
        }

        this.server.to(data.roomId).emit('chatMessage',data);
    }
}