import DashboardIcon from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';
import Edit from '@mui/icons-material/Edit';
import { Apps, Home, Info, Settings, TimerTwoTone } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import './sidebar.css'
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';


const Sidebar = () => {

  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  const [info, setinfo] = useState(false);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);


  const { dispatch } = useContext(DarkModeContext)


  const handleClickinfo = () => {
    setinfo(true);
  };

  const handleCloseinfo = () => {
    setinfo(false);
  };

  return (
    <div className="sidebar">

      <div className="center">
        <ul>

          <Tooltip title="consulter la liste des professeur">
            <Link to="/staff" className={(url === "/staff" ? " active" : "")}>
              <li >
                <Person className="icon" />

              </li>
            </Link>

          </Tooltip>


          <Tooltip title="modifier les heures ou noter un professeur">

            <Link to="/notation" className={(url === "/notation" ? " active" : "")}>
              <li>
                <Edit className="icon" />
              </li>
            </Link>
          </Tooltip>

        </ul>

      </div>
      <div className="bottom">

        <Tooltip title="acceuil">
          <Link to="/" className={(url === "/" ? " active" : "")}>

            <Apps className="icon" />
          </Link>
        </Tooltip>

        <Tooltip title="configurer l'application">

          <Link to="#" onClick={handleClickinfo}>
            <Info className="icon" />
          </Link>
        </Tooltip>

      </div>


      <Dialog open={info} onClose={handleCloseinfo}>
        <DialogTitle>merci pour votre confiance</DialogTitle>
        <DialogContent>
          ce logiciel à été créé par Mr Nguewo fossong christian pour la gestion des notes des professeurs du college
          catholique bilingue bilngue francois xavier mvogt

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseinfo}>fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Sidebar
