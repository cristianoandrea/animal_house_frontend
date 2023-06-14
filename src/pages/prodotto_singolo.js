import { Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import FormControl from '@mui/joy/FormControl';
import Footer from '../components/Footer'
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/shoppingCartContext';
import { useParams } from "react-router-dom";

import AspectRatio from "@mui/joy/AspectRatio";

import Sidebar from '../components/Sidebar';



const Container1= styled.div`
margin-top:100px;
line-height: 2;
`

const ColonnaDestra=styled.div`
margin-top:20px;
margin-right: 30px;
margin-left: 20px;
`

export const Buttone= styled.button`
width: 300px;
border-radius:50px;
    background: ${({primary})=> (primary ? '#01BF71' : "#010606")};
    white-space:nowrap;
    padding: ${({big})=> (big ? '14px 48px' : '12px 30px')};
    color: ${({dark})=> (dark ? '#010606' : '#fff')};
    font-size: ${({fontBig})=> (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: ponter;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({primary})=> (primary ? "#fff" : '#01BF71')};
    }
`

const SingleProduct = () => {
  const [data,setData]=useState([])
  const [consigliati,setConsigliati] = useState([])
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = React.useState(0);
  
  const { id } = useParams();
  async function find_p(){ 
    const response =await fetch("https://site222301.tw.cs.unibo.it/api/item/"+id, {
      method: "GET",
        headers: {
            "Content-Type": "application/json"
        } 
    })
    const product = await response.json(); 
    setData(product)
    const tag = data.tag

    const response2 =await fetch("https://site222301.tw.cs.unibo.it/api/item/filter/tipo", {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({tag}),
    })
    const prod_consigliati =await response2.json()
     setConsigliati(prod_consigliati)
     setLoading(false) 
    console.log(data)
    console.log(consigliati)
  }

  useEffect(()=>{
      console.log(id)
      find_p()
    }, [id])
    

  const {
    addToCart
  } = useShoppingCart()



  


  const handleChangeQuantity = (event) => {
    console.log(event.target.value)
    setQuantity(event.target.value);
  };


  const[isSideOpen, setIsSideOpen] = useState(false)
 
    const toggle = ()=> {
      setIsSideOpen(!isSideOpen)
    }
   
  
 
  return (
    <>
    <Sidebar isOpen={isSideOpen} toggle={toggle}/>
    <Navbar toggle={toggle}/>

    {loading? (""):
    <Container1>
    <Grid container spacing={2}>
    <Grid item xs={12} md={5}>
        <AspectRatio objectFit="contain">

          <img src={data.image.path} style={{maxWidth: '100%', maxHeight: '100%'}}/>
        </AspectRatio>

      </Grid>

      <Grid item xs={12} md={7}>
        <ColonnaDestra>
        <div>

          <h2>{data.producer}</h2>
          <h1>{data.nome}</h1>
          <h5>{formatCurrency(data.prezzo)} € </h5>
      
          <p>{data.descrizione}</p>
          
          <br/>
        </div>
        
        <form>
        
        <FormControl sx={{ 
          maxWidth: 300,
          marginBottom: 10,
          
           }} >
          
          <InputLabel sx={{
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }
          }} id="demo-simple-select-label">Quantità</InputLabel>
          <Select
          
          sx={{
            borderRadius:3,
            borderColor: 'black',
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }
          }}
            labelId="demo-simple-select-label"
            id="quantity-select"
            defaultValue={'azzurro'}
            label="Quantity"
            onChange={handleChangeQuantity}
            
          >
            
          <MenuItem sx={{
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }}} 
            value="1">1</MenuItem>  
          <MenuItem sx={{
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }}}  value="2">2</MenuItem>  
          <MenuItem sx={{
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }}}  value="3">3</MenuItem>  
          <MenuItem sx={{
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }}}  value="4">4</MenuItem>  
          <MenuItem  sx={{
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }}} value="5">5</MenuItem>  
            
          </Select>
          <br/>

          <Buttone type='button' onClick={()=>{
            
            addToCart(quantity,data._id,data.prezzo);
            
          }} >Aggiungi al carrello</Buttone>

          
        </FormControl>
        

        </form>
        

        
          
          
        </ColonnaDestra>
        

      </Grid>
      
    </Grid>
    <br/>
    <br/>
    <Footer />
    </Container1>
    }
   
    </>
  )
}

export default SingleProduct

/*
<form>
    
        <FormControl sx={{ 
          width: 240,
          }}
          name="tipo" >

          <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
            Tipo
          </FormLabel>
          <Select
            value={type}
            onChange={handleChangeType}
            sx={{marginBottom: 3}}
            
            componentsProps={{
              button: {
                id: 'select-field-demo-button',
                'aria-labelledby': 'select-field-demo-label select-field-demo-button',
              },
              listbox:{
                sx:{
                  backgroundColor: 'white'
                }
              }
            }}
          >
            { 
              
              varianti.map((tmp)=>{
                
                i++
                console.log(i)
                return(
                  <Option value={i}>{tmp.id}</Option> 
                )
              })
            }
          </Select>
          </FormControl>
          <FormControl sx={{ 
          width: 240,
          marginBottom: 5
          }} 
          name="quantita">

          <FormLabel id="select-quantita-label" htmlFor="select-quantità">
            Quantità
          </FormLabel>
          <Select
            sx={{marginBottom: 3}}
            value={quantity}
            onChange={handleChangeQuantity}
            componentsProps={{
              button: {
                id: 'select-quantità',
                'aria-labelledby': 'select-field-demo-label select-field-demo-button',
              },
              listbox:{
                sx:{
                  backgroundColor: 'white'
                }
              }
            }}
          >
           
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
          
          <Buttone >Add to Cart</Buttone>
        </FormControl>
        </form>
*/