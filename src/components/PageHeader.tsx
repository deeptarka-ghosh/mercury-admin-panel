import { Box, Typography } from '@mui/material';
import { useEffect, useRef, type ReactNode } from 'react';

export function PageHeader({ title, eyebrow, description, action }: { title: string; eyebrow: string; description?: string; action?: ReactNode }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    document.title = `${title} — Mercury Backoffice`;
    headingRef.current?.focus();
  }, [title]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 2, flexWrap: 'wrap', mb: 3 }}>
      <Box>
        <Typography variant="overline" color="secondary.main" fontWeight={800} letterSpacing="0.13em">{eyebrow}</Typography>
        <Typography ref={headingRef} tabIndex={-1} component="h1" variant="h1" sx={{ outline: 'none' }}>{title}</Typography>
        {description && <Typography color="text.secondary" sx={{ mt: 0.75 }}>{description}</Typography>}
      </Box>
      {action}
    </Box>
  );
}
