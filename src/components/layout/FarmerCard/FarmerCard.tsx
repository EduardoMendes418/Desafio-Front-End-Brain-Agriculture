import React from "react";
import type { Farmer } from "../../../types/farmer";
import { Card } from "./styles/FarmerCard.styles";


import { FarmerHeader } from "./sections/FarmerHeader/FarmerHeader";
import { FarmsSection } from "./sections/FarmsSection/FarmsSection";

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
  return (
    <Card>
      <FarmerHeader
        farmer={farmer}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <FarmsSection farms={farmer.farms} />
    </Card>
  );
};