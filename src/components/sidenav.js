// In Sidenav.js
import { navData } from "../lib/navData";
import { KeyboardDoubleArrowLeftIcon, KeyboardDoubleArrowRightIcon,  KeyboardArrowRightOutlined, MenuOpen, MenuTwoTone } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import styles  from '../components/sidenav.module.css';

import { NavLink } from "react-router-dom";
import * as React from 'react';
import { useState,  useEffect,
  TouchableOpacity,  
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react';


export default function Sidenav() {
  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    setopen(!open)
  };

  const [users, setUsers] = useState([]);

  return (
<div className={open?styles.sidenav:styles.sidenavClosed}>
    <button className={styles.menuBtn} onClick={toggleOpen}>
            {open? <  MenuTwoTone />: < MenuOpen/>}
    </button>
    {navData.map(item =>{
        return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                  {item.icon}
                   <span className={open?styles.linkText:styles.linkTextClosed}>{item.text}</span>
               </NavLink>
               
     })}    
</div>
  )
}
