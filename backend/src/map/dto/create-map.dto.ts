export class CreateMapLayerDto {
  name!: string;
  zIndex?: number;
  isVisible?: boolean;
  imageUrl?: string;
  gridX?: number;
  gridY?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
}

export class CreateMapDto {
  name!: string;
  isActive?: boolean;
}