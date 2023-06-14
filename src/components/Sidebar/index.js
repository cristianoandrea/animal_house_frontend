import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import Dropdown from '../Dropdown'
import{
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SidebarLink1,
} from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  const handleLogout = () => {
    logout()
  }
  return (
    <SidebarContainer isOpen={isOpen} onClick={ toggle }>
      <Icon onClick={ toggle }>
          <CloseIcon/>
      </Icon>

      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink1 to="/" onClick={ toggle }>About</SidebarLink1>
          <SidebarLink1 to="/store" onClick={ toggle }>Store</SidebarLink1>
          <SidebarLink1 to="/presenza" onClick={ toggle }>Presenza</SidebarLink1>
          <SidebarLink1 to="/community" onClick={ toggle }>Community</SidebarLink1>
          <SidebarLink href="https://site222301.tw.cs.unibo.it/game/" onClick={ toggle }>Game</SidebarLink>
          {
            user?
            <>
              <SidebarLink1 to="/userprofile" onClick={ toggle }>Area Personale</SidebarLink1>
              <SidebarLink1 to="/" onClick={handleLogout }>Logout</SidebarLink1>
            </>

            :
            <>
              <SidebarLink1 to="/login" onClick={ toggle }>Login</SidebarLink1>
            </>
            
          }
        </SidebarMenu>
      </SidebarWrapper>
      


    </SidebarContainer>
  )
}

export default Sidebar
//scommessa persa