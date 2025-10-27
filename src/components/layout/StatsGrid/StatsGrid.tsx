import React from "react";
import type { DashboardData } from "../../../types/farmer";
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
} from "./styles/StatsGrid.styles";

interface StatsGridProps {
  data: DashboardData;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ data }) => {
  const totalArea = data.landUsage.reduce((sum, item) => sum + item.value, 0);

  const getSegmentColor = (index: number) => {
    const colors = [
      "#4CAF50",
      "#FF9800",
      "#F44336",
      "#2196F3",
      "#9C27B0",
      "#607D8B",
    ];
    return colors[index % colors.length];
  };

  let currentAngle = 0;
  const segments = data.landUsage.map((item, index) => {
    const percentage = totalArea > 0 ? (item.value / totalArea) * 100 : 0;
    const angle = (percentage / 100) * 360;

    const segment = {
      ...item,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: getSegmentColor(index),
    };
    currentAngle += angle;
    return segment;
  });

  const largestSegment =
    segments.length > 0
      ? segments.reduce((prev, current) =>
          prev.percentage > current.percentage ? prev : current
        )
      : null;

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
              <PieChartSegment
                key={index}
                d={describeArc(
                  50,
                  50,
                  40,
                  segment.startAngle,
                  segment.endAngle
                )}
                fill={segment.color}
              />
            ))}
            <PieChartCenter cx="50" cy="50" r="20" />
            <PieChartLabel x="50" y="50" textAnchor="middle" dy="0.3em">
              {largestSegment
                ? `${largestSegment.percentage.toFixed(1)}%`
                : "0%"}
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

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    x,
    y,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
