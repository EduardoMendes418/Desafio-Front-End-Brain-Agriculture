import type { Farmer } from '../types/farmer';

export const formatArea = (area: number): string => {
  return `${area.toLocaleString('pt-BR')} ha`;
};

export const calculateTotalFarmsArea = (farms: Farmer['farms']): number => {
  return farms.reduce((sum, farm) => sum + farm.totalArea, 0);
};

export const getTotalCrops = (farms: Farmer['farms']): number => {
  return farms.reduce((sum, farm) => sum + farm.crops.length, 0);
};

export const calculateAvailableArea = (farm: {
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
}): number => {
  return farm.totalArea - farm.agriculturalArea - farm.vegetationArea;
};
