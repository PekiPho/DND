import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Chat } from "../../chat/entities/chat.entity";
import { Map } from "../../map/entities/map.entity";
import { Character } from "../../character/entities/character.entity";
import { Item } from "../../item/entities/item.entity";




@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  passwordHash!: string;

  @Column({type: 'text',nullable:true})
  description! : string | null;

  @Column({ default: 5 })
  maxPlayers!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.hostedRooms)
  host!: User;

  @ManyToMany(() => User, (user) => user.joinedRooms)
  players!: User[];

  @ManyToMany(() => Character, (character) => character.joinedRooms)
  @JoinTable({ name: 'room_participants' })
  participants!: Character[];

  @OneToMany(() => Map, (map) => map.room)
  maps!: Map[];
  
  @OneToMany(() => Chat, (chat) => chat.room)
  chats!: Chat[];

  @OneToMany(() => Item, (item) => item.room)
  items!: Item[];
}