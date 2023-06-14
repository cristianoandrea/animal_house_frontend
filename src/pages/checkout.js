import React , { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useShoppingCart } from '../context/shoppingCartContext'
import List from '@mui/material/List';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utilities/formatCurrency';
import { Container,Button } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ShoppingCart } from '@mui/icons-material';
import { Button1 } from '../components/ButtonElement';

const Checkout = () => {
  const navigate = useNavigate()
  const {user} = useAuthContext()

  const { 
    cartItems
  } = useShoppingCart()
  const[isOpen, setIsOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const toggle = ()=> {
    setIsOpen(!isOpen)
  }


  const handleCheckout = async() =>{
    const prod = cartItems
    if(user){
    console.log("inside checkout")
    
    console.log(prod)
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    const response = await fetch("https://site222301.tw.cs.unibo.it/api/user/addProducts", {
      method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prod,user,currentDate}),
    })  
    const newUser = await response.json()
    localStorage.setItem('user', JSON.stringify(newUser))
  }
    fetch("https://site222301.tw.cs.unibo.it/api/item/remove/", {
      method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prod}),
    })  
    localStorage.removeItem('cartItems')  
    navigate('/')
    window.location.reload(false);  

  }

  return ( 
    <div> 
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>
        <Container
        sx={{
          marginTop:'100px',
          marginBottom: '100px'
        }}
        >
        <h3>Carrello</h3>
        <List>
        {
            cartItems.map((item)=>{
                return(
                    <CartItem key={item.id} {...item} old={false} />
                )
            })
        }
        <br />
        <h5 
            style={{textAlign: 'right', marginRight: 1}}
        ><b> Totale: {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                return total + (cartItem.prezzo || 0) * cartItem.quantity
              }, 0))
            } </b>
        </h5>
          </List>
          <Button1 onClick={handleCheckout}>Acquista</Button1>
        {showSuccessModal && (
          <div className="modal">
            <div className="modal-content">
              <h4>Acquisto avvenuto con successo!</h4>
              <Button onClick={() => setShowSuccessModal(false)}>Chiudi</Button>
            </div>
          </div>
        )}
                </Container>
        <Footer />
    </div>
  )
}

export default Checkout