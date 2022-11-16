import { Pet } from './pet';

export interface Conso {
  Pet: Pet;
  pet_id: number;
  food_id: number;
  food_label: string;
  food_mark: string;
  food_prix: number;
  date_achat: Date;
}
