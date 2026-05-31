
export class CreateItemDto {
  name!: string;
  description?: string;
  quantity?: number;
  weight?: number;
  value?: number;
  effects?: any;
  characterId?: number;
  roomId?: number;
}

export class MoveItemDto{
    characterId?:number;
    roomId?:number;
}