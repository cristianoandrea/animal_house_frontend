import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import {React, useState,useEffect } from "react";
import Button from '@mui/joy/Button';
import { sliderItems } from "../data";
import { Button1 } from "../../ButtonElement";
import { Box, Grid } from "@mui/material";
import Garfield from './garfield.jpg'
import { withStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import { Grommet, Carousel, Image} from 'grommet';
import { Buttone } from "../../../pages/prodotto_singolo";
import { AspectRatio } from "@mui/joy";

/*
struttura unica per due usi:
1) Nella schermata del singolo prodotto per mostrare img in gallery (solo img)
2) In schermate per mostrare vari servizi (img + testo)

In comune:
struttura dati immagine:
    image{
        path
        alt (roba che serve per descrivere ai non vedenti)
    }
roba per scorrere schede

Diverso:
Grid:
    1) una colonna full width per immagini
    2) due colonne 
Struttura dati per testo:
    in 2) in ogni dato oltre ai due dati proposti prima vengono aggiunti
    campi "title", "desc"

dati in input: (image, testo)
image è l'array con tutte le immagini (ed eventualmente il testo) formattate come sopra
testo è un bool che specifica se è presente o meno del testo


const data={
    images: [
        {
          path: "//v2.grommet.io/assets/Wilderpeople_Ricky.jpg",
          alt: 'Garfield',
          title: "porcodio non ne posso più....",
          description:"Un uomo va dal dottore... porcamadonna...",
          button: "Placa questo dolore "
        },
        {
          path: "//v2.grommet.io/assets/IMG_4245.jpg",
          alt: 'Leone',
          title: "Prodotti per cagnetti mongoloidi",
          description:"sfama il suo appetito con classe",
          button: "Placa questo dolore"
        },
      ],
}

*/

const Container = styled.div`
width: 100%;
height: 90vh;
margin-top:80px;
@media screen and (max-width: 768px) {
    height:130vh;
}

`
const Container2=styled.div`
height: 100vh;
@media screen and (max-width: 768px) {
    height:40vh;
    text-align:center
}
`

const Image1 = styled.img`
height: 100vh;
width:100%
object-fit: cover;
image-rendering: optimizeQuality;
`;

const Testo=styled.div`
margin-top: 15em;
margin-left: 2em;
@media screen and (max-width: 768px) {
    margin-top: 2em;
}
`

const Slider = ({data, testo}) => {

     

  return (
    <div>
        {
            testo ?
<Box sx={{
                width:'100%',
                marginTop: '80px',
                height: '100%'
            }}>
                <Carousel fill>
                        {
                            data.images.map((item)=>{
                                return(
                                    <Grid container spacing={5}>
                                    
                                    <Grid item xs={12} md={7} >
                                        <AspectRatio
                                         ratio="4/3"
                                         objectFit="cover">
                                            <Image1 src={item.path} alt={item.alt} />
                                        </AspectRatio>
                                    </Grid>
                                    <Grid item xs={12} md={5} >
                                        <Box sx={{
                                            marginTop:{md:8, xs:0},
                                            marginLeft:{md:1, xs:1},
                                            marginBottom:{xs:10}
                                        }}>
                                        <h1>{item.title}</h1>
                                        <br/>
                                        <h4>{item.description}</h4>
                                        <a >
                                        <br/>
                                        <Button1 to={`/store/prodotti?tipo=${item.filtro}`}>{item.button}</Button1>                                        </a>
                                        </Box>
                                    </Grid>
                                    </Grid>
                                    

                                )
                            })
                        }
                
                </Carousel>
            </Box>            :
            <Carousel fill>
                <Container2>

                    {
                        data.images.map((item)=>{
                            return(
                                <Image1 src={item.path} alt={item.alt} />
                                )
                            })
                    }
                
                </Container2>
                </Carousel>
        }
    </div>
  )
}


export default Slider

/*
<Container>
        <Carousel fill>
        <Box>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} >
            <Image1 fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
            </Grid>
            <Grid item xs={12} md={6} >
                <h1>Titolo scheda</h1>
                <h4>Descrizione scheda</h4>
                <Button>Evvai</Button>
            </Grid>
            
            
            </Grid>
        </Box>
    
        <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
        <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Carousel>
    </Container>

<Arrow direction="left" onClick={() => handleClick("left")}>
              <ArrowLeftOutlined />
          </Arrow>
          <Wrapper slideIndex={slideIndex}>
            {
                data.data.map((item)=> {
                    return(
                    <Slide bg={'#2EFE9A'}>
                        <ImgContainer>
                            <Image src={item.image} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.name}</Title>
                            <Desc>{"piuttosto bizzarro, nevvero? 😏"}</Desc>
                            <Button1 to={""}>{item.prezzo}</Button1>
                        </InfoContainer>
                    </Slide>
                )
                    }
            )}

          </Wrapper>

          <Arrow direction="right" onClick={() => handleClick("right")}>
              <ArrowRightOutlined />
          </Arrow>
*/