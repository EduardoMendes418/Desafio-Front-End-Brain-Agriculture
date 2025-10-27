import styled from 'styled-components';
import { Button } from '../../../ui/Button/Button';

export const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 850px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  max-height: 95vh;
  overflow-y: auto;
`;

export const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  text-align: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.success}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CompactFormGrid = styled(FormGrid)`
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const RequiredStar = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const Input = styled.input`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray[800]};
  transition: all 0.3s ease;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    background: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const Select = styled.select`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray[800]};
  transition: all 0.3s ease;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const FarmSection = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.white});
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.success},
      ${({ theme }) => theme.colors.info}
    );
  }
`;

export const FarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gray[800]};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const AreaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const AreaGroup = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const AreaLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

export const AreaValue = styled.div<{
  variant: 'total' | 'agricultural' | 'vegetation';
}>`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'total':
        return theme.colors.primary;
      case 'agricultural':
        return theme.colors.success;
      case 'vegetation':
        return theme.colors.info;
      default:
        return theme.colors.gray[800];
    }
  }};
  margin-bottom: 6px;
`;

export const CropsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const CropsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CropsTitle = styled.h4`
  color: ${({ theme }) => theme.colors.gray[800]};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CropItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr auto;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: end;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}30;
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.warning},
      ${({ theme }) => theme.colors.success}
    );
    border-radius: ${({ theme }) => theme.borderRadius.sm} 0 0
      ${({ theme }) => theme.borderRadius.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: stretch;
    button {
      flex: 1;
      min-width: 120px;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: 4px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.danger}15;
  border: 1px solid ${({ theme }) => theme.colors.danger}30;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.gray[500]};
  border: 2px dashed ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-style: italic;
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

export const AddFarmButton = styled(Button)`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  border: 2px dashed ${({ theme }) => theme.colors.gray[400]};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;
