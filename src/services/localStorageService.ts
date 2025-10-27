import type { DashboardData, Farmer } from '../types/farmer';

export const localStorageService = {
  getFarmers: (): Farmer[] => {
    try {
      const farmers = localStorage.getItem('brain-agriculture-farmers');
      return farmers ? JSON.parse(farmers) : [];
    } catch {
      return [];
    }
  },

  saveFarmers: (farmers: Farmer[]): void => {
    localStorage.setItem('brain-agriculture-farmers', JSON.stringify(farmers));
  },

  getDashboardData: (farmers: Farmer[]): DashboardData => {
    if (farmers.length === 0) {
      return {
        totalFarms: 0,
        totalHectares: 0,
        farmsByState: [],
        farmsByCrop: [],
        landUsage: [
          { label: 'Área Agricultável', value: 0, percentage: 0 },
          { label: 'Área de Vegetação', value: 0, percentage: 0 },
        ],
      };
    }

    const totalFarms = farmers.reduce((sum, farmer) => sum + farmer.farms.length, 0);
    const totalHectares = farmers.reduce(
      (sum, farmer) => sum + farmer.farms.reduce((farmSum, farm) => farmSum + farm.totalArea, 0),
      0
    );

    const states = farmers.flatMap((f) => f.farms.map((farm) => farm.state));
    const stateCount = states.reduce(
      (acc, state) => {
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const crops = farmers.flatMap((f) =>
      f.farms.flatMap((farm) => farm.crops.map((crop) => crop.name))
    );
    const cropCount = crops.reduce(
      (acc, crop) => {
        acc[crop] = (acc[crop] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const totalAgricultural = farmers
      .flatMap((f) => f.farms.map((farm) => farm.agriculturalArea))
      .reduce((a, b) => a + b, 0);
    const totalVegetation = farmers
      .flatMap((f) => f.farms.map((farm) => farm.vegetationArea))
      .reduce((a, b) => a + b, 0);
    const totalArea = totalAgricultural + totalVegetation || 1;

    return {
      totalFarms,
      totalHectares,
      farmsByState: Object.entries(stateCount).map(([label, value]) => ({
        label,
        value,
        percentage: totalFarms > 0 ? (value / totalFarms) * 100 : 0,
      })),
      farmsByCrop: Object.entries(cropCount).map(([label, value]) => ({
        label,
        value,
        percentage: crops.length > 0 ? (value / crops.length) * 100 : 0,
      })),
      landUsage: [
        {
          label: 'Área Agricultável',
          value: totalAgricultural,
          percentage: totalArea > 0 ? (totalAgricultural / totalArea) * 100 : 0,
        },
        {
          label: 'Área de Vegetação',
          value: totalVegetation,
          percentage: totalArea > 0 ? (totalVegetation / totalArea) * 100 : 0,
        },
      ],
    };
  },
};
