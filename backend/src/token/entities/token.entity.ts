import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Map } from "../../map/entities/map.entity";
import { Character } from "../../character/entities/character.entity";


@Entity('tokens')
export class Token {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({default:0})
    gridX!:number;

    @Column({default:0})
    gridY!:number;

    @Column({default:1})
    widthSquares!: number;

    @Column({default:1})
    heightSquares!:number;

    @Column({type: 'float',default:1.0})
    scaleX!:number;

    @Column({type: 'float',default:1.0})
    scaleY!:number;

    @Column({type: 'float',default:1})
    rotation!:number;

    @Column({ type: 'int', default: 9999 })
    zIndex!: number;

    @Column({nullable:true})
    imageUrl!:string;

    @ManyToOne(()=> Map, (map)=> map.tokens, {onDelete: 'CASCADE'})
    map!: Map;

    @ManyToOne(()=> Character, (character)=> character.tokens, {nullable:true,onDelete:'CASCADE'})
    character!:Character;

}
