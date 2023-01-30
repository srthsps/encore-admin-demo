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
import { clearorderProcessState, fetchorderProcess } from '../../store/order/OrderProcessSlice'
import { clearorderShippedState, fetchorderShipped } from '../../store/order/OrderShippedSlice'
import { clearorderDeliveredState, fetchorderDelivered } from '../../store/order/OrderDeliveredSlice'
import { clearorderCancelledState, fetchorderCancelled } from '../../store/order/OrderCancelledSlice'

const OrderDetails = memo(({ toggle, setToggle, orderID }) => {
  const { orderProcessSuccess, orderProcessErrorMessage, orderProcessError } = useSelector((state) => state.orderProcessSlice)
  const { orderShippedSuccess, orderShippedFetching, orderShippedErrorMessage, orderShippedError } = useSelector((state) => state.orderShippedSlice)
  const { orderCancelledSuccess, orderCancelledError, orderCancelledFetching, orderCancelledErrorMessage } = useSelector((state) => state.orderCancelledSlice)
  const { orderDeliveredSuccess, orderDeliveredErrorMessage, orderDeliveredError, orderDeliveredFetching } = useSelector((state) => state.orderDeliveredSlice)
  const dispatch = useDispatch()
  console.log(orderProcessErrorMessage);


  useEffect(() => {
    dispatch(fetchorderDetails({ orderID }))
  }, [toggle])

  const { orderDetails, orderDetailspro, orderDetailsStatus } = useSelector(
    (state) => state.orderDetailsSlice,
  )

  const handleProcess = (id) => {
    dispatch(fetchorderProcess({ orderID: id }))
    if (orderProcessSuccess) {
      toast.success("Status Changed to processing")
    }
    else if (orderProcessError) {
      toast.error(orderProcessErrorMessage)


    }
    dispatch(clearorderProcessState())
  }
  const handleShipped = (id) => {
    dispatch(fetchorderShipped({ orderID: id }))
    if (orderShippedSuccess) {
      toast.success("Status Changed to Shipped")
    }
    else if (orderShippedError) {
      toast.error(orderShippedErrorMessage)

    }
    dispatch(clearorderShippedState())
  }
  const handleDelivered = (id) => {
    dispatch(fetchorderDelivered({ orderID: id }))
    if (orderDeliveredSuccess) {
      toast.success("Status Changed to Delivered")
    }
    else if (orderDeliveredError) {
      toast.error(orderDeliveredErrorMessage)

    }
    dispatch(clearorderDeliveredState())
  }
  const handleCancelled = (id) => {
    dispatch(fetchorderCancelled({ orderID: id }))
    if (orderCancelledSuccess) {
      toast.success("Status Changed to Cancelled")
    }
    else if (orderCancelledError) {
      toast.error(orderCancelledErrorMessage)

    }
    dispatch(clearorderCancelledState())
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
              <Badge style={{ cursor: "pointer" }} onClick={() => handleProcess(orderDetails.id)} className=' pt-2 pb-2 ps-2 pe-2' bg="primary ms-3 ">Processing</Badge>
              <Badge style={{ cursor: "pointer" }} onClick={() => handleShipped(orderDetails.id)} className='pt-2 pb-2 ps-2 pe-2' bg="warning ms-3">Shipped</Badge>
              <Badge style={{ cursor: "pointer" }} onClick={() => handleDelivered(orderDetails.id)} className='pt-2 pb-2 ps-2 pe-2' bg="success ms-3 ">Delivered</Badge>
              <Badge style={{ cursor: "pointer" }} onClick={() => handleCancelled(orderDetails.id)} className='pt-2 pb-2 ps-2 pe-2' bg="danger ms-3 ">Cancelled</Badge>
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
        </Modal.Body>
      </Modal>
    </div>
  )
})

export default memo(OrderDetails)
