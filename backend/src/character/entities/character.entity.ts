import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "../../token/entities/token.entity";
import { Spell } from "../../spell/entities/spell.entity";
import { Item } from "../../item/entities/item.entity";
import { User } from "../../user/entities/user.entity";
import { Room } from "../../room/entities/room.entity";

@Entity('characters')
export class Character {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'enum', enum: ['pc', 'npc', 'monster'], default: 'pc' })
  type!: 'pc' | 'npc' | 'monster';

  @Column({ nullable: true })
  notes!: string;

  @Column({ nullable: true })
  race!: string;

  @Column({ nullable: true })
  class!: string;

  @Column({ default: 1 })
  level!: number;

  @Column({ default: 0 })
  experiencePoints!: number;

  @Column({ nullable: true })
  alignment!: string;

  // STR, DEX, CON, INT, WIL, PCP, CHA
  @Column({ type: 'json' })
  stats!: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wil: number;
    pcp: number;
    cha: number;
  };

  @Column({ default: 10 })
  hp!: number;

  @Column({ default: 10 })
  maxHp!: number;


  @Column({ type: 'json' })
  savingThrows!: {
    paralysisPoison: number;
    rodStaffWand: number;
    petrificationPolymorph: number;
    breathWeapon: number;
    spell: number;
  };

  @Column({ default: 10 })
  armorClass!: number;

  @Column({ type: 'json', nullable: true })
  currency!: { my: number; gp: number; sp: number; cp: number };

  @ManyToOne(() => User, (user) => user.characters, { nullable: true })
  user!: User;

  @ManyToMany(() => Room, (room) => room.participants)
  joinedRooms!: Room[];

  @OneToMany(() => Item, (item) => item.character)
  items!: Item[];

  @OneToMany(() => Spell, (spell) => spell.character)
  spells!: Spell[];

  @OneToMany(() => Token, (token) => token.character)
  tokens!: Token[];
}