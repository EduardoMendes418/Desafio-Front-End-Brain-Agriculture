import React from 'react';
import { FarmItem } from '../FarmItem/FarmItem';
import type { Farmer } from '../../../../../types/farmer';
import { EmptyState, SectionTitle } from '../../styles/FarmerView.styles';

interface FarmsListSectionProps {
  farmer: Farmer;
  formatArea: (area: number) => string;
}

export const FarmsListSection: React.FC<FarmsListSectionProps> = ({ farmer, formatArea }) => (
  <div>
    <SectionTitle>🏞️ Fazendas ({farmer.farms.length})</SectionTitle>

    {farmer.farms.length === 0 ? (
      <EmptyState>Nenhuma fazenda cadastrada para este produtor.</EmptyState>
    ) : (
      farmer.farms.map((farm) => <FarmItem key={farm.id} farm={farm} formatArea={formatArea} />)
    )}
  </div>
);
