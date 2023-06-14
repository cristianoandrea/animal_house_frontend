import { Box } from "@mui/material"
import { useState } from "react"
import { Button1 } from "../components/ButtonElement"
import { useLogin } from "../hooks/useLogin"
import { Buttone } from "./prodotto_singolo"
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const{login,error,isLoading} = useLogin()
    let navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault()
        await login(email,password)
        //navigate('http://https://site222301.tw.cs.unibo.it/');
  }
    

    return (
        <>
        <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop:20
        }}>
        <h1>Accedi</h1>
        <form className="login" onSubmit={handleSubmit}>
            
            <label>Email:</label>
            <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
              <label>Password:</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
              <Buttone style={{margin:10}} disabled={isLoading}>Log in</Buttone>
              {error&& <div className="error">{error}</div>}
              
        </form>
        <p>Non hai un account? <span><Button1 to="/signin">Registrati</Button1></span></p>
        
        <Button1 to="/" >Home</Button1>
        </Box>
        </>
    )
}

export default Login