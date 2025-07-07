/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  CheckBox,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  TimeToLeave,
  TimeToLeaveTwoTone,
  WavesOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import smartLivingLogo from "../../../assets/images/smartLivingLogo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import Inspections from "../../inspections";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

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
  const payload = parseJwt(token);
  //var payload = '';

  //const emailName = localStorage.getItem('username');
  console.log(localStorage.getItem('token'));



const username = payload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
const role = payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

//console.log("Usernamesss:", username);
//console.log("Role:", role);


  useEffect(() => {

    if(!token  || !payload){
      navigate('/login'); 
    } else {
      //payload = parseJwt(token);
      //setBarVisible(true);
    }
        
    }, [token, payload, navigate]);

 const [ userPanel, setUserPanel ] = useState(false);
 var endPoint = '';
 
 useEffect(() => {
   if (!role) return;

  if (role === 'admin' || role === 'superadmin') {
    setUserPanel(true);
  } else {
    setUserPanel(false);
  }
}, [role]);
  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={smartLivingLogo}
                  alt="Argon"
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.greenAccent[500]}
                >
                  Smart Living
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              Mbonisi Tshuma
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
              mbonisitshuma287@gmail.com
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Access Control" : " "}
        </Typography>{" "}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Visitor Dashboard"
            path="/accessControl"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
 
   
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Rentals" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Rental Dashboard"
            path="/rentals"
            colors={colors}
            icon={<PersonOutlined />}
          />
  
  
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Tenant Management" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >

          <Item
            title="Tenant Onboarding"
            path="/tenantOnboarding"
            colors={colors}
            icon={<TimelineOutlined />}
          />
          { 
            userPanel &&
              <>       
                  <Item
                    title="Apartment Units"
                    path="/apartments"
                    colors={colors}
                    icon={<TimelineOutlined />}
                  />

                  
                  <Item
                    title="View Tenants"
                    path="/tenants"
                    colors={colors}
                    icon={<BarChartOutlined />}
                  />   
              </>
          }
          <Item
            title="Lease Agreements - Tenant Documents"
            path="/leaseAgreement"
            colors={colors}
            icon={<DonutLargeOutlined />}
          />
         {/*<Item
            title="New Tenant Applicants"
            path="/line"
            colors={colors}
            icon={<TimelineOutlined />}
          />*/} 
          <Item
            title="Inspections"
            path="/inspections"
            colors={colors}
            icon={<CheckBox />}
          />
        </Menu>

      <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Maintenance" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Maintenance"
            path="/maintenance"
            colors={colors}
            icon={<BarChartOutlined />}
          />


        </Menu>

              <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Miscellaneous" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Complaints"
            path="/maintenance"
            colors={colors}
            icon={<BarChartOutlined />}
          />


        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
