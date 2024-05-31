import * as React from 'react';
import { useTheme, Box, ThemeProvider, Container, Grid } from '@mui/material';
import SideBar from './CarDrawer';
import CarView from './CarView';

export default function CarDashboard() {
  const theme = useTheme();
  const [currentComponent, setCurrentComponent] = React.useState(<CarView />);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
          <SideBar onTabClick={setCurrentComponent} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Container sx={{ mt: 3 }}>
            <Grid>
              {currentComponent}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}