export interface Room {
  id: number;
  name: string;
  description?: string;
  password?: string;
  maxPlayers: number;
  host?: any;
  players?: any[];
}
