import React, { useContext } from 'react'
import { Context } from '../index'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
  const history = useHistory()
  const { user } = useContext(Context)

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    history.push(LOGIN_ROUTE)
  }
  return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {user.isAuth
                  ? <Nav className="ml-auto" style={{ color: 'white' }}>
                        {user._isAdmin && <Button variant={'outline-light'} onClick={() => {
                          history.push(ADMIN_ROUTE)
                        }}>Админ панель</Button>}
                        <Button variant={'outline-light'} className={'ml-2'} onClick={() => {
                          logOut()
                        }}>Выйти</Button>
                    </Nav>
                  : <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={'outline-light'} onClick={() => {
                          history.push(LOGIN_ROUTE)
                        }}>Автоизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
  )
})

export default NavBar
