import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userApi'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Auth = observer(() => {
  const history = useHistory()
  const { user } = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      if (data.role === 'ADMIN') {
        user.setIsAdmin(true)
      } else {
        user.setIsAdmin(false)
      }
      console.log(user._isAuth)
      user.setUser(data)
      user.setIsAuth(true)
      history.push(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
        <Container className={'d-flex justify-content-center align-items-center'}
        style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className={'p-5'}>
                <h2 className={'m-auto'}>{isLogin ? 'Аторизация' : 'Регистрация'}</h2>
                <Form className={'d-flex flex-column'} >
                    <Form.Control
                        className={'mt-3'}
                    placeholder={'Введите email'}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Введите пароль'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={'password'}
                    />
                     <Row className='mt-3 pl-3 pr-3'>
                        <Button variant={'outline-success'} onClick={click} >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                         {isLogin && <div className='mt-2'>
                             Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                         </div>}
                         {!isLogin && <div className='mt-2'>
                             Есть аккаунта? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                         </div>}
                     </Row>

                </Form>
            </Card>
        </Container>
  )
})

export default Auth
