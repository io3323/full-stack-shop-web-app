import React, { useState, useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'
import { observer } from 'mobx-react-lite'

import { fetchBrands, fetchTypes } from '../http/deviceApi'
import { Context } from '../index'

const Admin = observer(() => {
  const { device } = useContext(Context)
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)
  const deviceAddAction = () => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    setDeviceVisible(true)
  }
  return (
        <Container className={'d-flex flex-column'}>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setTypeVisible(true)}>Добавить тип</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setBrandVisible(true) }>Добавить бренд</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => deviceAddAction()}>Добвить устройство</Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
  )
})

export default Admin
