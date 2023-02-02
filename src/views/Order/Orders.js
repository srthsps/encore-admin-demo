import React, { memo, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Badge, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { editSvg, viewSvg, deleteSvg } from '../../components/custom/buttonSvg'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/custom/paginationComponent'
import { useHistory, useParams } from 'react-router-dom'

// import EditOrder from './EditOrder'
// import UpdateStatus from './UpdateStatus'
import NodataAnimation from '../../components/custom/NodataAnimation'
import * as XLSX from 'xlsx'
// import { saveAs } from 'file-saver'
import { fetchorderDetails } from '../../store/order/OrderDetailsSlice'
import ChangeOrderStatus from './ChangeOrderStatus'

const Orders = memo(() => {
  const [editOrder, setEditOrder] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const ID = useParams()
  const [status, setStatus] = useState('')
  const [limit, setLimit] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [statusUpdate, setStatusUpdate] = useState(false)

  const [selectedID, setSelectedID] = useState(null)

  // const { orderDetails, orderCount } = useSelector((state) => state.orderListSlice)

  const { orderDetails, orderDetailspro, orderDetailsStatus } = useSelector(
    (state) => state.orderDetailsSlice,
  )

  const { orderStatusUpdateSuccess } = useSelector(
    (state) => state.orderStatusUpdateSlice,
  )

  useEffect(() => {
    dispatch(fetchorderDetails({ orderID: ID.id }))
  }, [ID.id, orderStatusUpdateSuccess])

  const handleView = (item) => {
    history.push(
      `/carts/${orderDetails.id}/orders/${orderDetails.id}/details/${item}`,
    )
  }

  // useEffect(() => {
  //     dispatch(fetchOrderList({ limit, offset: currentPage, status, cartID }))
  // }, [statusUpdate, editOrder, limit, currentPage, status, cartID])

  const [orderData, setOrderData] = useState({
    columns: [
      'Product code',
      'User Name',
      'Order Date',
      'Order Time',
      // 'Price',
      'Order Status',
      'Quantity',
      'Action',
    ],
    rows: [],
  })

  useEffect(() => {
    if (orderDetails?.products?.length > 0) {
      let data = orderDetails.products.map((item, idx) => {
        return {
          ...item,
          sl: idx + 1,
          actionadd: viewSvg,
          actionedit: editSvg,
        }
      })
      setOrderData({ ...orderData, rows: data })
    } else {
      setOrderData({ ...orderData, rows: [] })
    }
  }, [orderDetails])

  return (
    <div>
      <ChangeOrderStatus
        toggle={editOrder}
        setToggle={setEditOrder}
        orderID={orderDetails.id}
      />
      {/* <EditOrder
                toggle={editOrder}
                setToggle={setEditOrder}
                orderID={selectedID}    
            /> */}
      {/* <UpdateStatus
                toggle={statusUpdate}
                setToggle={setStatusUpdate}
                orders={selectedOrders}
            /> */}
      <Link
        to={`/carts`}
        className=" text-primary d-inline-flex align-items-center mb-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
        Back to orders list
      </Link>

      <h5 className="ms-2">Orders</h5>
      <div className="d-flex flex-md-row justify-content-between flex-column align-items-center my-3">
        <div></div>

        <div className=" w-full">
          <Button
            className="me-3 bg-success"
            onClick={() => setEditOrder(true)}
          >
            Update Status
          </Button>
        </div>
      </div>
      <Card>
        <Card.Body>
          <div className="custom-table-effect table-responsive">
            <Table>
              <thead>
                <tr
                  className="rounded"
                  style={{ backgroundColor: '#eff8fb', borderRadius: '15px' }}
                >
                  <th className="py-4 text-black d-flex align-items-center">
                    {/* <Form.Check
                                            className="ms-2"
                                            type="checkbox"
                                            checked={selectedOrders?.length === orderDetails?.length}
                                            id="select-all"
                                            label=""
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    let data = orderData?.rows?.map((item) => {
                                                        return item.id
                                                    })
                                                    setSelectedOrders(data)
                                                } else {
                                                    setSelectedOrders([])
                                                }
                                            }}
                                        />{' '} */}
                    SL No.
                  </th>
                  {orderData?.columns?.map((item, idx) => {
                    return (
                      <th className="py-4 text-black" id={idx}>
                        {item}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="">
                {orderData?.rows?.map((item, idx) => {
                  return (
                    <tr className="py-4" id={idx + 1}>
                      <td className="py-4 ms-3 text-black d-flex align-items-center">
                        {/* <Form.Check
                                                    className="ms-2"
                                                    type="checkbox"
                                                    id={item.id}
                                                    label=""
                                                    checked={selectedOrders.includes(item.id)}
                                                    onChange={(e) => { selectedOrders(e.target.checked, orderDetails) }}
                                                /> */}
                        {currentPage + idx + 1}
                      </td>
                      <td className="py-4 text-black">
                        {item.product_code}
                        {/* <Link to={`/carts/${orderDetails.id}/orders/${orderDetails.id}/details`}>
                                                    {item.product_code}
                                                </Link> */}
                      </td>
                      <td className="py-4 text-black">{orderDetails.Name}</td>
                      <td className="py-4 text-black">
                        {orderDetails.date_created?.slice(0, 10)}
                      </td>
                      <td className="py-4 text-black">
                        {orderDetails.date_created?.slice(12, 20)}
                      </td>
                      {/* <td className="py-4 text-black">₹ {item.quantity}</td> */}
                      <td className="py-4 text-black">
                        {orderDetails.status === 0 ? (
                          <Badge bg="warning" style={{ width: '6rem' }}>
                            Pending
                          </Badge>
                        ) : orderDetails.status === 1 ? (
                          <Badge bg="primary" style={{ width: '6rem' }}>
                            Processing
                          </Badge>
                        ) : orderDetails.status === 2 ? (
                          <Badge bg="dark" style={{ width: '6rem' }}>
                            Shipped
                          </Badge>
                        ) : orderDetails.status === 3 ? (
                          <Badge bg="success" style={{ width: '6rem' }}>
                            Delivered
                          </Badge>
                        ) : orderDetails.status === 4 ? (
                          <Badge bg="danger" style={{ width: '6rem' }}>
                            {' '}
                            Cancelled{' '}
                          </Badge>
                        ) : null}
                      </td>

                      <td className="py-4 text-black">{item.quantity}</td>
                      <td>
                        <Button
                          className="btn btn-primary btn-icon btn-sm rounded-pill ms-1"
                          style={{ background: '#eff8fb' }}
                          onClick={() => handleView(item.sl)}
                          role="button"
                        >
                          <span className="btn-inner text-primary">
                            {viewSvg}
                          </span>
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            {orderData?.rows?.length === 0 && (
              <div className="d-flex justify-content-center">
                <NodataAnimation />
              </div>
            )}
            <div className="mt-5 me-5 float-end">
              <PaginationComponent
                // itemsCount={orderCount}
                itemsPerPage={limit}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
})

export default Orders
