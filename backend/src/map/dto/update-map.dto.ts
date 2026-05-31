export class UpdateMapLayerDto {
  name?: string;
  zIndex?: number;
  isVisible?: boolean;
  imageUrl?: string;
  gridX?: number;
  gridY?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
}

export class UpdateMapDto {
  name?: string;
  isActive?: boolean;
}