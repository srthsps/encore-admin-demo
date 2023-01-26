import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Badge, Container } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/custom/paginationComponent'
import NodataAnimation from '../../components/custom/NodataAnimation'
import { fetchOrderList } from '../../store/order/OrderListSlice'
import OrderDetails from './OrderDetails'


const OrderList = () => {
  const dispatch = useDispatch()
  const [limit, setLimit] = useState(24)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [OrderDetailToggle, setOrderDetailsToggle] = useState(false)
  const [orderId, setOrderID] = useState()
  const handleView = (id) => {
    setOrderDetailsToggle(true)
    setOrderID(id)
  }


  const { orderList } = useSelector((state) => state.orderListSlice)
  const { orderShippedSuccess, orderShippedFetching, orderShippedErrorMessage, orderShippedError } = useSelector((state) => state.orderShippedSlice)
  const { orderCancelledSuccess, orderCancelledError, orderCancelledFetching, orderCancelledErrorMessage } = useSelector((state) => state.orderCancelledSlice)
  const { orderDeliveredSuccess, orderDeliveredErrorMessage, orderDeliveredError, orderDeliveredFetching } = useSelector((state) => state.orderDeliveredSlice)
  const { orderProcessSuccess, orderProcessFetching, orderProcessErrorMessage, orderProcessError } = useSelector((state) => state.orderProcessSlice)


  useEffect(() => {
    dispatch(fetchOrderList())
  }, [orderShippedSuccess, orderShippedFetching, orderCancelledSuccess, orderCancelledFetching, orderDeliveredSuccess, orderDeliveredFetching, orderProcessSuccess, orderProcessFetching])



  // const setAddToggle = useCallback(() => {
  //   setAddBarcode((v) => !v)
  // }, [])

  const marginTop = '40px'
  const marginRight = '15px'
  const marginBottom = '30px'
  const marginLeft = '15px'

  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`
  }

  return (
    <>
      <OrderDetails toggle={OrderDetailToggle} setToggle={setOrderDetailsToggle} orderID={orderId} />
      <div>
        <Row className="mt-5" >
          {orderList?.map((item, idx) => (
            <Col key={idx} md={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Card
                onClick={() => handleView(item.id)}
                style={{ width: '18rem' }}
                className="shadow-sm text-center"
              >
                <Card.Body>
                  <Card.Title>
                    {' '}
                    Customer :{' '}
                    <span style={{ color: '#969696' }}>{item.Name}</span>
                  </Card.Title>
                  <Card.Title>
                    {' '}
                    Category :{' '}
                    <span style={{ color: '#969696' }}>{item.total_price}</span>
                  </Card.Title>
                  <Card.Title>
                    {' '}
                    State :{' '}
                    <span style={{ color: '#969696' }}>{item.state}</span>
                  </Card.Title>
                  <Card.Title>
                    {' '}
                    Total Price :{' '}
                    <span style={{ color: '#969696' }}>{item.total_price}</span>
                  </Card.Title>
                  {item.status === 0 ? (
                    <Badge bg="warning">Pending</Badge>
                  ) : item.status === 1 ? (
                    <Badge bg="primary">Processing</Badge>
                  ) : item.status === 2 ? (
                    <Badge bg="dark">Shipped</Badge>
                  ) : item.status === 3 ? (
                    <Badge bg="success">Delivered</Badge>
                  ) : item.status === 4 ? (
                    <Badge bg="danger"> Cancelled </Badge>
                  ) : null
                  }
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {orderList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <NodataAnimation />
        </div>
      )}
      <Row className="ms-5">
        <Col>
          <div className="mt-5 me-5 d-flex justify-content-end">
            {/* <PaginationComponent
            itemsCount={barcodeCount}
            itemsPerPage={limit}
            setCurrentPage={setCurrentPage}
            /> */}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default OrderList
