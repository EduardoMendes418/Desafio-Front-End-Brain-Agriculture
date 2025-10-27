import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteFarmer, fetchDashboard, fetchFarmers } from './store/slices/thunks/farmersThunks';
import { setFormMode, setSelectedFarmer } from './store/slices/farmersSlice';
import { FarmerCard } from './components/layout/FarmerCard/FarmerCard';
import { StatsGrid } from './components/layout/StatsGrid/StatsGrid';
import { FarmerForm } from './components/layout/FarmerForm/FarmerForm';
import { FarmerView } from './components/layout/FarmerView/FarmerView';
import { Button } from './components/ui/Button/Button';
import type { RootState } from './store';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  margin: 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.success}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

const Content = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

const FarmersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Loading = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.5;
`;

const BackButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s ease-in-out infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const { farmers, dashboard, loading, selectedFarmer, formMode } = useSelector(
    (state: RootState) => state.farmers
  );

  useEffect(() => {
    dispatch(fetchFarmers() as any);
    dispatch(fetchDashboard() as any);
  }, [dispatch]);

  const handleViewFarmer = (farmer: any) => {
    dispatch(setSelectedFarmer(farmer));
    dispatch(setFormMode('view'));
  };

  const handleEditFarmer = (farmer: any) => {
    dispatch(setSelectedFarmer(farmer));
    dispatch(setFormMode('edit'));
  };

  const handleDeleteFarmer = async (farmerId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produtor?')) {
      try {
        await dispatch(deleteFarmer(farmerId) as any);

        dispatch(fetchFarmers() as any);
        dispatch(fetchDashboard() as any);
      } catch (error) {
        console.error('Erro ao excluir produtor:', error);
      }
    }
  };

  const handleAddFarmer = () => {
    dispatch(setSelectedFarmer(null));
    dispatch(setFormMode('create'));
  };

  const handleBackToList = () => {
    dispatch(setSelectedFarmer(null));
    dispatch(setFormMode(null));

    dispatch(fetchFarmers() as any);
    dispatch(fetchDashboard() as any);
  };

  if (formMode === 'view' && selectedFarmer) {
    return (
      <Container>
        <BackButton variant="secondary" onClick={handleBackToList}>
          ← Voltar
        </BackButton>
        <FarmerView farmer={selectedFarmer} />
      </Container>
    );
  }

  if (formMode === 'create' || formMode === 'edit') {
    return (
      <Container>
        <BackButton variant="secondary" onClick={handleBackToList}>
          ← Voltar
        </BackButton>
        <FarmerForm mode={formMode} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>🧠 Brain Agriculture</Title>
        <Button onClick={handleAddFarmer}>+ Novo Produtor</Button>
      </Header>

      {loading ? (
        <Loading>
          <LoadingSpinner />
          Carregando...
        </Loading>
      ) : (
        <>
          {dashboard && (
            <Content>
              <SectionTitle>📊 Dashboard</SectionTitle>
              <StatsGrid data={dashboard} />
            </Content>
          )}

          <Content>
            <SectionTitle>👨‍🌾 Produtores Cadastrados</SectionTitle>
            {farmers.length === 0 ? (
              <EmptyState>
                <p style={{ marginBottom: '12px', fontSize: '14px' }}>
                  Nenhum produtor cadastrado.
                </p>
                <Button onClick={handleAddFarmer}>Cadastrar Primeiro Produtor</Button>
              </EmptyState>
            ) : (
              <FarmersGrid>
                {farmers.map((farmer) => (
                  <FarmerCard
                    key={farmer.id}
                    farmer={farmer}
                    onView={handleViewFarmer}
                    onEdit={handleEditFarmer}
                    onDelete={handleDeleteFarmer}
                  />
                ))}
              </FarmersGrid>
            )}
          </Content>
        </>
      )}
    </Container>
  );
}

export default App;
