import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MapLayer } from "./entities/map-layer.entity";
import { CreateMapLayerDto } from "./dto/create-map.dto";
import { UpdateMapLayerDto } from "./dto/update-map.dto";


@Injectable()
export class MapLayerService{
    constructor(
        @InjectRepository(MapLayer)
        private layerRepo: Repository<MapLayer>,
    ) {}   

    async getAll(mapId:number){
        return this.layerRepo.find({
            where: {map: {id:mapId}},
            order: {zIndex: 'ASC'},
        });
    }

    async getOne(mapId:number, id:number){
        const layer= await this.layerRepo.findOne({
            where: {id, map: {id:mapId}}
        });

        if(!layer) throw new NotFoundException('Layer Not Found');

        return this.layerRepo.save(layer);
    }

    async create(mapId:number, dto: CreateMapLayerDto){
        const layer = this.layerRepo.create({
            ...dto,
            map: {id:mapId},
        });

        return this.layerRepo.save(layer);
    }

    async update(mapId:number, id:number, dto:UpdateMapLayerDto){
        const layer= await this.getOne(mapId,id);
        Object.assign(layer,dto);

        return this.layerRepo.save(layer);
    }

    async remove(mapId:number,id: number){
        const layer = await this.getOne(mapId, id);

        return this.layerRepo.remove(layer);
    }

}