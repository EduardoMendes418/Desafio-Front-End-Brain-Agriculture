import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  loading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'large':
        return `${theme.spacing.md} ${theme.spacing.lg}`;
      default:
        return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};
  border: ${({ variant, theme }) =>
    variant === 'outline' ? `1px solid ${theme.colors.primary}` : 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: ${({ disabled, loading }) => (disabled || loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled, loading }) => (disabled || loading ? 0.6 : 1)};
  transition: all 0.2s ease;
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return theme.typography.fontSizes.xs;
      case 'large':
        return theme.typography.fontSizes.sm;
      default:
        return theme.typography.fontSizes.sm;
    }
  }};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* Variants */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background: ${theme.colors.secondary};
          color: ${theme.colors.white};
        `;
      case 'danger':
        return css`
          background: ${theme.colors.danger};
          color: ${theme.colors.white};
        `;
      case 'success':
        return css`
          background: ${theme.colors.success};
          color: ${theme.colors.white};
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
    }
  }}

  &:hover:not(:disabled):not(.loading) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  loading = false,
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} className={loading ? 'loading' : ''} {...props}>
      {loading && <div className="spinner" />}
      {children}
    </StyledButton>
  );
};
