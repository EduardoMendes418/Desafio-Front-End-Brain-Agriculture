import React from 'react';

import {
  FarmItem as StyledFarmItem,
  FarmHeader,
  FarmName,
  FarmLocation,
  FarmArea,
  FarmDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  CropsList,
  CropTag,
} from '../../styles/FarmerCard.styles';
import type { Farm } from '../../../../../types/farmer';

interface FarmItemProps {
  farm: Farm;
}

export const FarmItem: React.FC<FarmItemProps> = ({ farm }) => {
  const formatArea = (area: number) => {
    return `${area.toLocaleString('pt-BR')} ha`;
  };

  const availableArea = farm.totalArea - farm.agriculturalArea - farm.vegetationArea;

  return (
    <StyledFarmItem>
      <FarmHeader>
        <div>
          <FarmName>{farm.name}</FarmName>
          <FarmLocation>
            📍 {farm.city}/{farm.state}
          </FarmLocation>
        </div>
        <FarmArea>{formatArea(farm.totalArea)}</FarmArea>
      </FarmHeader>

      <FarmDetails>
        <DetailItem>
          <DetailLabel>Agricultável</DetailLabel>
          <DetailValue>{formatArea(farm.agriculturalArea)}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Vegetação</DetailLabel>
          <DetailValue>{formatArea(farm.vegetationArea)}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Disponível</DetailLabel>
          <DetailValue>{formatArea(availableArea)}</DetailValue>
        </DetailItem>
      </FarmDetails>

      {farm.crops.length > 0 && (
        <CropsList>
          {farm.crops.map((crop) => (
            <CropTag
              key={crop.id}
              title={`Safra: ${crop.harvest} - ${formatArea(crop.plantedArea)}`}
            >
              🌾 {crop.name}
            </CropTag>
          ))}
        </CropsList>
      )}
    </StyledFarmItem>
  );
};
