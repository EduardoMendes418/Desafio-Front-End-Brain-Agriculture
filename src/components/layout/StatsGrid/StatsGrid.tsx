import React from "react";
import type { DashboardData } from "../../../types/farmer";
import {
  Grid,
  StatCard,
  StatValue,
  StatLabel,
  StatSubtitle
} from "./styles/StatsGrid.styles";

interface StatsGridProps {
  data: DashboardData;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ data }) => {
  return (
    <Grid>
      <StatCard>
        <StatValue>{data.totalFarms}</StatValue>
        <StatLabel>Total de Fazendas</StatLabel>
        <StatSubtitle>propriedades cadastradas</StatSubtitle>
      </StatCard>

      <StatCard>
        <StatValue>{data.totalHectares.toLocaleString()}</StatValue>
        <StatLabel>Área Total</StatLabel>
        <StatSubtitle>hectares registrados</StatSubtitle>
      </StatCard>

      <StatCard>
        <StatValue>{data.landUsage[0]?.percentage.toFixed(1)}%</StatValue>
        <StatLabel>Uso do Solo</StatLabel>
        <StatSubtitle>área agricultável</StatSubtitle>
      </StatCard>
    </Grid>
  );
};