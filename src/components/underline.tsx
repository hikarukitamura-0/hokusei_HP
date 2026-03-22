import React from 'react';
import { Box } from '@mui/material';

interface UnderlineProps {
  className?: string;
}

const Underline: React.FC<UnderlineProps> = ({ className }) => {
  return (
    <Box 
      className={className || 'underline'} 
      sx={{
        width:'80px',
        height:'4px',
        backgroundColor: 'rgb(255, 208, 0)',
        mt: '9px',
        mb: '-40px' 
      }}
    />
  );
};

export default Underline;