import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Slider, Stack } from '@mui/material'
import React from 'react'
import { Button1 } from '../ButtonElement';
import { useState } from 'react';

const animali = [
  'Cane', 'Gatto', 'Cavallo', 'Topo', 'Diocane'
]

const Filtri = () => {

  const [animale, setAnimale] = useState([])

  const handleChange = (event) => {
    setAnimale(event.target.value);
  };
 
  const [age, setAge] = React.useState('');

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <div>
      <form method="GET" action='/store/prodotti'>
      <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="tipo_animale">Tipo Animale</InputLabel>
            <Select
                name='animale'
                labelId="tipo_animale"
                id="tipo_animale"
                multiple
                value={animale}
                onChange={handleChange}
                input={<OutlinedInput id="tipo_animale" label="Tipo Animale" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                
            >
                {animali.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button1 type="submit">Cerca</Button1>     
      </form>
    </div>
  )
}

export default Filtri

/*

<FormControl sx={{marginTop:5}}>
        <InputLabel sx={{
          typography:{
            fontFamily: 'Encode Sans Expanded',
          }
        }} id="tipo_animale">Animale</InputLabel>
        <Select
            name="animale"
            labelId="tipo_animale"
            id="tipo_animale"
            value={animale}
            onChange={handleChange}
            
            sx={{
              menuStyle:{
                borderRadius:5,
              },
              '.MuiList-root-MuiMenu-list' :{
                borderRadius:3,
              },
              minWidth: 200,
              borderRadius:3,
              borderColor: 'text.primary',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              listbox:{
                borderRadius:3,
              },
              typography:{
                fontFamily: 'Encode Sans Expanded',
              }
            }}
            
          >
            {
              animali.map((item)=>{
                return(
                  <MenuItem 
                    value={item}
                    sx={{
                      borderRadius:3,
                      typography:{
                        fontFamily: 'Encode Sans Expanded',
                      },

                    }}>{item}</MenuItem>
                )
              })
            }
            
          </Select>
          </FormControl>




<FormControl sx={{minWidth: 200, minHeight: 60}}>
          
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder='animale'
            label="Age"
            sx={{
              borderRadius:3,
              borderColor: 'text.primary',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              listbox:{
                borderRadius:3,
              },
              typography:{
                fontFamily: 'Encode Sans Expanded',
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder='tag'
            sx={{
              borderRadius:3,
              borderColor: 'black',
              
              listbox:{
                borderRadius:3,
              },
              typography:{
                fontFamily: 'Encode Sans Expanded',
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder='prezzo'
            label="Age"
            sx={{
              borderRadius:3,
              borderColor: 'black',
              
              listbox:{
                borderRadius:3,
              },
              typography:{
                fontFamily: 'Encode Sans Expanded',
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

        </FormControl>

        */