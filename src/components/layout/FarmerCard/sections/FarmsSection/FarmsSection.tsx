import React from "react";

import {
  FarmsSection as StyledFarmsSection,
  FarmsTitle,
  FarmsList,
  EmptyFarms,
} from "../../styles/FarmerCard.styles";

import type { Farm } from "../../../../../types/farmer";
import { FarmItem } from "../FarmItem/FarmItem";

interface FarmsSectionProps {
  farms: Farm[];
}

export const FarmsSection: React.FC<FarmsSectionProps> = ({ farms }) => {
  return (
    <StyledFarmsSection>
      <FarmsTitle>🏞️ Fazendas do Produtor</FarmsTitle>

      {farms.length === 0 ? (
        <EmptyFarms>Nenhuma fazenda cadastrada para este produtor.</EmptyFarms>
      ) : (
        <FarmsList>
          {farms.map((farm) => (
            <FarmItem key={farm.id} farm={farm} />
          ))}
        </FarmsList>
      )}
    </StyledFarmsSection>
  );
};