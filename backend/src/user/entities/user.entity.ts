import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../room/entities/room.entity";
import { Character } from "../../character/entities/character.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    username!:string;

    @Column()
    passwordHash!: string;


    @OneToMany(()=> Room,(room)=>room.host)
    hostedRooms!: Room[];

    @ManyToMany(()=>Room,(room)=>room.players)
    @JoinTable({name: 'user_joined_rooms'})
    joinedRooms!: Room[];

    @OneToMany(()=>Character, (character)=> character.user)
    characters!: Character[];
}
