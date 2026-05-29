import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../room/entities/room.entity";
import { Character } from "../../character/entities/character.entity";

@Entity('combat-tracker')
export class CombatTracker {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    roll!: number;

    @Column({ type: 'int', default: 0 })
    order!: number;

    @ManyToOne(() => Character, { onDelete: 'CASCADE', eager: true })
    character!: Character;

    @ManyToOne(() => Room, (room) => room.initiativeEntries, { onDelete: 'CASCADE' })
    room!: Room;
}