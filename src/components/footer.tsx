import { Box, Typography, Container } from '@mui/material';

const RED = '#E84420';

const Footer = () => (
  <Box component="footer" sx={{ backgroundColor: '#111', py: 5 }}>
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Box sx={{
          width: 28, height: 28, backgroundColor: RED, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.5rem', fontWeight: 900, color: '#fff', fontFamily: '"Helvetica Neue", sans-serif',
        }}>
          SEI
        </Box>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
          北誠建設株式会社
        </Typography>
      </Box>
      <Typography sx={{ color: 'rgba(255,255,255,0.35)', textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
        &copy; 北誠建設株式会社 All Rights Reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
