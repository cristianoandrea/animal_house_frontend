import React, { useState } from 'react';
import { Grid, FormControl,Input, InputLabel, Select, MenuItem, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Button from '@mui/joy/Button';



const Button1= styled.button`

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
justify-content: center;

`;



const cities=[
  'Bologna', 'Roma', 'Bari', 'Napoli', 'Milano', 'Plermo', 'Ancona',"Catania",'Torino','Firenze'
]

//se time è true => veterinairo
//time = falso => dogsitter e daterange
const FiltriServices = ( {time,onPass,service} ) => {
  const [city, setCity] = useState("");
  const [animal, setAnimals] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(), 1);
  const [tipo, setTipo] = useState("");
  const [animalQuantity, setAnimalQuantity] = useState(0);
  const [animaliPiccoli, setPiccoli]= useState(0)
  const [animaliMedi, setMedi]= useState(0)
  const [animaliGrandi, setGrandi]= useState(0)


  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  //qui vengono salvati tutti gli animali con le relative quantità
  const [pets, setPets] = useState(
    [
      {
        name: "Cane", key: "medio", quantity: 0
      },
      {
        name: "Gatto", key: "medio", quantity: 0
      },
      {
        name: "Pesce", key: "piccolo", quantity: 0
      },
      {
        name: "Tigre", key: "grande", quantity: 0
      },
    ]
    )
    
  


  const handleSubmit = async (event) => {
    let data={}
    event.preventDefault();
    if(time){
    console.log(city,startDate);
    const response = await fetch("https://site222301.tw.cs.unibo.it/api/service/filter/veterinario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({city, startDate, service}),
    });
    data = await response.json(); 
    console.log(data);
    const originalDate = new Date(startDate);

    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");
    const hours =  originalDate.getHours().toString().padStart(2, "0");
    const minutes =  originalDate.getMinutes().toString().padStart(2, "0");

    const isoDateString = `${year}-${month}-${day}-${hours}-${minutes}:00.000+00:00`;
    const newParams = {
      tipo: tipo,
      city: city,
      animal: animal,
      date: isoDateString,
    };

    const currentSearchParams = new URLSearchParams(window.location.search);
 
    Object.entries(newParams).forEach(([key, value]) => {
      currentSearchParams.set(key, value);
    });

    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${currentSearchParams.toString()}`; 

    window.history.replaceState({}, "", newUrl);
  }
  else{
    console.log(city,startDate,endDate,animaliPiccoli,animaliMedi,animaliGrandi)
    const response = await fetch("https://site222301.tw.cs.unibo.it/api/service/filter/dogsitter",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({city, startDate,endDate,animaliPiccoli,animaliMedi,animaliGrandi}),
    })
    data = await response.json()
    console.log(data)
    //console.log(data.dottore)

    const originalDate = new Date(startDate);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");
    const hours =  originalDate.getHours().toString().padStart(2, "0");
    const minutes =  originalDate.getMinutes().toString().padStart(2, "0");
    const isoDateString = `${year}-${month}-${day}-${hours}-${minutes}:00.000+00:00`;
    const originalEndDate = new Date(endDate);
    const year1 = originalEndDate.getFullYear();
    const month1 = (originalEndDate.getMonth() + 1).toString().padStart(2, "0");
    const day1 = originalEndDate.getDate().toString().padStart(2, "0");
    const hours1 =  originalEndDate.getHours().toString().padStart(2, "0");
    const minutes1 =  originalEndDate.getMinutes().toString().padStart(2, "0");
    const isoDateString1 = `${year1}-${month1}-${day1}-${hours1}-${minutes1}:00.000+00:00`;
    console.log(originalDate,originalEndDate,isoDateString,isoDateString1)
    const newParams = {
      tipo: tipo,
      city: city,
      animal: animal,
      date: isoDateString,
      endDate: isoDateString1,
      piccoli: animaliPiccoli,
      medi: animaliMedi,
      grandi: animaliGrandi
    };

    const currentSearchParams = new URLSearchParams(window.location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      currentSearchParams.set(key, value);
    });

    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${currentSearchParams.toString()}`;

    window.history.replaceState({}, "", newUrl);
  }
  
    
    onPass(data);
   
  };

  

  const handleAnimalQuantityChange = (animalIndex, quantity) => {
    const newPets = [...pets];
    const newQuantity = newPets[animalIndex].quantity + quantity;
    newPets[animalIndex].quantity = newQuantity;
    //setAnimalQuantity((animalQuantity - newPets[animalIndex].quantity) + newQuantity);
    setPets(newPets);
  };
  
  
  //const { options, ...rest } = props;

  return (
    <FilterContainer>
      
      <form onSubmit={handleSubmit}>

      <Grid 
        container 
        spacing={{xs:2, sm: 2, md:8}} 
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{margin:10}}
       >
        {time?
        <Box sx={{marginTop:5}}>
        <h1>Filtri:</h1>
      </Box>
       :
        <Grid item xs={12} sm={6} md={4}>
        <InputLabel
          sx={{
            typography:{
              fontFamily: 'Encode Sans Expanded',
            }
          }} id="label-animali">Animali</InputLabel>
          <FormControl  size="small">
            <Select
            labelId="label-animali"
            name="animali"
            value={animalQuantity}
            sx={{
              height: 60,
              menuStyle:{
                borderRadius:5,
              },
              '.MuiList-root-MuiMenu-list' :{
                borderRadius:3,
              },
              minWidth: 300,
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
            }}>

           {
            pets.map((pet, index)=>{
              return(
                <MenuItem >
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      {pet.name}
                    </Grid>
                    <Grid item xs={6}>
                    <Button onClick={() => {
                        if (pet.quantity >= 1) {
                          if(pet.key=="piccolo")setPiccoli(animaliPiccoli -1)
                          else if(pet.key=="medio")setMedi(animaliMedi -1)
                          else if(pet.key=="grande")setGrandi(animaliGrandi -1)
                          
                          handleAnimalQuantityChange(index, -1)
                        console.log("piccoli", animaliPiccoli)
                        console.log("medi", animaliMedi)
                        console.log("grandi", animaliGrandi)
                        }
                      }}>-</Button>
                      <span>{pet.quantity}</span>
                      <Button onClick={() => {
                        if(pet.key=="piccolo")setPiccoli(animaliPiccoli + 1)
                        else if(pet.key=="medio")setMedi(animaliMedi + 1)
                        else if(pet.key=="grande")setGrandi(animaliGrandi + 1)
                        handleAnimalQuantityChange(index, 1)
                        
                        console.log("piccoli", animaliPiccoli)
                        console.log("medi", animaliMedi)
                        console.log("grandi", animaliGrandi)
                        console.log(pets)
                      }}>+</Button>
                    </Grid>
                  </Grid>
                </MenuItem>
              )
            })
           }     
            </Select>
          
          </FormControl>
        </Grid>
         }
        <Grid item xs={12} sm={6} md={4}>
          <div>Città</div>
        <FormControl  size="small">
              <Select
                  name="city"
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={city}
                  onChange={handleCityChange}
                  sx={{
                      height: 60,
                      menuStyle:{
                        borderRadius:5,
                      },
                      '.MuiList-root-MuiMenu-list' :{
                        borderRadius:3,
                      },
                      minWidth: 300,
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
                    cities.map((city)=>{
                      return(
                        <MenuItem
                    value={city}
                    key={city}
                    sx={{
                      borderRadius:3,
                      typography:{
                        fontFamily: 'Encode Sans Expanded',
                      },
                    }}
                    >
                    {city}
                    </MenuItem>
                      )
                    })
                  }
              </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        {
          time ?
          <>
          <div>Data</div>
          <DatePicker 
            name="data"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect
            minDate={new Date()}
            customInput={(
              <Input
                  style={{ 
                    width:'300px',
                    height:"60px", 
                    borderRadius: "10px",
                    borderStyle:' solid', 
                    borderWidth:'thin',
                    borderColor:'black', 
                    backgroundColor:"white",
                    fontFamily: 'Encode Sans Expanded',
                    
                  }}
            />
            )}
          />
        
        
          </>
          
          :
          <div>
            <div>Dal giorno</div>
            <DatePicker
            name="from"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={(
              <Input
                  style={{ 
                    width:'300px',
                    height:"60px", 
                    borderRadius: "10px",
                    borderStyle:' solid', 
                    borderWidth:'thin',
                    borderColor:'black', 
                    backgroundColor:"white",
                    fontFamily: 'Encode Sans Expanded',
                    marginBottom: "10px"
                  }}
              />
              )}
            /> 
            <div>Al giorno</div>
            <DatePicker
            name="to"
            dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              customInput={(
                <Input
                    style={{ 
                      width:'300px',
                      height:"60px", 
                      borderRadius: "10px",
                      borderStyle:' solid', 
                      borderWidth:'thin',
                      borderColor:'black', 
                      backgroundColor:"white",
                      fontFamily: 'Encode Sans Expanded',
                      marginBottom: "10px"
                    }}
                />
                )}
            />
            


          </div>

        }
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
        <Button1 type="submit">Cerca</Button1>
        </Grid>
        
      </Grid>
      </form>
    </FilterContainer>
  )
}
export default FiltriServices



//se time è true => veterinairo
//time = falso => dogsitter e daterange
/*
unica variabile in input è lì per dirmi se è dogsitting o 
servizio giornaliero tipo veterinario. L'u
nica differenza diventa
quindi la presenza della data di fine trattamento nei filtri.
Per il resto ho bisogno di Animale e numero, e data di inizio


<MenuItem
  value={name}
  key={name}
  sx={{
    borderRadius:3,
    typography:{
      fontFamily: 'Encode Sans Expanded',
    },
  }}
  >
  {name}
  </MenuItem>
  */