import React from "react";
import {
  FarmSection,
  FarmHeader,
  FarmTitle,
  FarmLocation,
  FarmGrid,
  InfoGroup,
  InfoLabel,
  InfoValue,
  AreaBadge,
} from "../../styles/FarmerView.styles";

import type { Farm } from "../../../../../types/farmer";
import { FarmCropsSection } from "../FarmCropsSection/FarmCropsSection";

interface FarmItemProps {
  farm: Farm;
  formatArea: (area: number) => string;
}

export const FarmItem: React.FC<FarmItemProps> = ({ farm, formatArea }) => {
  const availableArea =
    farm.totalArea - farm.agriculturalArea - farm.vegetationArea;

  return (
    <FarmSection>
      <FarmHeader>
        <div>
          <FarmTitle>{farm.name}</FarmTitle>
          <FarmLocation>
            📍 {farm.city} - {farm.state}
          </FarmLocation>
        </div>
        <AreaBadge type="total">{formatArea(farm.totalArea)}</AreaBadge>
      </FarmHeader>

      <FarmGrid>
        <InfoGroup>
          <InfoLabel>Área Agricultável</InfoLabel>
          <InfoValue>
            <AreaBadge type="agricultural">
              {formatArea(farm.agriculturalArea)}
            </AreaBadge>
          </InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Área de Vegetação</InfoLabel>
          <InfoValue>
            <AreaBadge type="vegetation">
              {formatArea(farm.vegetationArea)}
            </AreaBadge>
          </InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Área Disponível</InfoLabel>
          <InfoValue>
            <AreaBadge type="total">{formatArea(availableArea)}</AreaBadge>
          </InfoValue>
        </InfoGroup>
      </FarmGrid>

      <FarmCropsSection crops={farm.crops} formatArea={formatArea} />
    </FarmSection>
  );
};
