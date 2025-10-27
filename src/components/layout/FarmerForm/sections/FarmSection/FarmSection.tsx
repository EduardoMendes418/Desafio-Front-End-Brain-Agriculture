import React from 'react';
import { Button } from '../../../../ui/Button/Button';
import {
  FarmSection as StyledFarmSection,
  FarmHeader,
  SectionTitle,
  CompactFormGrid,
  FormGroup,
  Label,
  RequiredStar,
  Input,
  Select,
  ErrorMessage,
} from '../../styles/FarmerForm.styles';
import { FarmAreas } from '../FarmAreas/FarmAreas';

import type { Farm } from '../../../../../types/farmer';
import { BrazilianStates } from '../../../../../constants/constants';
import { FarmCrops } from '../FarmCrops/FarmCrops';

interface FarmSectionProps {
  farm: Farm;
  farmIndex: number;
  errors: Record<string, string>;
  showRemoveButton: boolean;
  onUpdateFarm: (farmIndex: number, field: string, value: any) => void;
  onRemoveFarm: (farmIndex: number) => void;
  onAddCrop: (farmIndex: number) => void;
  onUpdateCrop: (farmIndex: number, cropIndex: number, field: string, value: any) => void;
  onRemoveCrop: (farmIndex: number, cropIndex: number) => void;
}

export const FarmSection: React.FC<FarmSectionProps> = ({
  farm,
  farmIndex,
  errors,
  showRemoveButton,
  onUpdateFarm,
  onRemoveFarm,
  onAddCrop,
  onUpdateCrop,
  onRemoveCrop,
}) => {
  return (
    <StyledFarmSection>
      <FarmHeader>
        <SectionTitle>🏞️ Fazenda {farmIndex + 1}</SectionTitle>
        {showRemoveButton && (
          <Button
            type="button"
            variant="danger"
            size="small"
            onClick={() => onRemoveFarm(farmIndex)}
          >
            🗑️ Remover
          </Button>
        )}
      </FarmHeader>

      <CompactFormGrid>
        <FormGroup>
          <Label>
            Nome da Fazenda <RequiredStar>*</RequiredStar>
          </Label>
          <Input
            value={farm.name}
            onChange={(e) => onUpdateFarm(farmIndex, 'name', e.target.value)}
            placeholder="Nome da propriedade"
          />
          {errors[`farm-${farmIndex}-name`] && (
            <ErrorMessage>{errors[`farm-${farmIndex}-name`]}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>🏙️ Cidade</Label>
          <Input
            value={farm.city}
            onChange={(e) => onUpdateFarm(farmIndex, 'city', e.target.value)}
            placeholder="Cidade"
          />
        </FormGroup>

        <FormGroup>
          <Label>🗺️ Estado</Label>
          <Select
            value={farm.state}
            onChange={(e) => onUpdateFarm(farmIndex, 'state', e.target.value)}
          >
            <option value="">Selecione um estado</option>
            {BrazilianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </FormGroup>
      </CompactFormGrid>

      <FarmAreas farm={farm} farmIndex={farmIndex} errors={errors} onUpdateFarm={onUpdateFarm} />

      <FarmCrops
        farm={farm}
        farmIndex={farmIndex}
        errors={errors}
        onAddCrop={onAddCrop}
        onUpdateCrop={onUpdateCrop}
        onRemoveCrop={onRemoveCrop}
      />
    </StyledFarmSection>
  );
};
