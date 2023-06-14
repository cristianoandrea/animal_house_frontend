
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages';
import SignInPage from './pages/Signup';
import LogInPage from './pages/Login';
import StorePage from './pages/store';
import PresenzaPage from './pages/presenza';
import CheckoutPage from './pages/checkout';
import CheckoutPageService from './pages/checkoutService';
import CommunityPage from './pages/community';
import Prodotti from './pages/prodotti';
import UserProfile from './pages/userProfile';
import SingleProduct from './pages/prodotto_singolo';
import 'bootstrap/dist/css/bootstrap.min.css';
import PresenzaServizio from './pages/presenzaServizio';
import { ShoppingCartProvider } from './context/shoppingCartContext';
import { useAuthContext } from './hooks/useAuthContext';



function App() { 
  
  const {user} = useAuthContext()

  return (
    <ShoppingCartProvider>

    <Router >
      <div className='pages'>
      <Routes>     
        <Route path='/' caseSensitive={false} element={<Home />} />
        <Route path='/signin' caseSensitive={false} element={!user ? <SignInPage /> : <Navigate to="/"/>} />
        <Route path='/login' caseSensitive={false} element={!user ? <LogInPage/> : <Navigate to="/"/>} />
        <Route path='/store' caseSensitive={false} element={<StorePage />} />
        <Route path='/store/prodotti' caseSensitive={false} element={<Prodotti />} /> 
        <Route path='/store/prodotti/:id' caseSensitive={false} element={<SingleProduct />} />
        <Route path='/presenza' caseSensitive={false} element={<PresenzaPage />} />
        <Route path='/presenza/veterinario' caseSensitive={false} element={<PresenzaServizio service={'Veterinario'} time={true}  />} />
        <Route path='/presenza/toilettatura' caseSensitive={false} element={<PresenzaServizio service={'Toelettatura'} time={true} />} />
        <Route path='/presenza/dogsitting' caseSensitive={false} element={<PresenzaServizio service={'Dogsitting'} time={false}/>} />
        <Route path='/presenza/psicologo' caseSensitive={false} element={<PresenzaServizio service={'Psicologo'} time={true} />} />
        <Route path='/community' caseSensitive={false} element={<CommunityPage />} />
        <Route path='/userprofile' caseSensitive={false} element={user? <UserProfile />:  '' } />
        <Route path='/checkout' caseSensitive={false} element={<CheckoutPage />} />
        <Route path='/checkoutService' caseSensitive={false} element={<CheckoutPageService />} />   
      </Routes>

      </div>
    </Router>
    </ShoppingCartProvider>
  );
}

export default App;