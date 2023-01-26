import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Badge, Container } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/custom/paginationComponent'
import NodataAnimation from '../../components/custom/NodataAnimation'
import { fetchOrderList } from '../../store/order/OrderListSlice'
import OrderDetails from './OrderDetails'
import { clearorderDeleteState, deleteorder } from '../../store/order/OrderDeleteSlice'


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
  const { orderDeleteSuccess } = useSelector((state) => state.orderDeleteSlice)


  useEffect(() => {
    dispatch(fetchOrderList())
  }, [orderShippedSuccess, orderDeleteSuccess, orderShippedFetching, orderCancelledSuccess, orderCancelledFetching, orderDeliveredSuccess, orderDeliveredFetching, orderProcessSuccess, orderProcessFetching])


  const handleDelete = (id) => {
    dispatch(deleteorder({ orderID: id }))
    dispatch(clearorderDeleteState())
  }


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

                style={{ width: '18rem' }}
                className="shadow-sm text-center"
              >
                <Card.Body onClick={() => handleView(item.id)}>
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
                </Card.Body>
                <Col className='pb-5' >
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

                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger ms-3" style={{paddingLeft:"8px", paddingRight:"8px", paddingTop:"2px", paddingBottom:"2px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>

                  </button>

                </Col>
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
