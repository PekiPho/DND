
export class CreateCharacterDto {
  name!: string;
  type?: 'pc' | 'npc' | 'monster';
  notes?: string;
  race?: string;
  class?: string;
  level?: number;
  experiencePoints?: number;
  alignment?: string;
  stats!: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wil: number;
    pcp: number;
    cha: number;
  };
  hp?: number;
  maxHp?: number;
  savingThrows?: {
    paralysisPoison: number;
    rodStaffWand: number;
    petrificationPolymorph: number;
    breathWeapon: number;
    spell: number;
  };
  armorClass?: number;
  currency?: { my: number; gp: number; sp: number; cp: number };
  userId?: number;
  roomId?: number;
}