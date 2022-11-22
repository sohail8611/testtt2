import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { orange} from '@mui/material/colors';
import { fontSize } from '@mui/system';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[600]),
  backgroundColor: orange[600],
  '&:hover': {
    backgroundColor: orange[300],
  },
}));

export default function CustomizedButtons() {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton variant="contained" style={{backgroundColor:orange[500], fontSize:15, 
      marginLeft:"75%",width:"18%"
    
        }}>
        
        <strong> Team Leader On Zone</strong></ColorButton>
      
    </Stack>
  );
}
