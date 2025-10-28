import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StatsGrid } from '../StatsGrid';
import type { DashboardData } from '../../../../types/farmer';
import { faker } from '@faker-js/faker';
import { useLandUsageSegments } from '../../../../hooks/useLandUsageSegments';
import { theme } from '../../../../styles/theme';


jest.mock('../../../../hooks/useLandUsageSegments');

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('StatsGrid Component', () => {
  const mockUseLandUsageSegments = useLandUsageSegments as jest.Mock;

  beforeEach(() => {
    mockUseLandUsageSegments.mockReturnValue({
      segments: [
        {
          label: 'Soja',
          percentage: 60,
          color: '#4caf50',
          path: 'M10 10L90 10L50 90Z',
        },
        {
          label: 'Milho',
          percentage: 40,
          color: '#ff9800',
          path: 'M10 10L50 90L10 90Z',
        },
      ],
      largestSegment: { label: 'Soja', percentage: 60 },
    });
  });

  const mockData: DashboardData = {
    totalFarms: faker.datatype.number({ min: 5, max: 50 }),
    totalHectares: faker.datatype.number({ min: 1000, max: 10000 }),
    landUsage: [
      { label: 'Soja', value: 60, percentage: 0 },
      { label: 'Milho', value: 40, percentage: 0 },
    ],
    farmsByState: [],
    farmsByCrop: [],
  };

  it('deve renderizar os dados de fazendas e hectares corretamente', () => {
    renderWithTheme(<StatsGrid data={mockData} />);

    expect(screen.getByText('Total de Fazendas')).toBeInTheDocument();
    expect(screen.getByText(mockData.totalFarms.toString())).toBeInTheDocument();

    const hectaresText = mockData.totalHectares.toLocaleString();
    expect(screen.getByText(hectaresText)).toBeInTheDocument();
    expect(screen.getByText('Área Total')).toBeInTheDocument();
  });

  it('deve renderizar corretamente os segmentos do gráfico e a legenda', () => {
    renderWithTheme(<StatsGrid data={mockData} />);

    expect(screen.getByText(/Soja: 60.0%/)).toBeInTheDocument();
    expect(screen.getByText(/Milho: 40.0%/)).toBeInTheDocument();
    expect(screen.getByText('60.0%')).toBeInTheDocument();
  });

  it('deve renderizar 0% quando não houver largestSegment', () => {
    mockUseLandUsageSegments.mockReturnValueOnce({
      segments: [],
      largestSegment: null,
    });

    renderWithTheme(<StatsGrid data={mockData} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
