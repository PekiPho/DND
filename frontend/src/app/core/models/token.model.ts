
export interface Token {
  id: number;
  gridX: number;
  gridY: number;
  widthSquares: number;
  heightSquares: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  zIndex: number;
  imageUrl?: string;
  inCombat: boolean;
  initiative: number | null;
  name?: string;
  character?: {
    id: number;
    name: string;
  };
}