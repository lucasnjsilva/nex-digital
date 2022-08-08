import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import PublicRoutes from "./public.routes";
import PrivateRoutes from "./private.routes";
import { isAuthenticated } from './config/auth';

function App() {
  const theme = createTheme();
  
  return (
    <ThemeProvider theme={theme}>
      { isAuthenticated() ? <PrivateRoutes /> : <PublicRoutes /> }
    </ThemeProvider>
  );
}

export default App;
