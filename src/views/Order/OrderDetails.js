import React, { memo, useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col, Card, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// import {
//   addBarcode,
//   clearAddBarcodeState,
// } from "../../store/barcode/barcodeAddSlice";
import Select from 'react-select'
import { fetchorderDetails } from '../../store/order/OrderDetailsSlice'
import { fetchorderProcess } from '../../store/order/OrderProcessSlice'
import { fetchorderShipped } from '../../store/order/OrderShippedSlice'

const OrderDetails = memo(({ toggle, setToggle, orderID }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchorderDetails({ orderID }))
  }, [toggle])

  const { orderDetails, orderDetailspro, orderDetailsStatus } = useSelector(
    (state) => state.orderDetailsSlice,
  )

  const handleProcess = (id) =>{
    dispatch(fetchorderProcess({orderID : id}))
  }
  const handleShipped = (id) =>{
    dispatch(fetchorderShipped({orderID : id}))
  }
  const handleDelivered = (id) =>{
    dispatch(fetchorderProcess({orderID : id}))
  }
  const handleCancelled = (id) =>{
    dispatch(fetchorderProcess({orderID : id}))
  }

  console.log('feca', orderDetailspro)

  return (
    <div className="modal" id="modal">
      <Modal centered show={toggle} onHide={() => setToggle(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 px-4">
          <Row>
            <Col>
              Change Order Status
              <Badge style={{cursor:"pointer"}} onClick={()=>handleProcess(orderDetails.id)} className=' pt-2 pb-2 ps-2 pe-2' bg="primary ms-3 ">Processing</Badge>
              <Badge style={{cursor:"pointer"}} onClick={()=>handleShipped(orderDetails.id)} className='pt-2 pb-2 ps-2 pe-2' bg="warning ms-3">Shipped</Badge>
              <Badge style={{cursor:"pointer"}} onClick={()=>handleDelivered(orderDetails.id)} className='pt-2 pb-2 ps-2 pe-2' bg="success ms-3 ">Delivered</Badge>
              <Badge style={{cursor:"pointer"}} onClick={()=>handleCancelled(orderDetails.id)} className='pt-2 pb-2 ps-2 pe-2' bg="danger ms-3 ">Cancelled</Badge>
            </Col>
          </Row>
          <hr />
          <Row className="bg-">
            <Col>Customer</Col>
            <Col>Products</Col>

            <hr />
          </Row>
          {/* customer */}
          <Row>
            <Col>
              <Card.Title>
                Name :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.Name}</span>
              </Card.Title>
              <Card.Title>
                Phone :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.Phone}</span>
              </Card.Title>
              <Card.Title>
                Email :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.Email}</span>
              </Card.Title>
              <Card.Title>
                Street address :{' '}
                <span style={{ color: 'gray' }}>
                  {orderDetails.street_address}
                </span>
              </Card.Title>
              <Card.Title>
                Country :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.country}</span>
              </Card.Title>
              <Card.Title>
                City :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.city}</span>
              </Card.Title>
              <Card.Title>
                State :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.state}</span>
              </Card.Title>
              <Card.Title>
                District :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.district}</span>
              </Card.Title>
              <Card.Title>
                Zipcode :{' '}
                <span style={{ color: 'gray' }}>{orderDetails.zipcode}</span>
              </Card.Title>
            </Col>

            {/* Products */}
            <Col>
              {orderDetailspro.map((item, index) => {
                return (
                  <>
                    <Card.Title>
                      Brand :{' '}
                      <span style={{ color: 'gray' }}>{item.brand}</span>
                    </Card.Title>
                    <Card.Title>
                      Product code :{' '}
                      <span style={{ color: 'gray' }}>{item.product_code}</span>
                    </Card.Title>
                    <Card.Title>
                      Quantity :{' '}
                      <span style={{ color: 'gray' }}>{item.quantity}</span>
                    </Card.Title>
                    <Card.Title>
                      Total price :{' '}
                      <span style={{ color: 'gray' }}>
                        ₹{orderDetails.total_price}
                      </span>
                    </Card.Title>
                    <hr />
                  </>
                )
              })}
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setToggle(false)}
              className="btn btn-md me-3"
              style={{ backgroundColor: 'white', color: 'black' }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              // onClick={saveChanges}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
})

export default memo(OrderDetails)