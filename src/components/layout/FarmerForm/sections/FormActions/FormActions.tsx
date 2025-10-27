import React from 'react';
import { Button } from '../../../../ui/Button/Button';
import { FormActions as StyledFormActions } from '../../styles/FarmerForm.styles';

interface FormActionsProps {
  loading: boolean;
  mode: 'create' | 'edit';
  onCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ loading, mode, onCancel }) => {
  return (
    <StyledFormActions>
      <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
        ↩️ Cancelar
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? <>⏳ Salvando...</> : mode === 'create' ? <>✅ Cadastrar</> : <>💾 Atualizar</>}
      </Button>
    </StyledFormActions>
  );
};
