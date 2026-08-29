import { ConstructionOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';

const copy: Record<string, { title: string; eyebrow: string; detail: string }> = {
  '/categories': { title: 'Categories', eyebrow: 'Catalog', detail: 'Organise products into collections customers can browse.' },
  '/orders': { title: 'Orders', eyebrow: 'Operations', detail: 'This module will connect when Hermes adds administrative order APIs.' },
  '/customers': { title: 'Customers', eyebrow: 'Relationships', detail: 'Customer profiles and order history are waiting for the new admin endpoints.' },
  '/analytics': { title: 'Analytics', eyebrow: 'Performance', detail: 'Revenue, order, and product insights from Mercury.' },
  '/team': { title: 'Team & roles', eyebrow: 'Access', detail: 'Invite operators and assign precise backoffice permissions.' },
  '/activity': { title: 'Activity log', eyebrow: 'Accountability', detail: 'A chronological view of changes made across the store.' },
  '/settings': { title: 'Store settings', eyebrow: 'Configuration', detail: 'India, INR, tax, and business identity settings.' },
};

export function ModulePage() {
  const location = useLocation();
  const page = copy[location.pathname] ?? { title: 'Page not found', eyebrow: '404', detail: 'This page does not exist.' };
  return <><PageHeader title={page.title} eyebrow={page.eyebrow} description={page.detail} /><Card><CardContent sx={{ minHeight: 360, display: 'grid', placeItems: 'center', textAlign: 'center' }}><Box><ConstructionOutlined sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} /><Typography variant="h2">Module foundation ready</Typography><Typography color="text.secondary" sx={{ mt: 1, maxWidth: 520 }}>The navigation, permission boundary, route, and visual contract are in place. Data workflows will be connected as the corresponding Mercury APIs land.</Typography></Box></CardContent></Card></>;
}
