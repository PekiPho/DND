export class CreateRoomDto {
  name!: string;
  password!: string;
  maxPlayers?: number;
}

export class JoinRoomDto {
  password!: string;
}