import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MapLayerService } from "./map-layer.service";
import { CreateMapLayerDto } from "./dto/create-map.dto";
import { UpdateMapLayerDto } from "./dto/update-map.dto";


@Controller('maps/:mapId/layers')
export class MapLayerController{
    constructor(private readonly mapLayerService:MapLayerService) {}

    @Get()
    getAll(@Param('mapId') mapId: number) {
        return this.mapLayerService.getAll(mapId);
    }

    @Get(':id')
    getOne(@Param('mapId') mapId: number, @Param('id') id: number) {
        return this.mapLayerService.getOne(mapId, id);
    }

    @Post()
    create(@Param('mapId') mapId: number, @Body() dto: CreateMapLayerDto) {
        return this.mapLayerService.create(mapId, dto);
    }

    @Patch(':id')
    update(
        @Param('mapId') mapId: number,
        @Param('id') id: number,
        @Body() dto: UpdateMapLayerDto,
    ) {
        return this.mapLayerService.update(mapId, id, dto);
    }

    @Delete(':id')
    remove(@Param('mapId') mapId: number, @Param('id') id: number) {
        return this.mapLayerService.remove(mapId, id);
    }
}