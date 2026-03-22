import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const RED = '#E84420';

const navItems = [
  { label: 'ホーム', href: '#hero' },
  { label: '会社概要', href: '#about' },
  { label: '事業内容', href: '#business' },
  { label: '採用情報', href: '#recruit' },
  { label: 'アクセス', href: '#access' },
  { label: 'お問い合わせ', href: '#contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? 'rgba(26,26,26,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.4s ease',
        borderBottom: scrolled ? `1px solid rgba(255,255,255,0.05)` : 'none',
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, minHeight: { xs: 56, md: 64 } }}>
        <Box sx={{ flexGrow: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5 }} onClick={() => scrollTo('#hero')}>
          {/* SEI logo placeholder */}
          <Box sx={{
            width: 32, height: 32, backgroundColor: RED, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', fontWeight: 900, color: '#fff', fontFamily: '"Helvetica Neue", sans-serif', letterSpacing: '0.05em',
          }}>
            SEI
          </Box>
          <Box component="span" sx={{
            fontSize: scrolled ? '0.85rem' : '0.95rem', fontWeight: 700, color: '#fff',
            letterSpacing: '0.15em', transition: 'font-size 0.3s ease', whiteSpace: 'nowrap',
          }}>
            北誠建設株式会社
          </Box>
        </Box>

        {/* Desktop nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
          {navItems.map((item) => (
            <Box
              key={item.href}
              component="a"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo(item.href); }}
              href={item.href}
              sx={{
                px: 1.5, py: 1, fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                letterSpacing: '0.05em', cursor: 'pointer', position: 'relative', transition: 'color 0.3s ease',
                '&:hover': { color: '#fff' },
                '&::after': {
                  content: '""', position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%) scaleX(0)',
                  width: '60%', height: 2, backgroundColor: RED, transition: 'transform 0.3s ease', transformOrigin: 'center',
                },
                '&:hover::after': { transform: 'translateX(-50%) scaleX(1)' },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>

        {/* Mobile */}
        <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }} onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, backgroundColor: '#1a1a1a', pt: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItemButton key={item.href} onClick={() => scrollTo(item.href)}
              sx={{ '&:hover': { backgroundColor: 'rgba(232,68,32,0.1)' } }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ sx: { color: '#fff', letterSpacing: '0.1em', fontSize: '0.9rem' } }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
