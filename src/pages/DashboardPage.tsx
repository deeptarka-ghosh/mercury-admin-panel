import { ArrowForward, Inventory2Outlined, LocalShippingOutlined, NorthEast, WarningAmberRounded } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import { PageHeader } from '../components/PageHeader';
import { activities, formatInr } from '../data/mock';

const metrics = [
  { label: 'Gross sales', value: formatInr(184620), note: '+12.4% vs last week', icon: <NorthEast />, tone: '#E5F0E8' },
  { label: 'Orders to fulfil', value: '18', note: '5 dispatch by 4 PM', icon: <LocalShippingOutlined />, tone: '#E7EEF2' },
  { label: 'Low-stock variants', value: '7', note: 'Across 4 products', icon: <WarningAmberRounded />, tone: '#F7E8D6' },
  { label: 'Active products', value: '46', note: '3 drafts in progress', icon: <Inventory2Outlined />, tone: '#F1EDE7' },
];

export function DashboardPage() {
  return <>
    <PageHeader eyebrow="Overview" title="Good afternoon, Ananya." description="Here is what needs attention across your store today." action={<Button href="/products" variant="contained" endIcon={<ArrowForward />}>View products</Button>} />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
      {metrics.map((metric) => <Card key={metric.label}><CardContent sx={{ p: 2.5 }}><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography color="text.secondary" fontSize={13} fontWeight={700}>{metric.label}</Typography><Box sx={{ width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: metric.tone, color: 'primary.main' }}>{metric.icon}</Box></Box><Typography variant="h2" sx={{ fontFamily: 'DM Sans', fontSize: '1.9rem', fontWeight: 700 }}>{metric.value}</Typography><Typography variant="caption" color="text.secondary">{metric.note}</Typography></CardContent></Card>)}
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0,1.4fr) minmax(320px,.8fr)' }, gap: 3 }}>
      <Card><CardContent sx={{ p: 0 }}><Box sx={{ px: 3, py: 2.5 }}><Typography component="h2" variant="h3">This week at a glance</Typography><Typography variant="body2" color="text.secondary">Sales performance · 23–29 August</Typography></Box><Divider /><Box sx={{ p: 3 }}><Box sx={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: { xs: 1, sm: 2 }, borderBottom: '1px solid', borderColor: 'divider' }}>{[42,58,50,76,64,88,70].map((height, index) => <Box key={index} sx={{ flex: 1, textAlign: 'center' }}><Box sx={{ height: `${height}%`, minHeight: 20, bgcolor: index === 5 ? 'secondary.main' : 'primary.main', borderRadius: '7px 7px 2px 2px', opacity: index === 5 ? 1 : .82 }} /><Typography variant="caption" color="text.secondary">{['S','M','T','W','T','F','S'][index]}</Typography></Box>)}</Box><Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}><Typography variant="body2" color="text.secondary">72 orders · Avg. order {formatInr(2564)}</Typography><Typography variant="body2" fontWeight={700} color="success.main">On track</Typography></Stack></Box></CardContent></Card>
      <Card><CardContent sx={{ p: 0 }}><Box sx={{ px: 3, py: 2.5, display: 'flex', justifyContent: 'space-between' }}><Box><Typography component="h2" variant="h3">Recent activity</Typography><Typography variant="body2" color="text.secondary">Asia/Kolkata</Typography></Box><Button disabled size="small">View all</Button></Box><Divider />
        <Box component="ol" sx={{ m: 0, p: 3, listStyle: 'none' }}>{activities.map((item, index) => <Box component="li" key={item.id} sx={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 1.5, position: 'relative', pb: index === activities.length - 1 ? 0 : 2.5, '&::after': index === activities.length - 1 ? {} : { content: '""', position: 'absolute', left: 7, top: 16, bottom: 0, width: 2, bgcolor: 'secondary.light' } }}><Box sx={{ width: 10, height: 10, mt: .6, borderRadius: '50%', bgcolor: 'secondary.main', zIndex: 1 }} /><Box><Typography variant="body2"><strong>{item.actor}</strong> {item.action} <strong>{item.object}</strong></Typography><Typography variant="caption" color="text.secondary">{item.at}</Typography></Box></Box>)}</Box>
      </CardContent></Card>
    </Box>
    <Card sx={{ mt: 3, bgcolor: '#EFF1EB' }}><CardContent sx={{ p: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}><Box><Typography variant="overline" color="secondary.main" fontWeight={800}>Stock health</Typography><Typography component="h2" variant="h2">93% of active variants are ready to sell.</Typography></Box><Box><Stack direction="row" justifyContent="space-between" mb={1}><Typography variant="body2" fontWeight={700}>In-stock coverage</Typography><Typography variant="body2">93%</Typography></Stack><LinearProgress variant="determinate" value={93} sx={{ height: 9, borderRadius: 5, bgcolor: '#DDE1D8', '& .MuiLinearProgress-bar': { borderRadius: 5 } }} /></Box></CardContent></Card>
  </>;
}
