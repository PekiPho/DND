import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../room/entities/room.entity";
import { MapLayer } from "./map-layer.entity";
import { Token } from "../../token/entities/token.entity";

@Entity('maps')
export class Map {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: false })
  isActive!: boolean;

  @ManyToOne(() => Room, (room) => room.maps, { onDelete: 'CASCADE' })
  room!: Room;

  @OneToMany(() => MapLayer, (layer) => layer.map)
  layers!: MapLayer[];

  @OneToMany(() => Token, (token) => token.map)
  tokens!: Token[];
}