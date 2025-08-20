import { Stations } from './stations';

export enum PollenType {
  BETULA = 'Betula',
  CASTANEA = 'Castanea',
  CHENOPODIACEAE = 'Chenopodiaceae',
  CUPRESSACEAE = 'Cupressaceae',
  FRAXINUS = 'Fraxinus',
  HELIANTHUS = 'Helianthus',
  OLEA = 'Olea',
  PINUS = 'Pinus',
  PLANTAGO = 'Plantago',
  PLATANUS = 'Platanus',
  QUERCUS = 'Quercus',
  URTICACEAE = 'Urticaceae',
  POACEAE = 'Poaceae',
  POPULUS = 'Populus'
}

export type LevelType = 'ALTO' | 'BAJO' | 'MODERADO';

export type PollenApiResult = {
  fecha: string;
  ano: string;
  estaciones: Stations;
  tipos_polinicos: string;
  precedentes_ultimos_dias: LevelType;
  prevision_proximos_dias: LevelType;
};
