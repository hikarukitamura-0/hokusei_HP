import { Box, Typography, Container } from '@mui/material';
import logoImg from '../assets/img/ロゴ.png';

const Footer = () => (
  <Box component="footer" sx={{ backgroundColor: '#111', py: 5 }}>
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Box component="img" src={logoImg} alt="SEI" sx={{ width: 28, height: 28 }} />
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
          北誠建設株式会社
        </Typography>
      </Box>
      <Typography sx={{ color: 'rgba(255,255,255,0.25)', textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
        &copy; 北誠建設株式会社 All Rights Reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
