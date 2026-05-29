import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "../../character/entities/character.entity";

@Entity('spells')
export class Spell {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  school!: string; 

  @Column({ default: 1 })
  level!: number;

  @Column({ default: 1 })
  castingTime!: number;

  @Column({ type: 'simple-array', nullable: true })
  components!: string[]; 

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  range!: string;

  @Column({ nullable: true })
  duration!: string;

  @Column({ type: 'json', nullable: true })
  effects!: any

  @ManyToOne(() => Character, (character) => character.spells, { onDelete: 'CASCADE' })
  character!: Character;
}