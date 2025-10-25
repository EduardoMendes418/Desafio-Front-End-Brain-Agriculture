import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { DashboardData, Farmer } from "../../types/farmer";

const localStorageService = {
  getFarmers: (): Farmer[] => {
    try {
      const farmers = localStorage.getItem("brain-agriculture-farmers");
      return farmers ? JSON.parse(farmers) : [];
    } catch {
      return [];
    }
  },

  saveFarmers: (farmers: Farmer[]): void => {
    localStorage.setItem("brain-agriculture-farmers", JSON.stringify(farmers));
  },

  getDashboardData: (farmers: Farmer[]): DashboardData => {
    if (farmers.length === 0) {
      return {
        totalFarms: 0,
        totalHectares: 0,
        farmsByState: [],
        farmsByCrop: [],
        landUsage: [
          { label: "Área Agricultável", value: 0, percentage: 0 },
          { label: "Área de Vegetação", value: 0, percentage: 0 },
        ],
      };
    }

    const totalFarms = farmers.reduce(
      (sum, farmer) => sum + farmer.farms.length,
      0
    );
    const totalHectares = farmers.reduce(
      (sum, farmer) =>
        sum +
        farmer.farms.reduce((farmSum, farm) => farmSum + farm.totalArea, 0),
      0
    );

    const states = farmers.flatMap((f) => f.farms.map((farm) => farm.state));
    const stateCount = states.reduce((acc, state) => {
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const crops = farmers.flatMap((f) =>
      f.farms.flatMap((farm) => farm.crops.map((crop) => crop.name))
    );
    const cropCount = crops.reduce((acc, crop) => {
      acc[crop] = (acc[crop] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

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
          label: "Área Agricultável",
          value: totalAgricultural,
          percentage: totalArea > 0 ? (totalAgricultural / totalArea) * 100 : 0,
        },
        {
          label: "Área de Vegetação",
          value: totalVegetation,
          percentage: totalArea > 0 ? (totalVegetation / totalArea) * 100 : 0,
        },
      ],
    };
  },
};

interface FarmersState {
  farmers: Farmer[];
  selectedFarmer: Farmer | null;
  dashboard: DashboardData | null;
  loading: boolean;
  error: string | null;
  formMode: "view" | "create" | "edit" | null;
}

const initialState: FarmersState = {
  farmers: localStorageService.getFarmers(), 
  selectedFarmer: null,
  dashboard: null,
  loading: false,
  error: null,
  formMode: null,
};

export const fetchFarmers = createAsyncThunk(
  "farmers/fetchFarmers",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return localStorageService.getFarmers();
  }
);

export const fetchDashboard = createAsyncThunk(
  "farmers/fetchDashboard",
  async (_, { getState }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const state = getState() as { farmers: FarmersState };
    return localStorageService.getDashboardData(state.farmers.farmers);
  }
);

export const createFarmer = createAsyncThunk(
  "farmers/createFarmer",
  async (
    farmerData: Omit<Farmer, "id" | "createdAt" | "updatedAt">,
    { getState }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as { farmers: FarmersState };
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
  "farmers/updateFarmer",
  async (
    { id, farmerData }: { id: string; farmerData: Partial<Farmer> },
    { getState }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as { farmers: FarmersState };
    const updatedFarmers = state.farmers.farmers.map((farmer) =>
      farmer.id === id
        ? { ...farmer, ...farmerData, updatedAt: new Date().toISOString() }
        : farmer
    );

    localStorageService.saveFarmers(updatedFarmers);
    return { id, farmer: updatedFarmers.find((f) => f.id === id)! };
  }
);

export const deleteFarmer = createAsyncThunk(
  "farmers/deleteFarmer",
  async (id: string, { getState }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as { farmers: FarmersState };
    const updatedFarmers = state.farmers.farmers.filter(
      (farmer) => farmer.id !== id
    );
    localStorageService.saveFarmers(updatedFarmers);
    return id;
  }
);

const farmersSlice = createSlice({
  name: "farmers",
  initialState,
  reducers: {
    setSelectedFarmer: (state, action) => {
      state.selectedFarmer = action.payload;
    },
    setFormMode: (state, action) => {
      state.formMode = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetForm: (state) => {
      state.selectedFarmer = null;
      state.formMode = null;
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchFarmers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFarmers.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = action.payload;
      })
      .addCase(fetchFarmers.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao carregar produtores";
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.dashboard = action.payload;
      })
 
      .addCase(createFarmer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers.push(action.payload);
        state.formMode = null;
        state.selectedFarmer = null;
      })
      .addCase(createFarmer.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao criar produtor";
      })
      .addCase(updateFarmer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFarmer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.farmers.findIndex(
          (f) => f.id === action.payload.id
        );
        if (index !== -1) {
          state.farmers[index] = action.payload.farmer;
        }
        state.formMode = null;
        state.selectedFarmer = null;
      })
      .addCase(updateFarmer.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao atualizar produtor";
      })

      .addCase(deleteFarmer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = state.farmers.filter(
          (farmer) => farmer.id !== action.payload
        );
      })
      .addCase(deleteFarmer.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao excluir produtor";
      });
  },
});

export const { setSelectedFarmer, setFormMode, clearError, resetForm } =
  farmersSlice.actions;
export default farmersSlice.reducer;
