 import React from 'react'
import Footer from '../components/Footer'
import InfoSection from '../components/InfoSection'
import { objDogSitter, objVeterinario, objToilettatura,objPsicologo } from '../components/InfoSection/Data'
import Navbar from '../components/Navbar'
import Slider from '../components/StorePage/Slider'
import styled from 'styled-components'
import axios from 'axios'
import { useState ,useEffect } from 'react'
import Sidebar from '../components/Sidebar'


const Container1= styled.div`
  margin-top: 80px;
  margin-left: 2em;
  margin-right: 2em; 

`

 
const PresenzaPage = () => {
  
  const[isOpen, setIsOpen] = useState(false)
 
    const toggle = ()=> {
        setIsOpen(!isOpen)
    }
  return (

    <div> 

<Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />     
      <InfoSection {...objVeterinario} />
      <InfoSection {...objDogSitter} />
      <InfoSection {...objToilettatura} />
      <InfoSection {...objPsicologo} />
      <Footer />
    </div>
  )
}

export default PresenzaPage