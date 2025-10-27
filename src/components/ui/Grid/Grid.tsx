import styled from 'styled-components';

export const Grid = styled.div<{
  columns?: string;
  gap?: string;
  alignItems?: string;
}>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || '1fr'};
  gap: ${({ gap, theme }) => gap || theme.spacing.md};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
`;
