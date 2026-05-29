import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../room/entities/room.entity";
import { User } from "../../user/entities/user.entity";

@Entity('chats')
export class Chat {

    @PrimaryGeneratedColumn()
    id! : number;

    @Column({type:'text'})
    message!:string;

    @Column({default:false})
    diceRoll!:boolean;

    @CreateDateColumn()
    createdAt!:Date;

    @ManyToOne(()=>Room, (room)=>room.chats, {onDelete: 'CASCADE'})
    room!:Room;

    @ManyToOne(()=>User,{eager:true})
    sender!:User;
}
