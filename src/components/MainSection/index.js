import React , {useState} from 'react'
import {Button} from '../ButtonElement'
import {
    HeroContainer,
    HeroBG,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
    } from './MainElements'

const MainSection = () => {
    const[hover,setHover] = useState(false) 

    const onHover= () =>{
        setHover(!hover)
    }

  return (
    <HeroContainer>
        <HeroContent>
            <HeroH1>Benvenut* su Animal House!</HeroH1>
            <HeroP>
            Il luogo ideale per prenderti cura del tuo animale nel miglior modo possibile. <br />
            Qui troverai i migliori prodotti, le migliori strutture e i migliori specialisti per dare al tuo animaletto il servizio che si merita!
            </HeroP>
           
        </HeroContent>

        

    </HeroContainer>
  )
}

export default MainSection