import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FarmerView } from '../FarmerView';
import type { Farmer } from '../../../../types/farmer';
import { useDispatch } from 'react-redux';
import { setFormMode, setSelectedFarmer } from '../../../../store/slices/farmersSlice';
import { useFarmerSummary } from '../../../../hooks/useFarmerSummary';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../styles/theme';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../../../hooks/useFarmerSummary');

jest.mock('../sections/FarmerInfoSection/FarmerInfoSection', () => ({
  FarmerInfoSection: ({ farmer }: any) => <div>FarmerInfoSection {farmer.name}</div>,
}));
jest.mock('../sections/FarmsListSection/FarmsListSection', () => ({
  FarmsListSection: ({ farmer }: any) => <div>FarmsListSection {farmer.name}</div>,
}));

describe('FarmerView Component', () => {
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

  const mockFarmer: Farmer = {
    id: '1',
    name: 'João da Silva',
    document: '12345678900',
    farms: [],
    createdAt: '',
    updatedAt: '',
  };

  (useFarmerSummary as jest.Mock).mockReturnValue({
    totals: { totalFarms: 0, totalHectares: 0 },
    formatArea: (area: number) => `${area} ha`,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithTheme = (component: React.ReactNode) =>
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

  it('deve renderizar título e seções corretamente', () => {
    renderWithTheme(<FarmerView farmer={mockFarmer} />);

    expect(screen.getByText('👨‍🌾 Detalhes do Produtor Rural')).toBeInTheDocument();
    expect(screen.getByText(`FarmerInfoSection ${mockFarmer.name}`)).toBeInTheDocument();
    expect(screen.getByText(`FarmsListSection ${mockFarmer.name}`)).toBeInTheDocument();
  });

  it('deve disparar dispatch correto ao clicar em "Editar Produtor"', () => {
    renderWithTheme(<FarmerView farmer={mockFarmer} />);

    const editButton = screen.getByText(/✏️ Editar Produtor/);
    fireEvent.click(editButton);

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedFarmer(mockFarmer));
    expect(mockDispatch).toHaveBeenCalledWith(setFormMode('edit'));
  });

  it('deve disparar dispatch correto ao clicar em "Voltar para Lista"', () => {
    renderWithTheme(<FarmerView farmer={mockFarmer} />);

    const backButton = screen.getByText(/← Voltar para Lista/);
    fireEvent.click(backButton);

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedFarmer(null));
    expect(mockDispatch).toHaveBeenCalledWith(setFormMode(null));
  });
});
