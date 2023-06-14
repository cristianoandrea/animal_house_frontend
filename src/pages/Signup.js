import { Box } from "@mui/material"
import { useState } from "react"
import styled from 'styled-components';
import { Button1 } from "../components/ButtonElement"
import { useSignup } from "../hooks/useSignup"
import { Buttone } from "./prodotto_singolo"
import { useNavigate } from "react-router-dom";

const GenderSelection = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;
 
const GenderLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const GenderChoice = styled.label`
  margin-right: 10px;
`;

const AnimalSelection = styled.select`
  margin-top: 10px;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;



const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [name, setName] = useState('')
  const [cognome, setCognome] = useState('') 
  const [dataNascita, setDataNascita] = useState('');
  const [sesso, setGender] = useState('');
  const [favoriteAnimal,setFavoriteAnimal] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email,password, name,cognome,dataNascita,sesso,favoriteAnimal)
    await signup(email, password, name, cognome,dataNascita,sesso,favoriteAnimal)
  }

  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop:20
      }}>
        
        
        <h1>Registrati</h1>
        <form className="signup" onSubmit={handleSubmit}>
          
          <label>Indirizzo email:</label>
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
          <label>Nome</label>
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
          <label>Data di nascita</label>
         <input 
            type="date" 
            onChange={(e) => setDataNascita(e.target.value)} 
            value={dataNascita} 
          />
           <GenderSelection>
  <GenderLabel>Sesso:</GenderLabel>
    
    <GenderChoice>
      <input 
        type="radio" 
        name="gender" 
        value="maschio" 
        checked={sesso === 'maschio'} 
        onChange={(e) => setGender(e.target.value)} 
      /> Maschio
   
   </GenderChoice>
    <GenderChoice>
      <input 
        type="radio" 
        name="gender" 
        value="femmina" 
        checked={sesso === 'femmina'} 
        onChange={(e) => setGender(e.target.value)} 
      /> Femmina
  </GenderChoice>
  <GenderChoice>
      <input 
        type="radio" 
        name="gender" 
        value="altro" 
        checked={sesso === 'altro'} 
        onChange={(e) => setGender(e.target.value)} 
      /> Altro
    </GenderChoice>
    </GenderSelection>


    <AnimalSelection
  onChange={(e) => setFavoriteAnimal(e.target.value)}
  value={favoriteAnimal}
>
  <option value="">Scegli il tuo animale preferito</option>
  <option value="dog">Cane</option>
  <option value="cat">Gatto</option>
  <option value="bird">Uccello</option>
  <option value="fish">Pesce</option>
</AnimalSelection>
          
          <Buttone style={{margin:10}} disabled={isLoading}>Registrati</Buttone>
          {error && <div className="error">{error}</div>}
        </form>

        <p>Hai già un account? Allora procedi col login <span><Button1 to="/login">Login</Button1></span></p>

        <Button1 to="/">Home</Button1>
        
      </Box>
    </>
  )
}

export default Signup