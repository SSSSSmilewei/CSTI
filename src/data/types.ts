export type Axis = 'paradigm' | 'system' | 'copyright' | 'evolution';

export interface Question {
  id: number;
  text: string;
  effect: {
    axis: Axis | '';
    value: number; // -10 to 10
  };
  triggerId?: string;
}

export interface Archetype {
  name: string;
  description: string;
  quote?: string;
  subtitle?: string;
  detailedContent?: string;
  coordinates: {
    paradigm: number;
    system: number;
    copyright: number;
    evolution: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  quote?: string;
  subtitle?: string;
  detailedContent?: string;
  iconName: string;
}
