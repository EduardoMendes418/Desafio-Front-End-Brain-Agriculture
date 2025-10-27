import React from 'react';

import {
  AreaGrid,
  AreaGroup,
  AreaLabel,
  AreaValue,
  Input,
  ErrorMessage,
} from '../../styles/FarmerForm.styles';
import type { Farm } from '../../../../../types/farmer';

interface FarmAreasProps {
  farm: Farm;
  farmIndex: number;
  errors: Record<string, string>;
  onUpdateFarm: (farmIndex: number, field: string, value: any) => void;
}

export const FarmAreas: React.FC<FarmAreasProps> = ({ farm, farmIndex, errors, onUpdateFarm }) => {
  const calculateAvailableArea = () => {
    return farm.totalArea - farm.agriculturalArea - farm.vegetationArea;
  };

  return (
    <>
      <AreaGrid>
        <AreaGroup>
          <AreaLabel>Área Total</AreaLabel>
          <AreaValue variant="total">{farm.totalArea || 0} ha</AreaValue>
          <Input
            type="number"
            value={farm.totalArea || ''}
            onChange={(e) => onUpdateFarm(farmIndex, 'totalArea', Number(e.target.value) || 0)}
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </AreaGroup>

        <AreaGroup>
          <AreaLabel>Área Agricultável</AreaLabel>
          <AreaValue variant="agricultural">{farm.agriculturalArea || 0} ha</AreaValue>
          <Input
            type="number"
            value={farm.agriculturalArea || ''}
            onChange={(e) =>
              onUpdateFarm(farmIndex, 'agriculturalArea', Number(e.target.value) || 0)
            }
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </AreaGroup>

        <AreaGroup>
          <AreaLabel>Área de Vegetação</AreaLabel>
          <AreaValue variant="vegetation">{farm.vegetationArea || 0} ha</AreaValue>
          <Input
            type="number"
            value={farm.vegetationArea || ''}
            onChange={(e) => onUpdateFarm(farmIndex, 'vegetationArea', Number(e.target.value) || 0)}
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </AreaGroup>

        <AreaGroup>
          <AreaLabel>Área Disponível</AreaLabel>
          <AreaValue variant="total">{calculateAvailableArea().toFixed(2)} ha</AreaValue>
          <div
            style={{
              color: calculateAvailableArea() < 0 ? '#dc3545' : '#28a745',
              fontSize: '11px',
              fontWeight: '500',
            }}
          >
            {calculateAvailableArea() < 0 ? 'Área excedida' : 'Área disponível'}
          </div>
        </AreaGroup>
      </AreaGrid>

      {errors[`farm-${farmIndex}-areas`] && (
        <ErrorMessage>{errors[`farm-${farmIndex}-areas`]}</ErrorMessage>
      )}
    </>
  );
};
