import * as React from 'react';
import styled from "styled-components";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { mobile } from "../responsive";


const Button1= styled.button`
margin-top:10px;
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606; 
    font-size: 16px;
    outline: none;
    border:none;
    cursor:pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        background: #fff;
        transition: all 0.2s ease-in-out;
        color: #010606;
    }
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'cane', 'gatto', 'orso', 'criceto','pesce'
];

const tags = [
    'cibi' , 'sanitari', 'accessori', 'giochi'
]



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FiltriProdotti(props) {
  const theme = useTheme();
  const [Animal, setAnimal] = React.useState([]);
  const handleChange = (event) => {
    const {
        target: { value },
    } = event;
    setAnimal(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };
    
    const [order, setOrder] = React.useState('');
    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    };
    
  const [tag, setTag] =  React.useState([]);
  const handleTagChange = (event) => {
    setTag(event.target.value);
  };
  
  const [recensioni,setRecensioni] =  React.useState([]);
  const handleRecensioniChange = (event) => {
    setRecensioni(event.target.value);
  };

  const [filtri,setFiltri] =  React.useState([]);
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://site222301.tw.cs.unibo.it/api/item/filter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Animal,tag,recensioni }),
    });
    const data = await response.json();
    setFiltri(data)
    props.onSubmit(data)
};

  return (
    <FilterContainer>


    <form onSubmit={handleSubmit}>
        <Filter>
            <FormControl sx={{ 
              m: 1, width:300, minWidth: 250, height: 70, }}
              justifyContent="center" 
              alignItems="center" >
            <InputLabel 
             sx={{
                typography:{
                  fontFamily: 'Encode Sans Expanded',
                }
              }}
             id="tipo_animale">Tipo Animale</InputLabel>
            <Select
                name='animale'
                labelId="tipo_animale"
                id="tipo_animale"
                multiple
                value={Animal}
                onChange={handleChange}
                input={<OutlinedInput id="tipo_animale" label="Tipo Animale" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                sx={{
                    height: 60,
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
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, Animal, theme)}
                        sx={{
                            borderRadius:3,
                            typography:{
                              fontFamily: 'Encode Sans Expanded',
                            },
      
                          }}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300, height: 70 }}>
            <InputLabel
            sx={{
                typography:{
                  fontFamily: 'Encode Sans Expanded',
                }
              }}
            id="tipo_animale">Tag</InputLabel>
            <Select
                name='tag'
                labelId="tipo_tag"
                id="tipo_tag"
                multiple
                value={tag}
                onChange={handleTagChange}
                input={<OutlinedInput id="tipo_tag" label="Tag" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                sx={{
                    height: 60,
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
                {tags.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, Animal, theme)}
                        sx={{
                            borderRadius:3,
                            typography:{
                              fontFamily: 'Encode Sans Expanded',
                            },
      
                          }}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>





        <Button1 type="submit">Cerca</Button1>     
        </Filter>
        
        
               
    </form>

      
    </FilterContainer>
  );
}