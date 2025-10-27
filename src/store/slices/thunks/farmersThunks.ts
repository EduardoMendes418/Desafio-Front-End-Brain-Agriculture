import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Farmer } from '../../../types/farmer';
import { localStorageService } from '../../../services/localStorageService';

export const fetchFarmers = createAsyncThunk('farmers/fetchFarmers', async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return localStorageService.getFarmers();
});

export const fetchDashboard = createAsyncThunk(
  'farmers/fetchDashboard',
  async (_, { getState }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const state = getState() as { farmers: any };
    return localStorageService.getDashboardData(state.farmers.farmers);
  }
);

export const createFarmer = createAsyncThunk(
  'farmers/createFarmer',
  async (farmerData: Omit<Farmer, 'id' | 'createdAt' | 'updatedAt'>, { getState }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as { farmers: any };
    const newFarmer: Farmer = {
      ...farmerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedFarmers = [...state.farmers.farmers, newFarmer];
    localStorageService.saveFarmers(updatedFarmers);
    return newFarmer;
  }
);

export const updateFarmer = createAsyncThunk(
  'farmers/updateFarmer',
  async ({ id, farmerData }: { id: string; farmerData: Partial<Farmer> }, { getState }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as { farmers: any };
    const updatedFarmers = state.farmers.farmers.map((farmer: Farmer) =>
      farmer.id === id ? { ...farmer, ...farmerData, updatedAt: new Date().toISOString() } : farmer
    );

    localStorageService.saveFarmers(updatedFarmers);
    return { id, farmer: updatedFarmers.find((f: Farmer) => f.id === id)! };
  }
);

export const deleteFarmer = createAsyncThunk(
  'farmers/deleteFarmer',
  async (id: string, { getState }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as { farmers: any };
    const updatedFarmers = state.farmers.farmers.filter((farmer: Farmer) => farmer.id !== id);
    localStorageService.saveFarmers(updatedFarmers);
    return id;
  }
);
