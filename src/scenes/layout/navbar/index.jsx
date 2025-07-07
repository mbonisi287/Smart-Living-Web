import {
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  Badge,
  Menu, MenuItem, Divider,
} from "@mui/material";
import { tokens, ColorModeContext } from "../../../theme";
import { useContext, useState, useEffect} from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { ToggledContext } from "../../../App";


import { useNavigate } from 'react-router-dom';


const Navbar = () => {
   const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();


  const [anchorEl, setAnchorEl] = useState(null);

  const [ notificationPanel, setNotificationPanel ] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

 const handleNotifications = (event) =>{
    setNotificationPanel(event.currentTarget);
  };

    const handleCloseNotifications = (event) =>{
    setNotificationPanel(null);
  };

  const handleProfile = () => {
    //console.log('Go to Profile');
    handleClose();
    // Navigate to /profile or open modal
  };

  const handleSettings = () => {
    //console.log('Open Settings');
    handleClose();
    // Navigate to /settings or open settings modal
  };

  const handleLogout = () => {
    //console.log('Logging out...');
    localStorage.removeItem('token');
       /*useEffect(() => {
    
          if(!token){
            navigate('/login'); 
            //('/login'); 
          } else {

          }
          
      }, [navigate]); */// Or call logout API
    handleClose();
    navigate('/login'); 
    // Optionally redirect to login page
  };

const [notifications, setNotifications] = useState([]);
const [unreadCount, setUnreadCount] = useState(0);

const fetchNotifications = async () => {
  try {
    const response = await fetch("/api/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setNotifications(data);
    setUnreadCount(data.length);
  } catch (error) {
    console.error("Error fetching notifications", error);
  }
};




  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{ display: `${isMdDevices ? "flex" : "none"}` }}
          onClick={() => setToggled(!toggled)}
        >
          <MenuOutlined />
        </IconButton>
        {/*<Box
          display="flex"
          alignItems="center"
          bgcolor={colors.primary[400]}
          borderRadius="3px"
          sx={{ display: `${isXsDevices ? "none" : "flex"}` }}
        >
          <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlined />
          </IconButton>
        </Box> */}
      </Box>

      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton onClick={handleNotifications}> 
          <NotificationsOutlined />
        </IconButton>
          <Menu
            notificationPanel={notificationPanel}
            open={Boolean(notificationPanel)}
            onClose={handleCloseNotifications}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
             {notifications.length === 0 ? (
                  <MenuItem disabled>No new notifications</MenuItem>
                ) : (
                  notifications.map((note, index) => (
                    <MenuItem key={index}>
                      <div>
                        <strong>{note.title}</strong>
                        <div style={{ fontSize: "0.8em" }}>{note.message}</div>
                      </div>
                    </MenuItem>
                  ))
                )}

          </Menu>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton onClick={handleClick}>
          <PersonOutlined />
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSettings}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
