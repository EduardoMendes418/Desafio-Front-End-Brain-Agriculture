import React from 'react';

import { Button } from '../../../../ui/Button/Button';
import {
  CardHeader,
  FarmerInfo,
  FarmerName,
  FarmerDocument,
  FarmerStats,
  StatBadge,
  Actions,
} from '../../styles/FarmerCard.styles';
import type { Farmer } from '../../../../../types/farmer';

interface FarmerHeaderProps {
  farmer: Farmer;
  onView: (farmer: Farmer) => void;
  onEdit: (farmer: Farmer) => void;
  onDelete: (farmerId: string) => void;
}

export const FarmerHeader: React.FC<FarmerHeaderProps> = ({ farmer, onView, onEdit, onDelete }) => {
  const totalFarmsArea = farmer.farms.reduce((sum, farm) => sum + farm.totalArea, 0);

  const getTotalCrops = () => {
    return farmer.farms.reduce((sum, farm) => sum + farm.crops.length, 0);
  };

  const formatArea = (area: number) => {
    return `${area.toLocaleString('pt-BR')} ha`;
  };

  return (
    <CardHeader>
      <FarmerInfo>
        <FarmerName>👨‍🌾 {farmer.name}</FarmerName>
        <FarmerDocument>📄 {farmer.document}</FarmerDocument>

        <FarmerStats>
          <StatBadge variant="primary">🏞️ {farmer.farms.length} fazenda(s)</StatBadge>
          <StatBadge variant="success">📐 {formatArea(totalFarmsArea)}</StatBadge>
          <StatBadge variant="info">🌱 {getTotalCrops()} cultura(s)</StatBadge>
        </FarmerStats>
      </FarmerInfo>

      <Actions>
        <Button size="small" variant="secondary" onClick={() => onView(farmer)}>
          👁️ Ver
        </Button>
        <Button size="small" variant="secondary" onClick={() => onEdit(farmer)}>
          ✏️ Editar
        </Button>
        <Button size="small" variant="danger" onClick={() => onDelete(farmer.id)}>
          🗑️ Excluir
        </Button>
      </Actions>
    </CardHeader>
  );
};
