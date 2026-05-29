import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from './entities/map.entity';
import { MapLayer } from './entities/map-layer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Map,MapLayer])],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
