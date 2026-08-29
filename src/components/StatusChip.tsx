import { Chip } from '@mui/material';
import type { Product } from '../types';

export function StatusChip({ status }: { status: Product['status'] }) {
  const styles = {
    active: { color: '#2F6B49', bgcolor: '#E5F0E8', label: 'Active' },
    draft: { color: '#6B6256', bgcolor: '#F1EDE7', label: 'Draft' },
    archived: { color: '#8A4A18', bgcolor: '#F7E8D6', label: 'Archived' },
  }[status];
  return <Chip size="small" label={styles.label} sx={{ color: styles.color, bgcolor: styles.bgcolor, fontWeight: 700 }} />;
}
