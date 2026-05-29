import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "../../character/entities/character.entity";
import { Room } from "../../room/entities/room.entity";


@Entity('items')
export class Item {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column({type: 'text', nullable: true})
    description!:string;

    @Column({default:1})
    quantity!:number;

    @Column({type:'float', default:0.0})
    weight!:number;

    @Column({default:0})
    value!:number;

    @Column({type: 'json', nullable:true})
    effects!: any;

    @ManyToOne(()=>Character, (character)=> character.items, {nullable:true,onDelete: 'CASCADE'})
    character!: Character;

    @ManyToOne(()=> Room, { nullable:true, onDelete: 'CASCADE'})
    room!:Room;
}
