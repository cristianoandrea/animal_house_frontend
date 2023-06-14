import { Divider } from '@mui/joy'
import { Rating } from '@mui/material'
import React from 'react'

const Recensione = ({data}) => {
  return (
    <div>
        
        <h4>{data.nome}</h4> 
        
        <label for="read-only">Valutazione:</label>
        <Rating name="read-only" value={data.rating} readOnly /> 
        <p>{data.txt}</p> 
        <br/>
    </div>
  )
}
 
export default Recensione