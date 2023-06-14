import React from 'react'
import{
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesIcon,
    ServicesH2,
    ServicesP
} from './ServicesElements'
import Icon1 from '../../images/svg-1.svg'
import Icon2 from '../../images/svg-2.svg'
import Icon3 from '../../images/svg-3.svg'
import { Button1 } from '../ButtonElement'

const Services = () => {
  const icon1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixGlza9yIzG4did6MMg0VKDW5sZmY4LwETA&usqp=CAU"
  const icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr29FIzv6U69xqq76Bja05wvfa5WkF1FDHlg&usqp=CAU"
  const icon3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzdGdFB0r-9Rz1TOAQv0xJ2gXfapRLnwaig&usqp=CAU"
  return (
    <ServicesContainer id="services">
        <ServicesH1> 
            Seleziona la tua preferenza
        </ServicesH1>
        <ServicesWrapper>
            
            <ServicesCard>
                <ServicesIcon src={Icon1}/>
                <ServicesH2>Cani</ServicesH2>
                <ServicesP>La migliore selezione</ServicesP>
                <Button1 to="/store/prodotti?animale=cane">Acquista Ora!</Button1>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon2}/>
                <ServicesH2>Gatti</ServicesH2>
                <ServicesP>La migliore selezione</ServicesP> 
                <Button1 to="/store/prodotti?animale=gatto">Acquista Ora!</Button1>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon3}/>
                <ServicesH2>Store</ServicesH2>
                <ServicesP>Visualizza tutti i prodotti</ServicesP>
                <Button1 to="/store/prodotti?animale=Altro" >Acquista Ora!</Button1>
            </ServicesCard>

        </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services