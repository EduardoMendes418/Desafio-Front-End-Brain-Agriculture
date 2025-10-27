import React from 'react';
import {
  CropsSection,
  CropsTitle,
  CropItem,
  CropInfo,
  CropName,
  CropHarvest,
  CropArea,
} from '../../styles/FarmerView.styles';
import type { Crop } from '../../../../../types/farmer';

interface FarmCropsSectionProps {
  crops: Crop[];
  formatArea: (area: number) => string;
}

export const FarmCropsSection: React.FC<FarmCropsSectionProps> = ({ crops, formatArea }) => {
  if (crops.length === 0) return null;

  return (
    <CropsSection>
      <CropsTitle>🌱 Culturas Plantadas ({crops.length})</CropsTitle>
      {crops.map((crop) => (
        <CropItem key={crop.id}>
          <CropInfo>
            <CropName>{crop.name}</CropName>
            <CropHarvest>Safra {crop.harvest}</CropHarvest>
          </CropInfo>
          <CropArea>{formatArea(crop.plantedArea)}</CropArea>
        </CropItem>
      ))}
    </CropsSection>
  );
};
