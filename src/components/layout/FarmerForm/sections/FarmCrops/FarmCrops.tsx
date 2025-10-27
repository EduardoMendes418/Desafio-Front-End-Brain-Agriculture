import React from "react";

import { Button } from "../../../../ui/Button/Button";
import {
  CropsSection as StyledCropsSection,
  CropsHeader,
  CropsTitle,
  CropItem,
  FormGroup,
  Label,
  RequiredStar,
  Input,
  Select,
  ErrorMessage,
  EmptyState,
} from "../../styles/FarmerForm.styles";

import type { Farm } from "../../../../../types/farmer";
import { CropTypes } from "../../../../../constants/constants";

interface FarmCropsProps {
  farm: Farm;
  farmIndex: number;
  errors: Record<string, string>;
  onAddCrop: (farmIndex: number) => void;
  onUpdateCrop: (farmIndex: number, cropIndex: number, field: string, value: any) => void;
  onRemoveCrop: (farmIndex: number, cropIndex: number) => void;
}

export const FarmCrops: React.FC<FarmCropsProps> = ({
  farm,
  farmIndex,
  errors,
  onAddCrop,
  onUpdateCrop,
  onRemoveCrop,
}) => {
  return (
    <StyledCropsSection>
      <CropsHeader>
        <CropsTitle>🌱 Culturas Plantadas</CropsTitle>
        <Button
          type="button"
          size="small"
          onClick={() => onAddCrop(farmIndex)}
        >
          Adicionar
        </Button>
      </CropsHeader>

      {farm.crops.map((crop, cropIndex) => (
        <CropItem key={crop.id}>
          <FormGroup>
            <Label>
              Cultura <RequiredStar>*</RequiredStar>
            </Label>
            <Select
              value={crop.name}
              onChange={(e) =>
                onUpdateCrop(farmIndex, cropIndex, "name", e.target.value)
              }
            >
              <option value="">Selecione uma cultura</option>
              {CropTypes.map((cropType) => (
                <option key={cropType} value={cropType}>
                  {cropType}
                </option>
              ))}
            </Select>
            {errors[`farm-${farmIndex}-crop-${cropIndex}-name`] && (
              <ErrorMessage>
                {errors[`farm-${farmIndex}-crop-${cropIndex}-name`]}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              Safra <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="text"
              value={crop.harvest}
              onChange={(e) =>
                onUpdateCrop(
                  farmIndex,
                  cropIndex,
                  "harvest",
                  e.target.value
                )
              }
              placeholder="Ex: 2024/2025"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Área (ha) <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="number"
              value={crop.plantedArea || ""}
              onChange={(e) =>
                onUpdateCrop(
                  farmIndex,
                  cropIndex,
                  "plantedArea",
                  Number(e.target.value) || 0
                )
              }
              min="0"
              step="0.01"
              placeholder="0.00"
            />
            {errors[`farm-${farmIndex}-crop-${cropIndex}-area`] && (
              <ErrorMessage>
                {errors[`farm-${farmIndex}-crop-${cropIndex}-area`]}
              </ErrorMessage>
            )}
          </FormGroup>

          <Button
            type="button"
            variant="danger"
            size="small"
            onClick={() => onRemoveCrop(farmIndex, cropIndex)}
          >
            ✕
          </Button>
        </CropItem>
      ))}

      {farm.crops.length === 0 && (
        <EmptyState>🌾 Nenhuma cultura adicionada</EmptyState>
      )}
    </StyledCropsSection>
  );
};