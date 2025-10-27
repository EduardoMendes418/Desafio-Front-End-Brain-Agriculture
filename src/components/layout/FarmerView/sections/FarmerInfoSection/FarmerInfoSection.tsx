import React from 'react';
import {
  FarmerInfo,
  InfoGroup,
  InfoLabel,
  InfoValue,
  AreaBadge,
} from '../../styles/FarmerView.styles';
import type { Farmer } from '../../../../../types/farmer';

interface FarmerInfoSectionProps {
  farmer: Farmer;
  totals: {
    totalFarmsArea: number;
    totalAgriculturalArea: number;
    totalVegetationArea: number;
  };
  formatArea: (area: number) => string;
}

export const FarmerInfoSection: React.FC<FarmerInfoSectionProps> = ({
  farmer,
  totals,
  formatArea,
}) => (
  <FarmerInfo>
    <InfoGroup>
      <InfoLabel>Nome do Produtor</InfoLabel>
      <InfoValue>{farmer.name}</InfoValue>
    </InfoGroup>

    <InfoGroup>
      <InfoLabel>CPF/CNPJ</InfoLabel>
      <InfoValue>{farmer.document}</InfoValue>
    </InfoGroup>

    <InfoGroup>
      <InfoLabel>Data de Cadastro</InfoLabel>
      <InfoValue>{new Date(farmer.createdAt).toLocaleDateString('pt-BR')}</InfoValue>
    </InfoGroup>

    <InfoGroup>
      <InfoLabel>Última Atualização</InfoLabel>
      <InfoValue>{new Date(farmer.updatedAt).toLocaleDateString('pt-BR')}</InfoValue>
    </InfoGroup>

    <InfoGroup>
      <InfoLabel>Total de Fazendas</InfoLabel>
      <InfoValue>
        <AreaBadge type="total">{farmer.farms.length} propriedade(s)</AreaBadge>
      </InfoValue>
    </InfoGroup>

    <InfoGroup>
      <InfoLabel>Área Total</InfoLabel>
      <InfoValue>
        <AreaBadge type="total">{formatArea(totals.totalFarmsArea)}</AreaBadge>
      </InfoValue>
    </InfoGroup>

    <InfoGroup>
      <InfoLabel>Área Agricultável Total</InfoLabel>
      <InfoValue>
        <AreaBadge type="agricultural">{formatArea(totals.totalAgriculturalArea)}</AreaBadge>
      </InfoValue>
    </InfoGroup>

    <InfoGroup>
      <InfoLabel>Área de Vegetação Total</InfoLabel>
      <InfoValue>
        <AreaBadge type="vegetation">{formatArea(totals.totalVegetationArea)}</AreaBadge>
      </InfoValue>
    </InfoGroup>
  </FarmerInfo>
);
