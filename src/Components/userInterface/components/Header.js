import { AppBar, Box, Toolbar, useMediaQuery, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Button, SwipeableDrawer, Badge } from '@mui/material';
import Logo from '../../../assets/croma_logo.svg'
import SearchComponent from './SearchComponent';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { getData, serverURL } from '../../../services/FetchNodeServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const matches = useMediaQuery('(max-width:800px)')
  const matches_sm = useMediaQuery('(max-width:400px)')
  const [categories, setCategories] = useState([])
  const [state, setState] = useState({ left: false });
  var cart=useSelector(state=>state.mycart)
  var productCart=Object.values(cart)
  const navigate=useNavigate()

  const fetchCategory = async () => {
    var result = await getData('userinterface/display_all_category')
    setCategories(result.data)
  }

  useEffect(function () {
    fetchCategory()
  }, [])

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 250, background: '#353535', color: '#fff', overflowY: 'scroll', overflowX: 'hidden',
        '::-webkit-scrollbar': {
          width: '5px',
        },
        '::-webkit-scrollbar-track': {
          boxShadow: ' inset 0 0 5px grey',
          borderRadius: '10px'
        },
        '::-webkit-scrollbar-thumb': {
          background: '#12daa8',
          borderRadius: '10px'
        }
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map((text) => (
          <ListItem key={text} disablePadding sx={{
            '&:hover': {
              backgroundColor: '#12daa8',
              color: '#000',
            },
          }}>
            <ListItemButton>
              <ListItemIcon>
                {<img src={`${serverURL}/images/${text.image}`} width='35' alt="categoryicon" />}
              </ListItemIcon>
              <ListItemText primary={text.categoryname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box >
  );

  const handleShopingCartClick=()=>{
    navigate('/cart')
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#000000' }}>
        <Toolbar>
          {matches ?
            <div>
              <Button onClick={toggleDrawer('left', true)}><MenuIcon style={{ fontSize: 30, color: '#fff' }} /></Button>
              <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
              >
                {list('left')}
              </SwipeableDrawer>
            </div>
            : <></>}
          <div style={{ marginLeft: matches ? 0 : '6%' }}><img src={Logo} alt='logo' style={{ width: matches_sm ? '80%' : '100%' }} /></div>
          {matches ? <></> : <SearchComponent />}
          <PersonIcon style={{ marginLeft: matches ? 'auto' : '25%', fontSize: '28' }} />
          <Badge style={{ marginLeft: '3%', fontSize: '25' }} color="secondary" badgeContent={productCart?.length} showZero>
            <ShoppingCartIcon onClick={handleShopingCartClick} style={{cursor:'pointer'}}/>
          </Badge>
        </Toolbar>
        {matches ? <div style={{ marginBottom: '5px', width: '97%', marginLeft: '1.5%' }}><SearchComponent /></div> : <></>}
      </AppBar>
    </Box>
  );
}