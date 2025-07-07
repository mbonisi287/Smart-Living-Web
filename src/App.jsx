import React, { createContext, useState, useEffect  } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet, useNavigate} from "react-router-dom";
import smartLivingLogo from "./assets/images/building.jpg";

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const values = { toggled, setToggled };

   const navigate = useNavigate();

  const [ sideBarVisible, setSideBarVisible] = useState(false);
  const [ navBarVisible, setNavBarVisible] = useState(false);

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }
  
  const token = localStorage.getItem('token');
  var payload = '';
  
  useEffect(() => {
  
    if(!token){
      setSideBarVisible(false);
      setNavBarVisible(false);
      navigate('/login'); 
      //('/login'); 
    } else {
      payload = parseJwt(token);
      setSideBarVisible(true);
      setNavBarVisible(true);
    }
        
    }, [navigate]);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggledContext.Provider value={values}>
          <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
            <SideBar />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                maxWidth: "100%",
                backgroundImage: {smartLivingLogo}
              }}
            >
              <Navbar />
              <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                <Outlet />
              </Box>
            </Box>
          </Box>
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
