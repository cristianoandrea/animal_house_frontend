import { Stack } from '@mui/material';
import { useShoppingCart } from '../context/shoppingCartContext'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Button, IconButton } from '@mui/joy';
import Link from '@mui/joy/Link';
import { formatCurrency } from '../utilities/formatCurrency';
import { Delete } from '@material-ui/icons';
import { useState,useEffect } from 'react';

const CartItem = ({id, quantity}) => { 
  const [Item,setItem]= useState()
  const {removeFromCart, increaseCartQuantity, deleteFromCart} = useShoppingCart();
  const [loading, setLoading] = useState(true);
 

  async function find_p(){
   
    const response = await fetch("https://site222301.tw.cs.unibo.it/api/item/"+ id, {
      method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const item  = await response.json()
    setItem(item)
    setLoading(false) 
  }

  useEffect(()=>{
    console.log(id)
     find_p()
  },[id])
  
  
  const link= "/store/prodotti/" + id

  return (
  <div> 
    {loading? ( "" ): 
    
    <Card row variant="outlined" sx={{ width: 330 }}>
    <CardOverflow>
          <AspectRatio ratio="1" sx={{ width: 90 }}>
            <img
              src={Item.image.path}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent sx={{ px: 2 }}>
          <Link href={link} fontWeight="md" textColor="success" mb={0.5}>
            {Item.nome}
          </Link>
          <Typography level="body2">{formatCurrency(Item.prezzo)} , x {quantity}</Typography>
        </CardContent>
        <Divider />
        <CardOverflow
          sx={{
            px: 0.2,
            writingMode: 'vertical-rl',
            textAlign: 'center',
            fontSize: 'xs2',
            fontWeight: 'xl2',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          <Button onClick={()=>deleteFromCart(id)} sx={{color: "red"}} ><Delete/></Button>

        </CardOverflow>
      </Card>
    }
        </div>

  )
}

export default CartItem
/*



<img src={item.images[0].path} alt={item.images[0].alt} 
            style={{width: "125px", height:"75px" , objectFit: "cover"}} />
*/