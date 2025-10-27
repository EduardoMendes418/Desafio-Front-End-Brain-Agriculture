import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFarmers,
  fetchDashboard,
  createFarmer,
  updateFarmer,
  deleteFarmer,
} from "../slices/thunks/farmersThunks";
import { localStorageService } from "../../services/localStorageService";
import { type FarmersState, initialState } from "../../types/farmersState";

const farmersSlice = createSlice({
  name: "farmers",
  initialState: {
    ...initialState,
    farmers: localStorageService.getFarmers(),
    dashboard: localStorageService.getDashboardData(
      localStorageService.getFarmers()
    ),
  } as FarmersState,
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
    updateDashboard: (state) => {
      state.dashboard = localStorageService.getDashboardData(state.farmers);
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
        state.dashboard = localStorageService.getDashboardData(action.payload);
      })
      .addCase(fetchFarmers.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao carregar produtores";
      });

    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      state.dashboard = action.payload;
    });

    builder
      .addCase(createFarmer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers.push(action.payload);
        state.formMode = null;
        state.selectedFarmer = null;
        state.dashboard = localStorageService.getDashboardData(state.farmers);
      })
      .addCase(createFarmer.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao criar produtor";
      });

    builder
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
        state.dashboard = localStorageService.getDashboardData(state.farmers);
      })
      .addCase(updateFarmer.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao atualizar produtor";
      });

    builder
      .addCase(deleteFarmer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = state.farmers.filter(
          (farmer) => farmer.id !== action.payload
        );
        state.dashboard = localStorageService.getDashboardData(state.farmers);
      })
      .addCase(deleteFarmer.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao excluir produtor";
      });
  },
});

export const {
  setSelectedFarmer,
  setFormMode,
  clearError,
  resetForm,
  updateDashboard,
} = farmersSlice.actions;

export default farmersSlice.reducer;
