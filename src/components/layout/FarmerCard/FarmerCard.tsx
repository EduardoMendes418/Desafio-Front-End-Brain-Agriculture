import React from "react";
import { Button } from "../../ui/Button/Button";
import type { Farmer } from "../../../types/farmer";
import {
  Card,
  CardHeader,
  FarmerInfo,
  FarmerName,
  FarmerDocument,
  FarmerStats,
  StatBadge,
  Actions,
  FarmsSection,
  FarmsTitle,
  FarmsList,
  FarmItem,
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
  EmptyFarms
} from "./styles/FarmerCard.styles";

interface FarmerCardProps {
  farmer: Farmer;
  onView: (farmer: Farmer) => void;
  onEdit: (farmer: Farmer) => void;
  onDelete: (farmerId: string) => void;
}

export const FarmerCard: React.FC<FarmerCardProps> = ({
  farmer,
  onView,
  onEdit,
  onDelete,
}) => {
  const totalFarmsArea = farmer.farms.reduce(
    (sum, farm) => sum + farm.totalArea,
    0
  );

  const formatArea = (area: number) => {
    return `${area.toLocaleString("pt-BR")} ha`;
  };

  const getTotalCrops = () => {
    return farmer.farms.reduce((sum, farm) => sum + farm.crops.length, 0);
  };

  return (
    <Card>
      <CardHeader>
        <FarmerInfo>
          <FarmerName>👨‍🌾 {farmer.name}</FarmerName>
          <FarmerDocument>📄 {farmer.document}</FarmerDocument>

          <FarmerStats>
            <StatBadge variant="primary">
              🏞️ {farmer.farms.length} fazenda(s)
            </StatBadge>
            <StatBadge variant="success">
              📐 {formatArea(totalFarmsArea)}
            </StatBadge>
            <StatBadge variant="info">
              🌱 {getTotalCrops()} cultura(s)
            </StatBadge>
          </FarmerStats>
        </FarmerInfo>

        <Actions>
          <Button
            size="small"
            variant="secondary"
            onClick={() => onView(farmer)}
          >
            👁️ Ver
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => onEdit(farmer)}
          >
            ✏️ Editar
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(farmer.id)}
          >
            🗑️ Excluir
          </Button>
        </Actions>
      </CardHeader>

      <FarmsSection>
        <FarmsTitle>🏞️ Fazendas do Produtor</FarmsTitle>

        {farmer.farms.length === 0 ? (
          <EmptyFarms>
            Nenhuma fazenda cadastrada para este produtor.
          </EmptyFarms>
        ) : (
          <FarmsList>
            {farmer.farms.map((farm) => (
              <FarmItem key={farm.id}>
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
                    <DetailValue>
                      {formatArea(farm.agriculturalArea)}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Vegetação</DetailLabel>
                    <DetailValue>{formatArea(farm.vegetationArea)}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Disponível</DetailLabel>
                    <DetailValue>
                      {formatArea(
                        farm.totalArea -
                          farm.agriculturalArea -
                          farm.vegetationArea
                      )}
                    </DetailValue>
                  </DetailItem>
                </FarmDetails>

                {farm.crops.length > 0 && (
                  <CropsList>
                    {farm.crops.map((crop) => (
                      <CropTag
                        key={crop.id}
                        title={`Safra: ${crop.harvest} - ${formatArea(
                          crop.plantedArea
                        )}`}
                      >
                        🌾 {crop.name}
                      </CropTag>
                    ))}
                  </CropsList>
                )}
              </FarmItem>
            ))}
          </FarmsList>
        )}
      </FarmsSection>
    </Card>
  );
};