import {
  AnalyticsOutlined, CategoryOutlined, ChevronLeft, DashboardOutlined, GroupOutlined,
  Inventory2Outlined, Menu, PeopleOutline, ReceiptLongOutlined, SettingsOutlined,
  StorefrontOutlined, TimelineOutlined, CollectionsBookmarkOutlined, CampaignOutlined,
  LocalOfferOutlined, ViewCarouselOutlined, ViewQuiltOutlined, AutoAwesomeOutlined,
} from '@mui/icons-material';
import {
  AppBar, Avatar, Box, Chip, Divider, Drawer, IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Tooltip, Typography, useMediaQuery,
} from '@mui/material';
import { useState, type ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { theme } from '../theme';
import type { Role } from '../types';

const drawerWidth = 256;
const navItems: Array<{ label: string; path: string; icon: ReactNode; roles: Role[] }> = [
  { label: 'Overview', path: '/', icon: <DashboardOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Products', path: '/products', icon: <Inventory2Outlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Categories', path: '/categories', icon: <CategoryOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Collections', path: '/collections', icon: <CollectionsBookmarkOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Campaigns', path: '/campaigns', icon: <CampaignOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Promotions', path: '/promotions', icon: <LocalOfferOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Banners', path: '/banners', icon: <ViewCarouselOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Homepage', path: '/homepage', icon: <ViewQuiltOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Recommendations', path: '/recommendations', icon: <AutoAwesomeOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Orders', path: '/orders', icon: <ReceiptLongOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Customers', path: '/customers', icon: <PeopleOutline />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Analytics', path: '/analytics', icon: <AnalyticsOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Team & roles', path: '/team', icon: <GroupOutlined />, roles: ['user_management'] },
  { label: 'Activity log', path: '/activity', icon: <TimelineOutlined />, roles: ['backend_read', 'backend_write', 'backend_admin'] },
  { label: 'Settings', path: '/settings', icon: <SettingsOutlined />, roles: ['backend_admin'] },
];

function NavContent({ close }: { close?: () => void }) {
  const location = useLocation();
  const { user, hasAnyRole, signOut } = useAuth();
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#EFF1EB' }}>
      <Box sx={{ px: 3, pt: 3, pb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 38, height: 38, borderRadius: '12px 12px 12px 3px', bgcolor: 'primary.main', color: 'white', display: 'grid', placeItems: 'center' }}><StorefrontOutlined fontSize="small" /></Box>
        <Box><Typography variant="h6" sx={{ fontFamily: 'Newsreader', fontWeight: 600, lineHeight: 1 }}>Mercury</Typography><Typography variant="caption" color="text.secondary">Backoffice</Typography></Box>
      </Box>
      <Divider />
      <List component="nav" aria-label="Main navigation" sx={{ px: 1.5, pt: 2, flex: 1 }}>
        {navItems.filter((item) => hasAnyRole(...item.roles)).map((item) => {
          const selected = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
          return (
            <ListItemButton key={item.path} component={NavLink} to={item.path} onClick={close} selected={selected}
              sx={{ mb: 0.5, borderRadius: 2, minHeight: 44, position: 'relative', '&.Mui-selected': { bgcolor: '#FFFFFF', color: 'primary.main', '&::before': { content: '""', position: 'absolute', left: -6, top: 8, bottom: 8, width: 3, borderRadius: 4, bgcolor: 'secondary.main' } }, '&.Mui-selected:hover': { bgcolor: '#FFFFFF' } }}>
              <ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}>{item.icon}</ListItemIcon><ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: selected ? 700 : 500 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItemButton onClick={signOut} sx={{ borderRadius: 2, p: 1 }}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 13, mr: 1.25 }}>AR</Avatar>
          <ListItemText primary={user?.name} secondary="Owner" primaryTypographyProps={{ fontSize: 13, fontWeight: 700 }} secondaryTypographyProps={{ fontSize: 11 }} />
          <Tooltip title="Sign out"><ChevronLeft fontSize="small" /></Tooltip>
        </ListItemButton>
      </Box>
    </Box>
  );
}

export function AppShell() {
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {desktop ? <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, borderRightColor: 'divider' } }}><NavContent /></Drawer>
        : <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}><NavContent close={() => setMobileOpen(false)} /></Drawer>}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(247,247,243,.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar sx={{ minHeight: '64px !important', px: { xs: 2, md: 4 } }}>
            {!desktop && <IconButton edge="start" aria-label="Open navigation" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}><Menu /></IconButton>}
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>Saturday, 29 August</Typography>
            <Chip size="small" label="Live Mercury API" color="success" variant="outlined" sx={{ fontWeight: 700 }} />
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 3, lg: 4 }, maxWidth: 1600, mx: 'auto' }}><Outlet /></Box>
      </Box>
    </Box>
  );
}
