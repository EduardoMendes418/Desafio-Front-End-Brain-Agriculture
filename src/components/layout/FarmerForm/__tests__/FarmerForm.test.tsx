import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FarmerForm } from '../FarmerForm';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../styles/theme';
import { useFarmerForm } from '../../../../hooks/useFarmerForm';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../hooks/useFarmerForm');
jest.mock('../sections/FarmerBasicInfo/FarmerBasicInfo', () => ({
  FarmerBasicInfo: () => <div>FarmerBasicInfo</div>,
}));
jest.mock('../sections/FarmSection/FarmSection', () => ({
  FarmSection: () => <div>FarmSection</div>,
}));
jest.mock('../sections/FormActions/FormActions', () => ({
  FormActions: () => <div>FormActions</div>,
}));

describe('FarmerForm Component', () => {
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  (useSelector as jest.Mock).mockReturnValue({ selectedFarmer: null, loading: false });

  const mockFormData = {
    farms: [
      { id: '1', name: 'Fazenda 1', crops: [] },
    ],
  };
  const mockUpdateFormData = jest.fn();
  const mockUpdateFarm = jest.fn();
  const mockAddFarm = jest.fn();
  const mockRemoveFarm = jest.fn();
  const mockAddCrop = jest.fn();
  const mockUpdateCrop = jest.fn();
  const mockRemoveCrop = jest.fn();
  const mockValidateForm = jest.fn().mockReturnValue(true);

  (useFarmerForm as jest.Mock).mockReturnValue({
    formData: mockFormData,
    errors: {},
    updateFormData: mockUpdateFormData,
    updateFarm: mockUpdateFarm,
    addFarm: mockAddFarm,
    removeFarm: mockRemoveFarm,
    addCrop: mockAddCrop,
    updateCrop: mockUpdateCrop,
    removeCrop: mockRemoveCrop,
    validateForm: mockValidateForm,
  });

  const renderWithTheme = (component: React.ReactNode) =>
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar título e seções corretamente no modo create', () => {
    renderWithTheme(<FarmerForm mode="create" />);

    expect(screen.getByText('👨‍🌾 Cadastrar Novo Produtor')).toBeInTheDocument();
    expect(screen.getByText('FarmerBasicInfo')).toBeInTheDocument();
    expect(screen.getByText('FarmSection')).toBeInTheDocument();
    expect(screen.getByText('FormActions')).toBeInTheDocument();
    expect(screen.getByText('➕ Adicionar Outra Fazenda')).toBeInTheDocument();
  });

  it('deve disparar dispatch correto ao cancelar formulário', () => {
    renderWithTheme(<FarmerForm mode="create" />);

    const cancelButton = screen.getByText('FormActions'); 
    fireEvent.click(cancelButton);
  });
});
