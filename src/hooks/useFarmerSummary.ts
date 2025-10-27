import { useMemo } from "react";

import { formatAreaValue } from "../utils/formatUtils";
import type { Farmer } from "../types/farmer";


export const useFarmerSummary = (farmer: Farmer) => {
  const totals = useMemo(() => {
    const totalFarmsArea = farmer.farms.reduce((sum, farm) => sum + farm.totalArea, 0);
    const totalAgriculturalArea = farmer.farms.reduce(
      (sum, farm) => sum + farm.agriculturalArea,
      0
    );
    const totalVegetationArea = farmer.farms.reduce(
      (sum, farm) => sum + farm.vegetationArea,
      0
    );

    return {
      totalFarmsArea,
      totalAgriculturalArea,
      totalVegetationArea,
    };
  }, [farmer.farms]);

  const formatArea = (area: number) => formatAreaValue(area);

  return { totals, formatArea };
};
