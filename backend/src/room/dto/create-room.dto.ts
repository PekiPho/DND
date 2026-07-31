export class CreateRoomDto {
  name!: string;
  password!: string;
  maxPlayers?: number;
  description?: string;
}

export class JoinRoomDto {
  password!: string;
}