import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';

import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
      dispatch({ type: LOGOUT })
      navigate('/auth');
      setUser(null);
    }

    useEffect(() => {
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
      <AppBar className={classes.appBar} 
        position="static" 
        color="black"
      >
        <div className={classes.brandContainer}> 
          <Typography className={classes.heading} 
            component={Link} 
            to="/" 
            variant="h4" 
            position="center"
          >
            Ideas For Developing
          </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          { user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple}
                alt={user?.result.name} 
                src={user?.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName}
                variant="h6"
              >
                {user.result.name}
              </Typography>
              <Button className={classes.logout} 
                variant="contained" 
                color="secondary" 
                onClick={logout}
              >
                Logout
              </Button>
              <Button className={classes.logout} 
                component={Link} 
                to="/add" 
                variant="contained"  
                color="primary"
              >
                +
              </Button> 
            </div>
            ) : ( 
              <Button className={classes.logout} 
                component={Link} 
                to="/auth" 
                variant="contained" 
                color="primary"
              >
                Sign In
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
