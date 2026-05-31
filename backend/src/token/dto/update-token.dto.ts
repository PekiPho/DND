import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenDto } from './create-token.dto';

export class UpdateTokenDto {
  gridX?: number;
  gridY?: number;
  widthSquares?: number;
  heightSquares?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  zIndex?: number;
  imageUrl?: string;
  layerId?: number;
}
