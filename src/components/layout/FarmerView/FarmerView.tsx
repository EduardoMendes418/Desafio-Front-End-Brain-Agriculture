import React from 'react';
import { useDispatch } from 'react-redux';
import { setFormMode, setSelectedFarmer } from '../../../store/slices/farmersSlice';
import { Button } from '../../ui/Button/Button';
import type { Farmer } from '../../../types/farmer';
import {
  ViewContainer,
  ViewTitle,
  FarmerInfo,
  InfoGroup,
  InfoLabel,
  InfoValue,
  SectionTitle,
  FarmSection,
  FarmHeader,
  FarmTitle,
  FarmLocation,
  FarmGrid,
  AreaBadge,
  CropsSection,
  CropsTitle,
  CropItem,
  CropInfo,
  CropName,
  CropHarvest,
  CropArea,
  Actions,
  EmptyState
} from './styles/FarmerView.styles';

interface FarmerViewProps {
  farmer: Farmer;
}

export const FarmerView: React.FC<FarmerViewProps> = ({ farmer }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setSelectedFarmer(farmer));
    dispatch(setFormMode('edit'));
  };

  const handleBack = () => {
    dispatch(setSelectedFarmer(null));
    dispatch(setFormMode(null));
  };

  const totalFarmsArea = farmer.farms.reduce((sum, farm) => sum + farm.totalArea, 0);
  const totalAgriculturalArea = farmer.farms.reduce((sum, farm) => sum + farm.agriculturalArea, 0);
  const totalVegetationArea = farmer.farms.reduce((sum, farm) => sum + farm.vegetationArea, 0);

  const formatArea = (area: number) => {
    return `${area.toLocaleString('pt-BR')} ha`;
  };

  return (
    <ViewContainer>
      <ViewTitle>👨‍🌾 Detalhes do Produtor Rural</ViewTitle>

      {/* Informações do Produtor */}
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
            <AreaBadge type="total">
              {farmer.farms.length} propriedade(s)
            </AreaBadge>
          </InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Área Total</InfoLabel>
          <InfoValue>
            <AreaBadge type="total">
              {formatArea(totalFarmsArea)}
            </AreaBadge>
          </InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Área Agricultável Total</InfoLabel>
          <InfoValue>
            <AreaBadge type="agricultural">
              {formatArea(totalAgriculturalArea)}
            </AreaBadge>
          </InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Área de Vegetação Total</InfoLabel>
          <InfoValue>
            <AreaBadge type="vegetation">
              {formatArea(totalVegetationArea)}
            </AreaBadge>
          </InfoValue>
        </InfoGroup>
      </FarmerInfo>

      {/* Lista de Fazendas */}
      <div>
        <SectionTitle>🏞️ Fazendas ({farmer.farms.length})</SectionTitle>
        
        {farmer.farms.length === 0 ? (
          <EmptyState>
            Nenhuma fazenda cadastrada para este produtor.
          </EmptyState>
        ) : (
          farmer.farms.map(farm => (
            <FarmSection key={farm.id}>
              <FarmHeader>
                <div>
                  <FarmTitle>{farm.name}</FarmTitle>
                  <FarmLocation>
                    📍 {farm.city} - {farm.state}
                  </FarmLocation>
                </div>
                <AreaBadge type="total">
                  {formatArea(farm.totalArea)}
                </AreaBadge>
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
                    <AreaBadge type="total">
                      {formatArea(farm.totalArea - farm.agriculturalArea - farm.vegetationArea)}
                    </AreaBadge>
                  </InfoValue>
                </InfoGroup>
              </FarmGrid>

              {/* Culturas */}
              {farm.crops.length > 0 && (
                <CropsSection>
                  <CropsTitle>🌱 Culturas Plantadas ({farm.crops.length})</CropsTitle>
                  {farm.crops.map(crop => (
                    <CropItem key={crop.id}>
                      <CropInfo>
                        <CropName>{crop.name}</CropName>
                        <CropHarvest>Safra {crop.harvest}</CropHarvest>
                      </CropInfo>
                      <CropArea>{formatArea(crop.plantedArea)}</CropArea>
                    </CropItem>
                  ))}
                </CropsSection>
              )}
            </FarmSection>
          ))
        )}
      </div>

      {/* Ações */}
      <Actions>
        <Button variant="secondary" onClick={handleBack}>
          ← Voltar para Lista
        </Button>
        <Button onClick={handleEdit}>
          ✏️ Editar Produtor
        </Button>
      </Actions>
    </ViewContainer>
  );
};