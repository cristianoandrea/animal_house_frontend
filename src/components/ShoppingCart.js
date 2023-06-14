import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'; 
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useShoppingCart } from '../context/shoppingCartContext';
import CartItem from './CartItem';
import { Buttone, data } from '../pages/prodotto_singolo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavBtnLink } from './Navbar';
import { formatCurrency } from '../utilities/formatCurrency';
import { Typography } from '@mui/joy';




export default function ShoppingCart({isOpen}) {
  
  const { 
    openCart,
    closeCart,
    cartItems
  } = useShoppingCart()
  const [state, setState] = React.useState({
    right: isOpen,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(open===true) {openCart()}
    else closeCart();
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ 
        width: 350,
        maxWidth:'90%',
        marginTop: 2, 
        marginLeft: 1,
        
    }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h3><b>Carrello</b></h3>
      <Divider />
      <List>
        {
            cartItems.map((item)=>{
                return(
                    <CartItem id={item.id} quantity={item.quantity} />
                )
            })
        }
        <br />
        <h1>
        <h5 
            style={{textAlign: 'right', marginRight: 1}}
        > <b> Totale: {formatCurrency(
              cartItems.reduce((total, cartItem) => {
      
                return total + (cartItem.prezzo || 0) * cartItem.quantity
              }, 0))
            }</b>
          </h5>
          </h1>
      </List>
      <a href="/checkout">
        <Buttone>Checkout</Buttone>
      </a>
    </Box>
  );

  return (
    <div>
      
    
    
    <React.Fragment key={'right'}>
        <NavBtnLink onClick={toggleDrawer('right', true)}><ShoppingCartIcon/></NavBtnLink>
        <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        >
        {list('right')}
        </Drawer>
    </React.Fragment>
    
    </div>
  );
}