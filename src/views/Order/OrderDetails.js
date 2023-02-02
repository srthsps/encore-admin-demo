import React, { useEffect, useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { Card, Row, Col, Badge } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchorderDetails } from '../../store/order/OrderDetailsSlice'

const OrderDetails = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id, slId } = useParams()

    const [newProduct, setNewProduct] = useState([])
    const [filterPro, setFilterPro] = useState({})

    const { orderDetails } = useSelector((state) => state.orderDetailsSlice)
    useEffect(() => {
        if (id !== null && id !== undefined) {
            dispatch(fetchorderDetails({ orderID: id }))
        }
    }, [id])

    useEffect(() => {
        if (orderDetails?.products?.length > 0) {
            let data = orderDetails.products.map((item, idx) => {
                return {
                    ...item,
                    sl: idx + 1,
                }
            })
            setNewProduct(data)
        }
    }, [orderDetails])

    const FliterProduct = newProduct.filter((item) => item.sl == slId)

    return (
        <div>
            <div className="page-title-box">
                <Row className=" mb-1">
                    <Link
                        to={`/carts/${id}/orders`}
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
                        Back to Orders
                    </Link>
                    <h5 className="mb-4 ms-2">Order Details</h5>
                </Row>
                <Card
                    className="p-2"
                    style={{ border: '1px solid #b3c3f3', borderRadius: '6px' }}
                >
                    <Card.Body>
                        <div className="">
                            <Row className="d-flex flex-row ">
                                <Col className="col-4 ms-5 text-start">
                                    <Row className="mt-2">
                                        <div className="d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                User
                                            </p>
                                            <p className="col-6">{orderDetails?.Name}</p>
                                        </div>
                                    </Row>
                                    {/* <Row className="mt-2">
                                        <div className="d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: "600" }}
                                            >
                                                Staff Name
                                            </p>
                                            <p className="col-6">{orderDetails?.created_user}</p>
                                        </div>
                                    </Row> */}
                                    <Row className="mt-2">
                                        <div className="d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                Total Price
                                            </p>
                                            <p className="col-6">₹ {orderDetails?.total_price}</p>
                                        </div>
                                    </Row>
                                    <Row className="mt-2 ">
                                        <div className=" d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                Ordered Date
                                            </p>
                                            <p className="col-6">
                                                {orderDetails?.date_created?.slice(0, 10)}
                                            </p>
                                        </div>
                                    </Row>
                                    <Row className="mt-2 ">
                                        <div className=" d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                Order Status
                                            </p>
                                            <p className="col-6">
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
                                            </p>
                                        </div>
                                    </Row>
                                </Col>

                                <Col className="col-4">
                                    <Row className="mt-2 ">
                                        <div className=" d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                Email
                                            </p>
                                            <p className="col-6">{orderDetails?.Email}</p>
                                        </div>
                                    </Row>
                                    <Row className="mt-2 ">
                                        <div className=" d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                Mobile
                                            </p>
                                            <p className="col-6">{orderDetails?.Phone}</p>
                                        </div>
                                    </Row>
                                    <Row className="mt-2 ">
                                        <div className=" d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                Ordered Time
                                            </p>
                                            <p className="col-6">
                                                {orderDetails?.date_created?.slice(12, 20)}
                                            </p>
                                        </div>
                                    </Row>

                                    <Row className="mt-2">
                                        <div className=" d-flex  align-items-center">
                                            <p
                                                className="col-6 text-black"
                                                style={{ fontWeight: '600' }}
                                            >
                                                Address
                                            </p>
                                            <p className="col-6">{orderDetails?.street_address}</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
                <h5 className="mb-4 ms-2">Ordered Product</h5>
                <Card
                    className="p-2"
                    style={{ border: '1px solid #b3c3f3', borderRadius: '6px' }}
                >
                    <Card.Body>
                        <div className=" d-flex justify-content-start">
                            {FliterProduct?.map((productData) => {
                                return (
                                    <>
                                        <img
                                            src={productData?.image}
                                            alt=""
                                            className="img-fluid"
                                            style={{ width: '450px', borderRadius: '6px' }}
                                        />
                                        <div className="ms-5 mt-2">
                                            <h4 className="text-black">
                                                Brand Name :{' '}
                                                <span
                                                    className="text-primary"
                                                    style={{ fontSize: '19px' }}
                                                >
                                                    {productData?.brand}
                                                </span>
                                            </h4>
                                            <h4 className="text-black">
                                                Product Code :{' '}
                                                <span
                                                    className="text-primary"
                                                    style={{ fontSize: '19px' }}
                                                >
                                                    {productData?.product_code}
                                                </span>
                                            </h4>
                                            <h4 className="text-black">
                                                Quantity :{' '}
                                                <span
                                                    className="text-primary"
                                                    style={{ fontSize: '19px' }}
                                                >
                                                    {productData?.quantity}
                                                </span>
                                            </h4>
                                            <h4 className="text-black">
                                                Price per Item :{' '}
                                                <span
                                                    className="text-primary"
                                                    style={{ fontSize: '19px' }}
                                                >
                                                    ₹ {productData.price}

                                                </span>
                                            </h4>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
export default OrderDetails
