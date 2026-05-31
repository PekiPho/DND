import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('maps/:mapId/tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  getAll( @Param('mapId') mapId:number){
    return this.tokenService.getAll(mapId);
  }

  @Get(':id')
  getOne(@Param('mapId') mapId:number, @Param('id') id:number){
    return this.tokenService.getOne(mapId,id);
  }

  @Post()
  create(@Param('mapId') mapId:number, @Body() dto:CreateTokenDto){
    return this.tokenService.create(mapId,dto);
  }

  @Patch(':id')
  update(@Param('mapId') mapId:number, @Param('id') id:number, @Body() dto:UpdateTokenDto){
    return this.tokenService.update(mapId,id,dto);
  }

  @Delete(':id')
  remove(@Param('mapId') mapId:number, @Param('id') id:number){
    return this.tokenService.remove(mapId,id);
  }
}
