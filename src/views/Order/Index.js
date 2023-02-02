import React, { memo, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/custom/paginationComponent'
import { useHistory } from 'react-router-dom'
// import { fetchAllCartList } from "../../store/orders/allCartListSlice";
import NodataAnimation from '../../components/custom/NodataAnimation'

import { fetchOrderList } from '../../store/order/OrderListSlice'
import { deleteSvg, viewSvg } from '../../components/custom/buttonSvg'
import {
  clearorderDeleteState,
  deleteorder,
} from '../../store/order/OrderDeleteSlice'
import Swal from 'sweetalert2'

const Orders = memo(() => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [limit, setLimit] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)
  const { orderDeleteSuccess } = useSelector((state) => state.orderDeleteSlice)
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      backdrop: `rgba(60,60,60,0.8)`,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success')
        dispatch(deleteorder({ orderID: id }))
        dispatch(fetchOrderList({}))
        dispatch(clearorderDeleteState())
      }
    })
  }

  const { orderList, orderCount } = useSelector((state) => state.orderListSlice)

  useEffect(() => {
    dispatch(fetchOrderList({ limit, offset: currentPage }))
  }, [])

  const [orderData, setOrderData] = useState({
    columns: [
      'SL No',
      'Ordered By',
      'Order Date',
      'Total price',
      'Order status',
      'Action',
    ],
    rows: [],
  })

  useEffect(() => {
    if (orderList.length > 0) {
      let data = orderList.map((item, idx) => {
        return {
          ...item,
          sl: idx + 1,
        }
      })
      setOrderData({ ...orderData, rows: data })
    } else {
      setOrderData({ ...orderData, rows: [] })
    }
  }, [orderList])

  return (
    <div>
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center my-3">
        <h5 className="">Order List</h5>
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
                      <td className="py-4 text-black">
                        {currentPage + idx + 1}
                      </td>
                      <td className="py-4 text-black">{item.Name}</td>
                      <td className="py-4 text-black">
                        {item.date_created?.slice(0, 10)}
                      </td>
                      <td className="py-4 text-black">₹ {item.total_price}</td>
                      <td className="py-4">
                        {item.status === 0 ? (
                          <Badge bg="warning" style={{ width: '6rem' }}>
                            Pending
                          </Badge>
                        ) : item.status === 1 ? (
                          <Badge bg="primary" style={{ width: '6rem' }}>
                            Processing
                          </Badge>
                        ) : item.status === 2 ? (
                          <Badge bg="dark" style={{ width: '6rem' }}>
                            Shipped
                          </Badge>
                        ) : item.status === 3 ? (
                          <Badge bg="success" style={{ width: '6rem' }}>
                            Delivered
                          </Badge>
                        ) : item.status === 4 ? (
                          <Badge bg="danger" style={{ width: '6rem' }}>
                            {' '}
                            Cancelled{' '}
                          </Badge>
                        ) : null}
                      </td>

                      <td>
                        <div className="">
                          <Button
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-1"
                            style={{ background: '#eff8fb' }}
                            onClick={() =>
                              history.push(`/carts/${item.id}/orders`)
                            }
                            role="button"
                          >
                            <span className="btn-inner text-primary">
                              {viewSvg}
                            </span>
                          </Button>
                          <Button
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-1"
                            style={{ background: '#eff8fb' }}
                            onClick={() => handleDelete(item.id)}
                            role="button"
                          >
                            <span className="btn-inner text-danger">
                              {deleteSvg}
                            </span>
                          </Button>
                        </div>
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
                itemsCount={orderCount}
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
