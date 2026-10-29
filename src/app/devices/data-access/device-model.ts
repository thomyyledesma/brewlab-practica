export interface DeviceModel {
  id: string;
  modelName: string;
  category: string;
  salePrice: number;
  brand: string;
  material: string;
  isInStore: boolean;
  notes: string;
  cupProfile: string;
}

export type DeviceFormModel = Omit<DeviceModel, 'id'>;

export const CATEGORIES = [
  'Espresso',
  'V60',
  'Chemex',
  'AeroPress',
  'Origami',
  'Sifón japonés',
  'Moka',
] as const;
