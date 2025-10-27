import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const StatLabel = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const StatSubtitle = styled.small`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

export const PieChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PieChartWrapper = styled.svg`
  width: 120px;
  height: 120px;
  transform: rotate(-90deg); // Para começar do topo
`;

export const PieChartSegment = styled.path`
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const PieChartCenter = styled.circle`
  fill: ${({ theme }) => theme.colors.white};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

export const PieChartLabel = styled.text`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  fill: ${({ theme }) => theme.colors.primary};
  transform: rotate(90deg);
  transform-origin: center;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  max-width: 200px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface LegendColorProps {
  color: string;
}

export const LegendColor = styled.div<LegendColorProps>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
  flex-shrink: 0;
`;

export const LegendText = styled.span`
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;