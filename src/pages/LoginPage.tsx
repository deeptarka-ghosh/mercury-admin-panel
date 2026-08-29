import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('owner@vastra.example');
  const [password, setPassword] = useState('mercury-demo');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { document.title = 'Sign in — Mercury Backoffice'; }, []);
  if (user) return <Navigate to="/" replace />;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!email.trim() || !email.includes('@')) { setError('Enter a valid work email.'); emailRef.current?.focus(); return; }
    if (!password) { setError('Enter your password.'); return; }
    setBusy(true);
    try {
      await signIn(email, password);
      const target = (location.state as { from?: string } | null)?.from ?? '/';
      navigate(target, { replace: true });
    } catch { setError('Sign-in failed. Check your connection and try again.'); }
    finally { setBusy(false); }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(420px, 0.85fr) 1.15fr' }, bgcolor: 'background.default' }}>
      <Box sx={{ display: 'grid', placeItems: 'center', p: { xs: 2.5, sm: 5 } }}>
        <Box sx={{ width: '100%', maxWidth: 430 }}>
          <Typography variant="overline" color="secondary.main" fontWeight={800} letterSpacing="0.15em">Mercury Backoffice</Typography>
          <Typography component="h1" variant="h1" sx={{ mt: 1, mb: 1.25 }}>Welcome back to the workroom.</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>Sign in to manage your catalog, stock, and daily operations.</Typography>
          <Card sx={{ boxShadow: '0 18px 50px rgba(32,36,31,.08)' }}><CardContent sx={{ p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } }}>
            <form onSubmit={submit} noValidate>
              {error && <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert>}
              <TextField inputRef={emailRef} fullWidth label="Work email" type="email" autoComplete="username" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} sx={{ mb: 2 }} />
              <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }}
                slotProps={{ input: { endAdornment: <InputAdornment position="end"><IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)} edge="end">{showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}</IconButton></InputAdornment> } }} />
              <Button type="submit" variant="contained" fullWidth disabled={busy} aria-busy={busy} sx={{ mt: 3, minHeight: 46 }}>{busy ? <CircularProgress size={21} color="inherit" aria-label="Signing in" /> : 'Sign in'}</Button>
            </form>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2.5, textAlign: 'center' }}>Prototype mode · Any password signs in</Typography>
          </CardContent></Card>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, m: 2, borderRadius: 5, overflow: 'hidden', position: 'relative', alignItems: 'flex-end', p: 6, color: 'white', background: 'linear-gradient(180deg, rgba(22,49,38,.08), rgba(22,49,38,.78)), url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=85) center/cover' }}>
        <Box sx={{ maxWidth: 500 }}><Typography variant="overline" letterSpacing="0.14em">Today in the studio</Typography><Typography variant="h2" sx={{ fontSize: '2.8rem', mt: 1 }}>Seven pieces need your attention before dispatch.</Typography></Box>
      </Box>
    </Box>
  );
}
