import type { DashboardData, Farmer } from '../types/farmer';

export interface FarmersState {
  farmers: Farmer[];
  selectedFarmer: Farmer | null;
  dashboard: DashboardData | null;
  loading: boolean;
  error: string | null;
  formMode: 'view' | 'create' | 'edit' | null;
}

export const initialState: FarmersState = {
  farmers: [],
  selectedFarmer: null,
  dashboard: null,
  loading: false,
  error: null,
  formMode: null,
};
