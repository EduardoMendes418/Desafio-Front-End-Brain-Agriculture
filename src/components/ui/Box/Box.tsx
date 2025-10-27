import styled from 'styled-components';

export const Box = styled.div<{
  p?: string;
  m?: string;
  bg?: string;
  borderRadius?: string;
  shadow?: string;
}>`
  padding: ${({ p }) => p || '0'};
  margin: ${({ m }) => m || '0'};
  background: ${({ bg, theme }) => bg || theme.colors.white};
  border-radius: ${({ borderRadius, theme }) => borderRadius || theme.borderRadius.md};
  box-shadow: ${({ shadow, theme }) => shadow || theme.shadows.md};
`;
