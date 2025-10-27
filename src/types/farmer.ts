export interface Farmer {
  id: string;
  document: string;
  name: string;
  farms: Farm[];
  createdAt: string;
  updatedAt: string;
}

export interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  crops: Crop[];
  farmerId: string;
}

export interface Crop {
  id: string;
  name: string;
  harvest: string;
  plantedArea: number;
  farmId: string;
}

export interface DashboardData {
  totalFarms: number;
  totalHectares: number;
  farmsByState: ChartData[];
  farmsByCrop: ChartData[];
  landUsage: ChartData[];
}

export interface ChartData {
  label: string;
  value: number;
  percentage: number;
}

export interface LandUsageItem {
  label: string;
  value: number;
}

