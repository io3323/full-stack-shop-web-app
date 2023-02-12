import React, { useContext } from 'react'

import { authRoutes, publicRotes } from '../routes'
import { Route, Switch } from 'react-router-dom'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
const AppRouter = observer(() => {
  const { user } = useContext(Context)
  console.log(user._isAuth, 'auth navigator')
  return (
        <Switch>
            {user._isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRotes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
        </Switch>
  )
})

export default AppRouter
