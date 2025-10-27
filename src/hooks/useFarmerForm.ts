import { useState, useEffect } from "react";
import type { Farmer } from "../types/farmer";


export const useFarmerForm = (mode: "create" | "edit", selectedFarmer?: Farmer | null) => {
  const [formData, setFormData] = useState<
    Omit<Farmer, "id" | "createdAt" | "updatedAt">
  >({
    document: "",
    name: "",
    farms: [
      {
        id: Date.now().toString(),
        name: "",
        city: "",
        state: "",
        totalArea: 0,
        agriculturalArea: 0,
        vegetationArea: 0,
        crops: [],
        farmerId: "",
      },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === "edit" && selectedFarmer) {
      setFormData({
        document: selectedFarmer.document,
        name: selectedFarmer.name,
        farms: selectedFarmer.farms.map((farm) => ({
          ...farm,
          farmerId: selectedFarmer.id,
        })),
      });
    }
  }, [mode, selectedFarmer]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.document.trim()) {
      newErrors.document = "CPF/CNPJ é obrigatório";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    formData.farms.forEach((farm, farmIndex) => {
      if (!farm.name.trim()) {
        newErrors[`farm-${farmIndex}-name`] = "Nome da fazenda é obrigatório";
      }

      if (farm.agriculturalArea + farm.vegetationArea > farm.totalArea) {
        newErrors[`farm-${farmIndex}-areas`] =
          "Soma das áreas não pode ultrapassar área total";
      }

      farm.crops.forEach((crop, cropIndex) => {
        if (!crop.name.trim()) {
          newErrors[`farm-${farmIndex}-crop-${cropIndex}-name`] =
            "Nome da cultura é obrigatório";
        }
        if (crop.plantedArea <= 0) {
          newErrors[`farm-${farmIndex}-crop-${cropIndex}-area`] =
            "Área plantada deve ser maior que zero";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateFarm = (farmIndex: number, field: string, value: any) => {
    const updatedFarms = [...formData.farms];
    updatedFarms[farmIndex] = {
      ...updatedFarms[farmIndex],
      [field]: value,
    };
    setFormData(prev => ({ ...prev, farms: updatedFarms }));
  };

  const addFarm = () => {
    setFormData(prev => ({
      ...prev,
      farms: [
        ...prev.farms,
        {
          id: Date.now().toString(),
          name: "",
          city: "",
          state: "",
          totalArea: 0,
          agriculturalArea: 0,
          vegetationArea: 0,
          crops: [],
          farmerId: "",
        },
      ],
    }));
  };

  const removeFarm = (farmIndex: number) => {
    if (formData.farms.length > 1) {
      const updatedFarms = formData.farms.filter(
        (_, index) => index !== farmIndex
      );
      setFormData(prev => ({ ...prev, farms: updatedFarms }));
    }
  };

  const addCrop = (farmIndex: number) => {
    const updatedFarms = [...formData.farms];
    const farmId = updatedFarms[farmIndex].id;

    updatedFarms[farmIndex].crops.push({
      id: Date.now().toString(),
      name: "",
      harvest: new Date().getFullYear().toString(),
      plantedArea: 0,
      farmId: farmId,
    });

    setFormData(prev => ({ ...prev, farms: updatedFarms }));
  };

  const updateCrop = (
    farmIndex: number,
    cropIndex: number,
    field: string,
    value: any
  ) => {
    const updatedFarms = [...formData.farms];
    updatedFarms[farmIndex].crops[cropIndex] = {
      ...updatedFarms[farmIndex].crops[cropIndex],
      [field]: value,
    };
    setFormData(prev => ({ ...prev, farms: updatedFarms }));
  };

  const removeCrop = (farmIndex: number, cropIndex: number) => {
    const updatedFarms = [...formData.farms];
    updatedFarms[farmIndex].crops = updatedFarms[farmIndex].crops.filter(
      (_, index) => index !== cropIndex
    );
    setFormData(prev => ({ ...prev, farms: updatedFarms }));
  };

  return {
    formData,
    errors,
    updateFormData,
    updateFarm,
    addFarm,
    removeFarm,
    addCrop,
    updateCrop,
    removeCrop,
    validateForm
  };
};