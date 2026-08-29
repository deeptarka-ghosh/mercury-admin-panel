import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#244A3A', dark: '#19382B', contrastText: '#FFFFFF' },
    secondary: { main: '#C45832', light: '#F7E8E1' },
    background: { default: '#F7F7F3', paper: '#FFFFFF' },
    text: { primary: '#20241F', secondary: '#667066' },
    divider: '#DDE1D8',
    success: { main: '#2F6B49' },
    warning: { main: '#A45E12' },
    error: { main: '#B43B36' },
    info: { main: '#2A6F9B' },
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    h1: { fontFamily: '"Newsreader", Georgia, serif', fontSize: '2.25rem', lineHeight: 1.1, fontWeight: 500 },
    h2: { fontFamily: '"Newsreader", Georgia, serif', fontSize: '1.6rem', lineHeight: 1.2, fontWeight: 500 },
    h3: { fontSize: '1.05rem', lineHeight: 1.35, fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 42, borderRadius: 10, paddingInline: 18 } },
    },
    MuiCard: { styleOverrides: { root: { border: '1px solid #DDE1D8', boxShadow: 'none', borderRadius: 18 } } },
    MuiOutlinedInput: { styleOverrides: { root: { background: '#FFFFFF', borderRadius: 10 } } },
    MuiTableCell: { styleOverrides: { head: { color: '#667066', fontWeight: 700, background: '#F7F7F3' } } },
    MuiTooltip: { defaultProps: { enterDelay: 300 } },
  },
});
