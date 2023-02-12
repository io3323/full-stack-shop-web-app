import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import starIcon from '../../src/assets/star.png'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
// eslint-disable-next-line react/prop-types
const DeviceItem = ({ device }) => {
  const history = useHistory()
  return (

        <Col md={3} className={'mt-3'} onClick={() => {
          // eslint-disable-next-line react/prop-types
          history.push(DEVICE_ROUTE + '/' + device.id)
        }}>
            <Card style={{ width: 150, cursor: 'pointer' }} border={'light '}>
                {/* eslint-disable-next-line react/prop-types */}
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                    <div>Samsung......</div>
                    <div className="d-flex align-items-center">
                        {/* eslint-disable-next-line react/prop-types */}
                        <div>{device.rating}</div>
                        <Image src={starIcon} width={20} height={20} />
                    </div>
                </div>
                {/* eslint-disable-next-line react/prop-types */}
                <div>{device.name}</div>
            </Card>
        </Col>
  )
}

export default DeviceItem
