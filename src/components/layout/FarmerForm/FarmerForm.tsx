import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from "../../../store/slices/farmersSlice";
import { createFarmer, updateFarmer } from "../../../store/slices/thunks/farmersThunks";
import type { RootState } from "../../../store";
import { FormContainer, FormTitle } from "./styles/FarmerForm.styles";

import { useFarmerForm } from "../../../hooks/useFarmerForm";
import { FarmerBasicInfo } from "./sections/FarmerBasicInfo/FarmerBasicInfo";
import { FarmSection } from "./sections/FarmSection/FarmSection";
import { FormActions } from "./sections/FormActions/FormActions";


interface FarmerFormProps {
  mode: "create" | "edit";
}

export const FarmerForm: React.FC<FarmerFormProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const { selectedFarmer, loading } = useSelector(
    (state: RootState) => state.farmers
  );

  const {
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
  } = useFarmerForm(mode, selectedFarmer);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const submitData = {
        ...formData,
        farms: formData.farms.map((farm) => ({
          ...farm,
          crops: farm.crops.map((crop) => ({
            ...crop,
            farmId: farm.id,
          })),
        })),
      };

      if (mode === "create") {
        await dispatch(createFarmer(submitData) as any).unwrap();
      } else if (mode === "edit" && selectedFarmer) {
        await dispatch(
          updateFarmer({
            id: selectedFarmer.id,
            farmerData: submitData,
          }) as any
        ).unwrap();
      }
    } catch (error) {
      console.error("Erro ao salvar produtor:", error);
    }
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  return (
    <FormContainer>
      <FormTitle>
        {mode === "create"
          ? "👨‍🌾 Cadastrar Novo Produtor"
          : "✏️ Editar Produtor"}
      </FormTitle>

      <form onSubmit={handleSubmit}>
        <FarmerBasicInfo
          formData={formData}
          errors={errors}
          onUpdate={updateFormData}
        />

        {formData.farms.map((farm, farmIndex) => (
          <FarmSection
            key={farm.id}
            farm={farm}
            farmIndex={farmIndex}
            errors={errors}
            showRemoveButton={formData.farms.length > 1}
            onUpdateFarm={updateFarm}
            onRemoveFarm={removeFarm}
            onAddCrop={addCrop}
            onUpdateCrop={updateCrop}
            onRemoveCrop={removeCrop}
          />
        ))}

        <button 
          type="button" 
          onClick={addFarm}
          style={{
            background: 'transparent',
            border: '2px dashed #dee2e6',
            borderRadius: '8px',
            padding: '12px',
            width: '100%',
            color: '#6c757d',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '14px'
          }}
        >
          ➕ Adicionar Outra Fazenda
        </button>

        <FormActions
          loading={loading}
          mode={mode}
          onCancel={handleCancel}
        />
      </form>
    </FormContainer>
  );
};