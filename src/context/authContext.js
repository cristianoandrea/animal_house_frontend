import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  } 
}


//per cambiare i dati nel local storage, ancora da implementare
export const userUpdateReducer = (state, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return { loading:true }
    case 'USER_UPDATE_SUCCESS':
      return { loading: false, userInfo: action.payload, success: true }
    case 'USER_UPDATE_FAIL':
      return {loading: false, error: action.payload, success: false}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user){
      dispatch({type: 'LOGIN', payload:user})
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

  
}