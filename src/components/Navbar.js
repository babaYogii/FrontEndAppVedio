import React,{useEffect,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "../assets/logo.svg"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import MenuItem from '@mui/material/MenuItem';
import { useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';








function DrawerAppBar() {
  const [auth,setAuth]=useState(false);

 
  let token=localStorage.getItem('token');
  let thisUser=localStorage.getItem('user')
     thisUser=JSON.parse(thisUser)


// Date-Time Section statred
  var n = new Date().toLocaleTimeString();
  const [ndate,setNdate]=useState(n);
  function UpdateTime(){
    n = new Date().toLocaleTimeString();
    setNdate(n)
  }

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear()

  setInterval(UpdateTime,1000);

//Date-Time section Ended
  

  const Navigate=useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);


 

  
  useEffect(()=>{
    let token=localStorage.getItem('token');
    let user=localStorage.getItem('user');
    
    if(token){
      setAuth(true);
    }

    if(user){
      user=JSON.parse(user)
    }
 },[n])

   

 const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};
const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};
const settings = ['profile','CreateMeeting','MyMeetings',"Logout"];
 






  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0} style={{ background:'#FFF'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logo} alt='Loading' style={{height:"3rem",borderRadius:"50%"}} />
          <Typography variant='body1' color='primary'>Tech Meets</Typography>
          </Typography>
          <Box gap={5} sx={{ display: { xs: 'none', sm: 'block',md:'flex',alignItems:'center'} }}>
            <Typography variant='h6' color="#838383" sx={{zIndex:1000}}>{ndate} * {day}-{month}-{year}</Typography>
            {thisUser ? <Typography color="primary" fontWeight={600}>{(thisUser.fullName).toUpperCase()}</Typography>:""}
           
    {
      auth &&
      <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar   sx={{ bgcolor: "#00A86B" }} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {token && settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Button onClick={()=>{Navigate(`/${setting}`)}}>{setting}</Button>
          </MenuItem>
        ))}
      </Menu>
    </Box>

    }



          </Box>
        </Toolbar>
      </AppBar>
     
      
    </Box>
  );
}



export default DrawerAppBar;