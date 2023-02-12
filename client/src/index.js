import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import UserStorage from './store/UserStorage'
import DeviceStore from './store/DeviceStore'
export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
      user: new UserStorage(),
      device: new DeviceStore()
    }}>
        <App />
    </Context.Provider>

)
