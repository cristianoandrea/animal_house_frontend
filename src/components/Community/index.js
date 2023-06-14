import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert"; 
import { AspectRatio,Card, Box, Tab, tabClasses, TabList, TabPanel, Tabs } from "@mui/joy";
import CartItem from "../CartItem";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Grid from '@mui/material/Grid';
import { Button1 } from "../ButtonElement";

const CardNote = (note) => {
  console.log(note.nameAnimal)
  console.log(note)

  return(
    <div>
      <div>
      
                 <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
       <strong>Nome:</strong>  {note.item.nameAnimal}
      </Typography>
      <Typography level="body2"> <strong>Padrone:</strong>{note.item.username} </Typography>
      <Typography level="body2"> <strong>Specie:</strong> {note.item.species}</Typography>
      <Typography level="body2"> <strong>Sesso:</strong> {note.item.sex} - <strong>Età:</strong> {note.item.age}</Typography>
      <Typography level="body1">
      <strong>Descrizione:</strong> {note.item.descrizione}
      </Typography>
      <Typography level="body1">
        <strong>Situazione medica:</strong> {note.item.medicalConditions}
      </Typography>
    </Card>
      </div>
    </div>

  );
}

const CardPunteggi = (punteggio) => {
  return(
    <div>
      <div>
      
    <Card variant="outlined" sx={{ width: 320 }}>
    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
       <strong>Nome:</strong>  {punteggio.item.nome}
      </Typography>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
       <strong>Punteggio:</strong>  {punteggio.item.punteggio}
      </Typography>
    </Card>
      </div>
    </div>

  );
}





const Community = ({note,giocatore}) => { 
  console.log(note.data)
  console.log(giocatore.data)
  const [index, setIndex] = useState(0);
  const[isOpen, setIsOpen] = useState(false)
 
  const toggle = ()=> {
      setIsOpen(!isOpen)
  }

  return (
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
            Bacheca
          </Tab>
          <Tab sx={{fontSize:20}}>
          Punteggi
          </Tab>
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
          <h3>Bacheca eccolo qui:</h3>
          <p>Qui trovi le descrizioni dei cuccioli dei nostri utenti. <a href="https://site222301.tw.cs.unibo.it/game/community">Aggiungine una anche tu!</a></p>
          <Grid container spacing={2}>
  {note.data.map((item, index) => (
    <Grid item xs={12} md={4} key={index}>
      <CardNote item={item} />
    </Grid>
  ))}
</Grid>

          </TabPanel>
          <TabPanel value={1}>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>          
            <table  class="table">
            <thead>
              <tr>
                <th class="text-center">Nome</th>
                <th class="text-center">Punteggio</th>
              </tr>
            </thead>
            <tbody>
              {
             giocatore.data.map((item,index)=>{
              console.log(item)
                return(
<tr >
                  <td>{ item.nome }</td>
                  <td>{ item.punteggio }</td>
                  </tr>
                                  )

              })
            }
           </tbody>
          </table>
           </Box>
           <a href="https://site222301.tw.cs.unibo.it/game/games">Clicca qui per i nostri giochi!</a>

            
          </TabPanel>
        </Box>
      </Tabs>     
      </Box>  
</Box>

    </div>
  );
};

export default Community;
