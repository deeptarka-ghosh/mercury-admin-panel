import { Add, Clear, Search, TuneOutlined } from '@mui/icons-material';
import { Box, Button, Card, Chip, IconButton, InputAdornment, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { PageHeader } from '../components/PageHeader';
import { StatusChip } from '../components/StatusChip';
import { formatInr, products } from '../data/mock';

export function ProductsPage() {
  const { hasAnyRole } = useAuth();
  const [params, setParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const query = params.get('q') ?? '';
  const status = params.get('status') ?? 'all';
  const canWrite = hasAnyRole('backend_write', 'backend_admin');
  const filtered = useMemo(() => products.filter((product) => (status === 'all' || product.status === status) && `${product.name} ${product.category} ${product.slug}`.toLowerCase().includes(query.toLowerCase())), [query, status]);
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setParams(next);
  }

  return <>
    <PageHeader eyebrow="Catalog" title="Products" description={`${products.length} styles across your clothing catalog.`} action={<Tooltip title={canWrite ? 'Product creation arrives in the next slice' : 'You need the Catalog editor role'}><span><Button variant="contained" startIcon={<Add />} disabled>Add product</Button></span></Tooltip>} />
    <Card><Box sx={{ p: 2, display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField inputRef={searchRef} size="small" label="Search products" value={query} onChange={(event) => update('q', event.target.value)} sx={{ minWidth: { xs: '100%', sm: 320 } }} slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>, endAdornment: query ? <InputAdornment position="end"><IconButton size="small" aria-label="Clear product search" onClick={() => { update('q', ''); searchRef.current?.focus(); }}><Clear fontSize="small" /></IconButton></InputAdornment> : undefined } }} />
      <TextField select size="small" value={status} onChange={(event) => update('status', event.target.value)} aria-label="Filter products by status" sx={{ minWidth: 150 }}><MenuItem value="all">All statuses</MenuItem><MenuItem value="active">Active</MenuItem><MenuItem value="draft">Draft</MenuItem><MenuItem value="archived">Archived</MenuItem></TextField>
      <Tooltip title="More filters arrive with the live catalog API"><span><Button disabled variant="outlined" color="inherit" startIcon={<TuneOutlined />}>More filters</Button></span></Tooltip>
      <Typography variant="body2" color="text.secondary" sx={{ ml: { sm: 'auto' } }}>{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</Typography>
    </Box>
    <TableContainer sx={{ borderTop: '1px solid', borderColor: 'divider' }}><Table aria-label="Products"><TableHead><TableRow><TableCell>Product</TableCell><TableCell>Status</TableCell><TableCell>Variants</TableCell><TableCell>Stock</TableCell><TableCell align="right">Price</TableCell><TableCell>Updated</TableCell></TableRow></TableHead><TableBody>
      {filtered.map((product) => <TableRow key={product.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}><TableCell><Stack direction="row" spacing={1.5} alignItems="center"><Box component="img" src={product.image} alt="" sx={{ width: 48, height: 56, objectFit: 'cover', borderRadius: 1.5, bgcolor: 'grey.100' }} /><Box><Typography variant="body2" fontWeight={700}>{product.name}</Typography><Typography variant="caption" color="text.secondary">{product.category} · {product.slug}</Typography></Box></Stack></TableCell><TableCell><StatusChip status={product.status} /></TableCell><TableCell>{product.variants}</TableCell><TableCell><Chip size="small" variant="outlined" color={product.stock === 0 ? 'error' : product.stock < 10 ? 'warning' : 'default'} label={product.stock === 0 ? 'Out of stock' : `${product.stock} units`} /></TableCell><TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{formatInr(product.price)}</TableCell><TableCell><Typography variant="body2">{new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date(product.updatedAt))}</Typography></TableCell></TableRow>)}
      {filtered.length === 0 && <TableRow><TableCell colSpan={6} align="center" sx={{ py: 8 }}><Typography variant="h3">No products match these filters</Typography><Typography color="text.secondary" sx={{ mt: .5, mb: 2 }}>Clear the search or choose another status.</Typography><Button onClick={() => setParams({})}>Clear filters</Button></TableCell></TableRow>}
    </TableBody></Table></TableContainer>
    </Card>
  </>;
}
