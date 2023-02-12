import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import React, { useState } from 'react'
import { createType } from '../../http/deviceApi'
// eslint-disable-next-line react/prop-types
const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('')
  const addType = () => {
    createType({ name: value }).then(data => {
      setValue('')
      onHide()
    })
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
                   <Form.Control placeholder={'Введите название типа'} value={value} onChange={(e) => setValue(e.target.value)}/>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={addType}>Добавить</Button>
            </ModalFooter>
        </Modal>
  )
}

export default CreateType
