import React from 'react';

import {
  Grid,
  StatCard,
  StatValue,
  StatLabel,
  StatSubtitle,
  PieChartContainer,
  PieChartWrapper,
  PieChartSegment,
  PieChartCenter,
  PieChartLabel,
  Legend,
  LegendItem,
  LegendColor,
  LegendText,
} from './styles/StatsGrid.styles';
import type { DashboardData } from '../../../types/farmer';
import { useLandUsageSegments } from '../../../hooks/useLandUsageSegments';

interface StatsGridProps {
  data: DashboardData;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ data }) => {
  const { segments, largestSegment } = useLandUsageSegments(data.landUsage);

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
        <PieChartContainer>
          <PieChartWrapper viewBox="0 0 100 100">
            {segments.map((segment, index) => (
              <PieChartSegment key={index} d={segment.path} fill={segment.color} />
            ))}

            <PieChartCenter cx="50" cy="50" r="20" />

            <PieChartLabel x="50" y="50" textAnchor="middle" dy="0.3em">
              {largestSegment ? `${largestSegment.percentage.toFixed(1)}%` : '0%'}
            </PieChartLabel>
          </PieChartWrapper>

          <Legend>
            {segments.map((segment, index) => (
              <LegendItem key={index}>
                <LegendColor color={segment.color} />
                <LegendText>
                  {segment.label}: {segment.percentage.toFixed(1)}%
                </LegendText>
              </LegendItem>
            ))}
          </Legend>
        </PieChartContainer>

        <StatLabel>Uso do Solo</StatLabel>
        <StatSubtitle>distribuição por tipo</StatSubtitle>
      </StatCard>
    </Grid>
  );
};
