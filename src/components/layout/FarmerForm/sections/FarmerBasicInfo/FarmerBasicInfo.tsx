import React from 'react';

import {
  CompactFormGrid,
  FormGroup,
  Label,
  RequiredStar,
  Input,
  ErrorMessage,
} from '../../styles/FarmerForm.styles';
import type { Farmer } from '../../../../../types/farmer';

interface FarmerBasicInfoProps {
  formData: Omit<Farmer, 'id' | 'createdAt' | 'updatedAt'>;
  errors: Record<string, string>;
  onUpdate: (field: string, value: any) => void;
}

export const FarmerBasicInfo: React.FC<FarmerBasicInfoProps> = ({ formData, errors, onUpdate }) => {
  return (
    <CompactFormGrid>
      <FormGroup>
        <Label htmlFor="document">
          📄 CPF/CNPJ <RequiredStar>*</RequiredStar>
        </Label>
        <Input
          id="document"
          type="text"
          value={formData.document}
          onChange={(e) => onUpdate('document', e.target.value)}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
        />
        {errors.document && <ErrorMessage>{errors.document}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="name">
          👤 Nome do Produtor <RequiredStar>*</RequiredStar>
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          placeholder="Nome completo ou razão social"
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </FormGroup>
    </CompactFormGrid>
  );
};
