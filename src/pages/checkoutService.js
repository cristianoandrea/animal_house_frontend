import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useShoppingCart } from '../context/shoppingCartContext'
import { Container,Button } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const CheckoutService = () => {
    const { 
        cartService
      } = useShoppingCart()
    const {user} = useAuthContext()
    const [data,setData] = useState([])
    const location = useLocation()
    const [loading,setLoading]=useState(true)
    const navigate = useNavigate();


    const handleCheckout = async() =>{
        console.log("inside checkout")
        const prod = cartService
        const tipo = data.tipo
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        const response = await fetch("https://site222301.tw.cs.unibo.it/api/user/addService", {
          method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({prod,user,currentDate,tipo}),
        })  
        /////
        const newUser = await response.json()
        localStorage.setItem('user', JSON.stringify(newUser))
        const service = user.service
        if(tipo === 'Dogsitting'){
        fetch("https://site222301.tw.cs.unibo.it/api/service/addDogReservation/", {
          method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({service,cartService}),
        })  
      }
      else{
        fetch("https://site222301.tw.cs.unibo.it/api/service/addVetReservation/", {
          method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({service,cartService}),
        })  
      }
        console.log('added to db')
        localStorage.removeItem('cartService') 
        //window.location.reload(false);  
        navigate('/');
    
      }


      const datainiz = cartService.start_date
      console.log(datainiz)
      const match = datainiz.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2}):(\d{2})\.\d{3}\+(\d{2}):(\d{2})$/);
      const date = new Date(Date.UTC(
        parseInt(match[1]), // year
        parseInt(match[2]) - 1, // month (zero-based)
        parseInt(match[3]), // day
        parseInt(match[4])-1, // hour
        parseInt(match[5]), // minute
        parseInt(match[6]), // second
      ));
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      let formatteEndDate
      const formattedStartdDate = date.toLocaleDateString("it-IT", options);

      if(cartService.end_date){
        const datafin = cartService.end_date
        const match = datafin.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2}):(\d{2})\.\d{3}\+(\d{2}):(\d{2})$/);
    const date = new Date(Date.UTC(
      parseInt(match[1]), // year
      parseInt(match[2]) - 1, // month (zero-based)
      parseInt(match[3]), // day
      parseInt(match[4]), // hour
      parseInt(match[5]), // minute
      parseInt(match[6]), // second
    ));
        const EndDate = date.toLocaleDateString("it-IT", options);
        formatteEndDate = EndDate
      }

    useEffect(() => {
        localStorage.removeItem('cartService') 
      }, [location]);
      
      useEffect(() => {
        console.log('inside servicecheckout')
        const servizio_id = cartService.servizio_id
        
        const fetchData = async () => {
            try {
              const response = await fetch('https://site222301.tw.cs.unibo.it/api/service/getOne', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ servizio_id }),
              })
              const items = await response.json()
              console.log(items)
              setData(items)
              setLoading(false)
            } catch (err) {
              console.log(err)
            }
          }
        
          fetchData()
          console.log(data)
        
      }, []);

  return ( 
    
    <div>
        {loading? '' :
         <div>
         <Navbar />
         <Container
        sx={{
          marginTop:'100px'
        }}
        >
         <Box sx={{ display: "flex" }}>

           
       <Card variant="outlined" sx={{ width: 320, marginBottom: 0.1 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          
            <img src={data.nome_struttura.img} loading="lazy" alt="" />
        
        </AspectRatio>

      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
        {data.nome_struttura.nome }
      </Typography>

      <Divider inset="context" />
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          bgcolor: "background.level1",
        }}
      >
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          Tags:
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          { data.tipo }
        </Typography>
      </CardOverflow>
      
    </Card>
    
    <Card sx={{ flex: "1 1 auto", textAlign: "left" }}>
    {cartService.end_date ?
    <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          Tipo di servizio scelto: {cartService.dottore}
        </Typography>
        :
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          Prenotazione presso il nostro dipendente: {cartService.dottore}
        </Typography>
}
    <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          Luogo della struttura: {data.luogo}
        </Typography>
        {cartService.end_date ?
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          Periodo della prenotazione:  Dal {formattedStartdDate} al {formatteEndDate}
        </Typography>
        :
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          Servizio prenotato per il giorno:  {formattedStartdDate} 
        </Typography>
}
       {cartService.end_date ?
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          
         Prezzo:  {cartService.prezzo} € al giorno.
        </Typography>
        :
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          
         Prezzo:  {cartService.prezzo} €.
        </Typography>
}
        <Button onClick={handleCheckout}> Conferma prenotazione!</Button>
        
  </Card>
    </Box>
    </Container>
    <Footer />
    </div>
}
    </div>
    
    )
}

export default CheckoutService;