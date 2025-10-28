import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FarmerCard } from '../FarmerCard';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../styles/theme';
import type { Farmer } from '../../../../types/farmer';

jest.mock('../sections/FarmerHeader/FarmerHeader', () => ({
  FarmerHeader: ({ onView, onEdit, onDelete }: any) => (
    <div>
      <button onClick={() => onView({ id: '1' })}>View</button>
      <button onClick={() => onEdit({ id: '1' })}>Edit</button>
      <button onClick={() => onDelete('1')}>Delete</button>
    </div>
  ),
}));

jest.mock('../sections/FarmsSection/FarmsSection', () => ({
  FarmsSection: ({ farms }: any) => (
    <div>
      {farms.map((farm: any) => (
        <span key={farm.id}>{farm.name}</span>
      ))}
    </div>
  ),
}));

describe('FarmerCard Component', () => {
  const mockFarmer: Farmer = {
      id: '1',
      name: 'João Silva',
      document: '123.456.789-00',
      farms: [
          {
              id: 'f1', name: 'Fazenda 1', crops: [],
              city: '',
              state: '',
              totalArea: 0,
              agriculturalArea: 0,
              vegetationArea: 0,
              farmerId: ''
          },
          {
              id: 'f2', name: 'Fazenda 2', crops: [],
              city: '',
              state: '',
              totalArea: 0,
              agriculturalArea: 0,
              vegetationArea: 0,
              farmerId: ''
          },
      ],
      createdAt: '',
      updatedAt: ''
  };

  const onView = jest.fn();
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithTheme = (component: React.ReactNode) =>
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

  it('deve renderizar o FarmerCard com o header e farms', () => {
    renderWithTheme(<FarmerCard farmer={mockFarmer} onView={onView} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText('Fazenda 1')).toBeInTheDocument();
    expect(screen.getByText('Fazenda 2')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('deve disparar onView ao clicar em "View"', async () => {
    renderWithTheme(<FarmerCard farmer={mockFarmer} onView={onView} onEdit={onEdit} onDelete={onDelete} />);
    await userEvent.click(screen.getByText('View'));
    expect(onView).toHaveBeenCalledWith({ id: '1' });
  });

  it('deve disparar onEdit ao clicar em "Edit"', async () => {
    renderWithTheme(<FarmerCard farmer={mockFarmer} onView={onView} onEdit={onEdit} onDelete={onDelete} />);
    await userEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith({ id: '1' });
  });

  it('deve disparar onDelete ao clicar em "Delete"', async () => {
    renderWithTheme(<FarmerCard farmer={mockFarmer} onView={onView} onEdit={onEdit} onDelete={onDelete} />);
    await userEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
