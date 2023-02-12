import { Button, Col, Dropdown, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../index'

import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi'
import { observer } from 'mobx-react-lite'
// eslint-disable-next-line react/prop-types
const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [info, setInfo] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  console.log(file)
  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
  }
  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('typeId', device.selectedType.id)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }
  return (
        <Modal
            size={'lg'}
            centered
            show={show}
            onHide={onHide}
        >
            <ModalHeader closeButton>
                <ModalTitle id={'contained-modal-title-vcenter'}>
                    Добавить тип
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Введите название устройства'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Введите название устройства'}
                        type={'number'}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Введите название устройства'}
                        type={'file'}
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={'outline-dark'}
                        onClick={addInfo}
                    >Добавить новое свойство</Button>
                    {
                        info.map(i =>
                            <Row className={'mt-4'} key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        placeholder={'Введите название свойства'}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        placeholder={'Введите описание свойства'}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        onClick={() => removeInfo(i.number)}
                                        variant={'outline-danger'}
                                    >Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Добавить</Button>
            </ModalFooter>
        </Modal>
  )
})

export default CreateDevice
