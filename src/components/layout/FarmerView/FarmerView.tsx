import React from "react";
import { useDispatch } from "react-redux";
import {
  setFormMode,
  setSelectedFarmer,
} from "../../../store/slices/farmersSlice";
import { Button } from "../../ui/Button/Button";
import { Actions, ViewContainer, ViewTitle } from "./styles/FarmerView.styles";
import type { Farmer } from "../../../types/farmer";
import { useFarmerSummary } from "../../../hooks/useFarmerSummary";
import { FarmerInfoSection } from "./sections/FarmerInfoSection/FarmerInfoSection";
import { FarmsListSection } from "./sections/FarmsListSection/FarmsListSection";

interface FarmerViewProps {
  farmer: Farmer;
}

export const FarmerView: React.FC<FarmerViewProps> = ({ farmer }) => {
  const dispatch = useDispatch();
  const { totals, formatArea } = useFarmerSummary(farmer);

  const handleEdit = () => {
    dispatch(setSelectedFarmer(farmer));
    dispatch(setFormMode("edit"));
  };

  const handleBack = () => {
    dispatch(setSelectedFarmer(null));
    dispatch(setFormMode(null));
  };

  return (
    <ViewContainer>
      <ViewTitle>👨‍🌾 Detalhes do Produtor Rural</ViewTitle>

      <FarmerInfoSection
        farmer={farmer}
        totals={totals}
        formatArea={formatArea}
      />

      <FarmsListSection farmer={farmer} formatArea={formatArea} />

      <Actions>
        <Button variant="secondary" onClick={handleBack}>
          ← Voltar para Lista
        </Button>
        <Button onClick={handleEdit}>✏️ Editar Produtor</Button>
      </Actions>
    </ViewContainer>
  );
};
