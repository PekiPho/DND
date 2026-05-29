import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Map } from "./map.entity";

@Entity('map_layers')
export class MapLayer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'int', default: 0 })
  zIndex!: number;

  @Column({ default: true })
  isVisible!: boolean;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ default: 0 })
  gridX!: number;

  @Column({ default: 0 })
  gridY!: number;

  @Column({ type: 'float', default: 1.0 })
  scaleX!: number;

  @Column({ type: 'float', default: 1.0 })
  scaleY!: number;

  @Column({ type: 'float', default: 0.0 })
  rotation!: number;

  @ManyToOne(() => Map, (map) => map.layers, { onDelete: 'CASCADE' })
  map!: Map;
}