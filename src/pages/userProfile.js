import { useState,useEffect } from "react"
import * as React from 'react';
import {Button} from "react-bootstrap";
import Navbar from "../components/Navbar";
//import { Box, Grid } from "@mui/material";
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import { formatCurrency } from "../utilities/formatCurrency";
import { AspectRatio, Card } from "@mui/joy";
import { useAuthContext } from '../hooks/useAuthContext';
import Modal from 'react-bootstrap/Modal';
import Sidebar from "../components/Sidebar";


const CardAcquisto = ({item,quantity,data_acquisto}) =>{

  const link="store/prodotti/" + item._id
 

  return(
    

        <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: 320,
          gap: 2,
          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        }}
      >
          
        <div>
          <a href={link} >
    
            <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
              {item.nome}
            </Typography>
          </a>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            {formatCurrency(item.prezzo)} , x {quantity}
          </Typography>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            Data di Acquisto:{data_acquisto}
          </Typography>
          <Chip
            variant="outlined"
            color="primary"
            size="sm"
            sx={{ pointerEvents: 'none' }}
          >
            Animali: {item.animale}
          </Chip>
          <Chip
            variant="outlined"
            color="primary"
            size="sm"
            sx={{ pointerEvents: 'none' }}
          >
            Tag: {item.tag}
          </Chip>
    
        </div>
      </Card>
      )
 
  
}

const CardComunity = ({note, punteggi}) => {
  
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 1200, margin: '0 auto'}}>
      <div style={{flex: 1, marginRight: '10px'}}>
        <h2>Le mie note:</h2>
        {note.note.map((note) => {
          return (
            <div key={note.id}>
              <Card variant="outlined" sx={{ width: 320 }}>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                  <strong>Nome:</strong> {note.nameAnimal}
                </Typography>
                <Typography level="body2">
                  <strong>Padrone:</strong> {note.username}
                </Typography>
                <Typography level="body2">
                  <strong>Specie:</strong> {note.species}
                </Typography>
                <Typography level="body2">
                  <strong>Sesso:</strong> {note.sex} - <strong>Età:</strong>{' '}
                  {note.age}
                </Typography>
                <Typography level="body1">
                  <strong>Descrizione:</strong> {note.descrizione}
                </Typography>
                <Typography level="body1">
                  <strong>Situazione medica:</strong>{' '}
                  {note.medicalConditions}
                </Typography>
              </Card>
            </div>
          );
        })}
      </div>
      <div style={{flex: 1, marginLeft: '10px'}}>
        <h2>I miei punteggi:</h2>
        {punteggi.giocatore.map((punteggio) => {
          return (
            <div key={punteggio.id}>
              <Card variant="outlined" sx={{ width: 320 }}>
                <Typography level="body2">
                  <strong>Punteggio:</strong> {punteggio.punteggio}
                </Typography>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};





const CardServizio = ({item,dataAcquisto,datafin,datainiz}) =>{
  
  const match = datainiz.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2}):(\d{2})\.\d{3}\+(\d{2}):(\d{2})$/);
const date = new Date(Date.UTC(
  parseInt(match[1]), // year
  parseInt(match[2]) - 1, // month (zero-based)
  parseInt(match[3]), // day
  parseInt(match[4]), // hour
  parseInt(match[5]), // minute
  parseInt(match[6]), // second
));

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  let formatteEndDate
  const formattedStartdDate = date.toLocaleDateString("it-IT", options);
  
  
  if(datafin){
    const match = datafin.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2}):(\d{2})\.\d{3}\+(\d{2}):(\d{2})$/);
    const date1 = new Date(Date.UTC(
      parseInt(match[1]), // year
      parseInt(match[2]) - 1, // month (zero-based)
      parseInt(match[3]), // day
      parseInt(match[4]), // hour
      parseInt(match[5]), // minute
      parseInt(match[6]), // second
    ));
    const EndDate = date1.toLocaleDateString("it-IT", options);
    formatteEndDate = EndDate
  }

  const link="item/prodotti/" + item._id

  let lungo=false
  if (item.tipo === "Dogsitting") lungo=true

  return(

    <Card
    variant="outlined"
    orientation="horizontal"
    sx={{
      width: 320,
      gap: 2,
      '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
    }}
  >
      
    <div>
      

        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {item.nome_struttura.nome} ,  {item.luogo}
        </Typography>
      
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
        Tipologia di servizio:  {item.tipo}
      </Typography>
      <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
        Data di acquisto:  {dataAcquisto}
      </Typography>
      {lungo?
     <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
      
        Prenotato dal : 
          <>{formattedStartdDate}</> <>al</> <>{formatteEndDate}</>
         
      </Typography>
      :
      <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
      
        Data : 
          <>{formattedStartdDate}</>
         
      </Typography>
      }

      {/*
      <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
        Dottore/modalità servizio:  {item.qualita_servizio}
      </Typography>
      <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
        Spesa: {formatCurrency(item.spesa_totale)} 
      </Typography> */}
      

    </div>
  </Card>
  )
}


const UserProfile = () => {

  const [data,setData] = useState([])
  const {user} = useAuthContext()
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState()
  const [animale, setAnimale] = useState('');
  const [dataServizio, setDataServizio] = useState([])
  const [dataNotes, setDataNotes] = useState([])
  const [dataPunteggi, setDataPunteggi] = useState([])

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const birth = user.nascita
  
  const dateArray = birth.split(" ");
  const dateWithoutTimeZone = dateArray.slice(0, 5).join(" ");
  const timestamp = Date.parse(dateWithoutTimeZone);
  //compare con un ora in piu
  const nascita = new Date(timestamp)
  const birtDate = nascita.toLocaleDateString("it-IT", options);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(user.prodotti){
    
  
    const ids = []
    user.prodotti.map(item => { ids.push(item.numId) })
    
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://site222301.tw.cs.unibo.it/api/item/filter/myProducts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ids }),
        })
        const items = await response.json()
        
        setData(items)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }
  if(user.servizi){
    const Serviceids = []
    user.servizi.map(item => { Serviceids.push(item.numId) })
    
  
    const fetchDataService = async () => {
      try {
        const response = await fetch('https://site222301.tw.cs.unibo.it/api/service/getMore', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ Serviceids }),

        })
        const items = await response.json()
        console.log(items)
        setDataServizio(items)
      } catch (err) {
        console.log(err)
      }
    }
    fetchDataService()
  }  
    
  }, [])
  

//Per ottenere le note e i punteggi per utente
useEffect(()=>{
   const id = user._id
   const fetchDataNotes = async () => {
      try {
        const response = await fetch('https://site222301.tw.cs.unibo.it/api/note/filter', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id }),

        })
        const notes = await response.json()
        console.log(notes)
        setDataNotes(notes)
      } catch (err) {
        console.log(err)
      }
    }
    fetchDataNotes()

    const fetchDataPunteggi = async () => {
      try {
        const response = await fetch('https://site222301.tw.cs.unibo.it/api/giocatore/filter', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id }),

        })
        const punteggi = await response.json()
        console.log(punteggi)
        setDataPunteggi(punteggi)
      } catch (err) {
        console.log(err)
      }
    }
    fetchDataPunteggi()
    
},[])



  const handleSubmit = async (event) => {
    console.log(name, cognome, email);
    const response = await fetch("https://site222301.tw.cs.unibo.it/api/user/profile", {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name,cognome,email,user,animale})
    })  
    const newUser = await response.json()
    console.log(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    window.location.reload(false);  
  };
   

  const[isOpen, setIsOpen] = useState(false)
 
  const toggle = ()=> {
      setIsOpen(!isOpen)
  }

   return(
    <div>
   <Sidebar isOpen={isOpen} toggle={toggle}/>
    <Navbar toggle={toggle}/>
    <Box sx={{
      margin:"40px",
      marginTop:'85px',
      }}>

    <Box
      sx={{
        marginTop:'85px',
        bgcolor: 'background.body',
        flexGrow: 1,
        m: -3,
        borderRadius: 'md',
        
      }}
      >
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={{ 
          '--Tabs-gap': '5px',
          marginTop: 3,
          
         }}
      >
        <TabList
          variant="plain"
          sx={{
            width: '100%',
            display: 'flex',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            maxWidth: 800,
            mx: 'auto',
            pt: 2,
            alignSelf: 'flex-start',
            [`& .${tabClasses.root}`]: {
              bgcolor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                fontWeight: 'lg',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '-1px',
                  left: 'var(--List-item-paddingLeft)',
                  right: 'var(--List-item-paddingRight)',
                  height: '3px',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  bgcolor: 'primary.500',
                },
              },
            },
          }}
        >
          <Tab sx={{fontSize:20}}>
            Dati Utente
          </Tab>
          <Tab sx={{fontSize:20}}>
            Acquisti
          </Tab>
          <Tab sx={{fontSize:20}}>
            Prenotazioni
          </Tab>
          {dataPunteggi || dataNotes ?
          <Tab sx={{fontSize:20}}>
            Comunità
          </Tab>
          :
          ''
}
        </TabList>
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.level3,
            height: '1px',
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
          })}
        />
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.surface,
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
            px: 4,
            py: 2,
          })}
        >
          <TabPanel value={0}>
            <Typography
              level="h2"
              component="div"
              fontSize="lg"
              mb={2}
              textColor="text.primary"
            >
              <h3>I Miei dati:</h3>
              <ul>
                <li><strong>Nome: </strong>{user.name}</li>
                <li><strong>Cognome: </strong>{user.cognome}</li>
                <li><strong>Data di nascita: </strong>{birtDate}</li>
                <li><strong>Sesso: </strong>{user.sesso}</li>
                <li>
                  <strong>Animale preferito:</strong>
                  <ul>
                    {user.animale}
                  </ul>
                </li>
                <li><strong>Email: </strong>{user.email}</li>
              </ul>
              <>
              <Button variant="primary" onClick={handleShow}>
        Modifica le tue credenziali
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cambia qui le tue credenziali</Modal.Title>
        </Modal.Header>
        <form className="signup">
          
          <label>Email address:</label>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
          <label>Password:</label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
          <label>Name</label>
          <input 
            type="name" 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
          <label>Cognome</label>
          <input 
            type="cognome" 
            onChange={(e) => setCognome(e.target.value)} 
            value={cognome} 
          />
           <label>Animale</label>
           <input 
            type="animale" 
            onChange={(e) => setAnimale(e.target.value)} 
            value={animale} 
          />
          </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

            </Typography>
          </TabPanel>
          <TabPanel value={1}>
            
              <h3>I miei acquisti:</h3>
              <Box sx={{ display: 'flex', flexDirection: {md:'row', sx:'column'}, alignItems: 'center', gap: '16px' }}>
              {
             data.map((item,index)=>{
              const { quantità, dataAcquisto } = user.prodotti[index];
                return(
                  <CardAcquisto item={item} quantity={quantità} data_acquisto={dataAcquisto} />
                )

              })
            }
             

              </Box>
            
          </TabPanel>
          <TabPanel value={2}>

            <h3>Le mie prenotazioni:</h3>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>

            {
              dataServizio.map((service,index)=>{
                console.log(user.servizi[index])
                const { datainiz, datafin, dataAcquisto } = user.servizi[index];

                return(
                  <CardServizio item={service} dataAcquisto={dataAcquisto} datafin={datafin} datainiz={datainiz} />
                )
              })
            }
            </Box>
          </TabPanel>
          
          <TabPanel value={3}>
            {console.log(dataNotes,dataPunteggi)}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>          
                  <CardComunity  note={dataNotes} punteggi={dataPunteggi}/>
            </Box>
          </TabPanel>
          
        </Box>
      </Tabs>
    </Box>

      
    </Box>
     
    
    </div>
    )
  }
  
  export default UserProfile

  /*
<Button1 onClick={handleClick}>Log out</Button1>

   <Row className= 'profileContainer'>
         <Col md={6}>
         <Form onSubmit={submitHandler}>
           <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
               type= "text"
               placeholder="Enter Name"
               value= {name}
               onChange= {(e)=>setName(e.target.value)}>
               </Form.Control>
               </Form.Group>
               <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
               type= "email"
               placeholder="Enter Email"
               value= {email}
               onChange= {(e)=>setEmail(e.target.value)}>
               </Form.Control>
               </Form.Group>
               <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
               type= "password"
               placeholder="Enter Password"
               value= {password}
               onChange= {(e)=>setPassword(e.target.value)}>
               </Form.Control>
           </Form.Group>
           <Form.Group controlId="Confirm password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
               type= "password"
               placeholder="Confirm Password"
               value= {confirmPassword}
               onChange= {(e)=>setConfirmPassword(e.target.value)}>
               </Form.Control>
           </Form.Group>
           <Button type="submit" varient="primary">
            Update
           </Button>
         </Form>
         </Col>
         
      </Row>
  */