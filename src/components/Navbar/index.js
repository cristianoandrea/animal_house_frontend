import React, {useEffect, useState} from 'react'
import { FaBars } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { animateScroll as scroll } from 'react-scroll'
import { useShoppingCart } from '../../context/shoppingCartContext'
import Dropdown from '../Dropdown'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll'
import ShoppingCart from '../ShoppingCart'
import { useAuthContext  } from '../../hooks/useAuthContext'
import { CartIcon, MobileIcon, Nav, NavbarContainer, NavBtn, NavItem, NavLink, NavLink1, NavLogo, NavMenu } from './NavbarElements'

    
export const NavBtnLink= styled(LinkRouter)`
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

const Navbar = ({ toggle }) => {
  
  const {user} = useAuthContext()
  
  const {openCart, cartQuantity, isOpen} = useShoppingCart()  

  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if(window.scrollY >= 80) {
        setScrollNav(true);
    } else {
        setScrollNav(false);
    }
  }

  useEffect(() =>{
    window.addEventListener('scroll', changeNav);
  }, [])

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  

  return (
    <div>
        <IconContext.Provider value={ {color: '#fff'} }>
        <Nav scrollNav={scrollNav}>
            <NavbarContainer>

                <NavLogo to="/" onClick={toggleHome}>
                    Animal House 
                    </NavLogo>
                <CartIcon>

                    {cartQuantity > 0 && (
                            <ShoppingCart isOpen={isOpen}>
                                {cartQuantity}
                            </ShoppingCart>
                               
                            )}
                </CartIcon>

                <MobileIcon onClick={toggle}>
                    <FaBars/>
                </MobileIcon>

                <NavMenu>
                    <NavItem>
                        <NavLink1 to="/" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Chi siamo</NavLink1>
                    </NavItem>
                    <NavItem>
                        <NavLink1 to="/store" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Negozio</NavLink1>
                    </NavItem>
                    <NavItem>
                        <NavLink1 to="/presenza" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Presenza</NavLink1>
                    </NavItem>
                    <NavItem>
                        <NavLink1 to="/community" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Comunità</NavLink1>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://site222301.tw.cs.unibo.it/game/" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Game</NavLink>
                    </NavItem>
                    
                </NavMenu>

                {
                    user ?
                    (
                        <>
                      
                        <NavBtn>

                        <Dropdown/>
                        
                        {cartQuantity > 0 && (
                            <ShoppingCart isOpen={isOpen}>
                                {cartQuantity}
                            </ShoppingCart>
                               
                            )}
                        </NavBtn>
                        </>
                        
                    )
                    :
                    (
                    <NavBtn>
                          
                        <NavBtnLink to="/login" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Log In</NavBtnLink> 
                       
                        {cartQuantity > 0 && (
                            <ShoppingCart isOpen={isOpen}>
                                {cartQuantity}
                            </ShoppingCart>
                               
                            )}
                        
                    </NavBtn>
                    )
                }
                    
                
                
                
                
            </NavbarContainer>
        </Nav>
        </IconContext.Provider>
    </div>
  )
}

export default Navbar


//<NavBtnLink  smooth={true} duration={500} spy={true} exact='true' offset={-80}><ShoppingCartIcon/></NavBtnLink> 