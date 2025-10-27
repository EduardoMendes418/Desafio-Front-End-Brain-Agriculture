import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary}20;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.success}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const FarmerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FarmerName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  line-height: 1.3;
`;

export const FarmerDocument = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: 'Courier New', monospace;
`;

export const FarmerStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const StatBadge = styled.span<{ variant: 'primary' | 'success' | 'info' }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary + '15';
      case 'success':
        return theme.colors.success + '15';
      case 'info':
        return theme.colors.info + '15';
      default:
        return theme.colors.gray[100];
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'success':
        return theme.colors.success;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.gray[700];
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border: 1px solid
    ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return theme.colors.primary + '30';
        case 'success':
          return theme.colors.success + '30';
        case 'info':
          return theme.colors.info + '30';
        default:
          return theme.colors.gray[200];
      }
    }};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: stretch;

    button {
      flex: 1;
      min-width: 0;
    }
  }
`;

export const FarmsSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

export const FarmsTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FarmsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FarmItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.primary}30;
    transform: translateX(4px);
  }

  &::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 60%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.success},
      ${({ theme }) => theme.colors.info}
    );
    border-radius: 0 ${({ theme }) => theme.borderRadius.sm} ${({ theme }) => theme.borderRadius.sm}
      0;
  }
`;

export const FarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const FarmName = styled.h5`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  line-height: 1.3;
`;

export const FarmLocation = styled.span`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-style: italic;
`;

export const FarmArea = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  white-space: nowrap;
`;

export const FarmDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.span`
  color: ${({ theme }) => theme.colors.gray[800]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const CropsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const CropTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `2px ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.success + '15'};
  color: ${({ theme }) => theme.colors.success};
  border: 1px solid ${({ theme }) => theme.colors.success + '30'};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const EmptyFarms = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-style: italic;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px dashed ${({ theme }) => theme.colors.gray[300]};
`;
