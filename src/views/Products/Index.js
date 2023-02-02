import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Image, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchBarcodeList } from '../../store/barcode/barcodeListSlice'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/custom/paginationComponent'
// import AddBarcode from "./AddBarcode";
import QRCode from 'react-qr-code'
import NodataAnimation from '../../components/custom/NodataAnimation'
import { fetchProductList } from '../../store/Product/ProductListSlice'
import AddProducts from './AddProducts'
import { Link, useHistory } from 'react-router-dom'
import {
  clearproductDeleteState,
  deleteproduct,
} from '../../store/Product/ProductDeleteSlice'
import { Icons } from 'react-toastify'
import EditProduct from './EditProduct'
import { deleteSvg, editSvg, viewSvg } from '../../components/custom/buttonSvg'
import Swal from 'sweetalert2'

const ProductList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [addProduct, setAddProduct] = useState(false)
  const [editProduct, setEditProduct] = useState(false)
  const [limit, setLimit] = useState(15)
  const [currentPage, setCurrentPage] = useState(0)
  const { active_tab } = useParams()
  const [productId, setProductId] = useState()


  const handleView = (e, id) => {
    history.push(`/products/${id}/details`)
  }

  const { editProductSuccess,editProductFetching, editProductError } =
  useSelector((state) => state.EditProductSlice);

  useEffect(() => {
    dispatch(fetchProductList({ limit, offset: currentPage }))
  }, [])

  const { ProductsList, ProductCount } = useSelector(
    (state) => state.ProductListSlice,
  )
  const { productDeleteSuccess } = useSelector(
    (state) => state.productDeleteSlice,
  )
  const { addProductFetching, addProductSuccess } = useSelector(
    (state) => state.productAddSlice,
  )

  useEffect(() => {
    dispatch(fetchProductList({ limit, offset: currentPage }))
  }, [
    addProductFetching,
    addProductSuccess,
    editProductFetching,
    editProductSuccess,
    productDeleteSuccess,
    limit,
    currentPage,
  ])

  const handleEdit = (e,id) => {
    e.preventDefault();
    setProductId(id)
    setEditProduct(true)
  }

  const handleDelete = (e,id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      backdrop: `rgba(60,60,60,0.8)`,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
        dispatch(deleteproduct({ productID: id }))
        dispatch(clearproductDeleteState())
        history.push("/product");
      }
    });
  };

  const [userData, setUserData] = useState({
    columns: ['Brand Name', 'Image', 'Product Code', 'Category', 'Actions'],
    rows: [],
  })

  useEffect(() => {
    if (ProductsList.length > 0) {
      let data = ProductsList.map((item, idx) => {
        return {
          ...item,
          sl: idx + 1,
          role: <span className="ps-4">{item.role}</span>,
          actionadd: editSvg,
        }
      })
      setUserData({ ...userData, rows: data })
    } else {
      setUserData({ ...userData, rows: [] })
    }
  }, [ProductsList])


  return (
    <>
      <AddProducts toggle={addProduct} setToggle={setAddProduct} />
      <EditProduct
        toggle={editProduct}
        setToggle={setEditProduct}
        productId={productId}
      />

      <h5 className="mb-0">Products</h5>
      <div className="mt-5">
        <Card>
          <Card.Body>
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center col-12 my-3">
              <div className="col-12 col-md-4">
                {/* <div className="input-group col-md-4" style={{ border: 'none' }}>
              <span
                className="input-group-append py-2"
                style={{ border: 'none' }}
              >
                <div className="btn btn-sm ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </span> */}
                {/* <input
                className="form-control py-2"
                type="search"
                style={{
                  border: 'none',
                  color: 'black',
                  backgroundColor: '#eff8fb',
                }}
                placeholder="Search by  name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              /> */}
                {/* </div> */}
              </div>
              <div className="col-6 col-md-4 text-end mt-3 mt-md-0">
                <Button
                  onClick={() => setAddProduct(true)}
                  className="me-4 col-12 col-md-4  hvr-sweep-to-bottom"
                >
                  Add New
                </Button>
              </div>
            </div>

            <Card.Body>
              <div className="custom-table-effect table-responsive">
                <Table>
                  <thead>
                    <tr
                      className="rounded"
                      style={{
                        backgroundColor: '#eff8fb',
                        borderRadius: '15px',
                      }}
                    >
                      {userData?.columns?.map((item, idx) => {
                        return (
                          <th className="text-black" id={idx}>
                            {item}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody className="">
                    {userData?.rows?.map((item, idx) => {
                      return (
                        <tr className="py-4" id={idx + 1}>
                          <td className="text-black">{item?.brand_name}</td>
                          <td className="text-black">
                            <img
                              src={item?.image}
                              height="50px"
                              width="50px"
                              alt="image"
                            />
                          </td>
                          <td className="text-black">{item?.product_code}</td>
                          <td className="text-black">{item?.category_name}</td>
                          <td>
                            <Button
                              className="btn btn-primary btn-icon btn-sm rounded-pill ms-1"
                              style={{ background: '#eff8fb' }}
                              onClick={(e) => {
                                handleView(e, item.id)
                                // setSelectedID(item.id);
                                // setToggleEditUser(true);
                              }}
                              role="button"
                            >
                              <span className="btn-inner text-primary">
                                {viewSvg}
                              </span>
                            </Button>

                            <Button
                              className="btn btn-primary btn-icon btn-sm rounded-pill ms-1"
                              style={{ background: '#eff8fb' }}
                              onClick={(e) => handleEdit(e,item.id)}
                              role="button"
                            >
                              <span className="btn-inner text-primary">
                                {item.actionadd}
                              </span>
                            </Button>
                            <Button
                              className="btn btn-icon btn-sm rounded-pill ms-1"
                              style={{ background: '#eff8fb' }}
                              onClick={(e) => handleDelete(e,item.id)}
                              role="button"
                            >
                              <span className="btn-inner text-danger">
                                {deleteSvg}
                              </span>
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                {userData?.rows?.length === 0 && (
                  <div className="d-flex justify-content-center">
                    <NodataAnimation />
                  </div>
                )}
                <div className="mt-5 me-5 float-end">
                  <PaginationComponent
                    itemsCount={ProductCount}
                    itemsPerPage={limit}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </Card.Body>
          </Card.Body>
        </Card>
      </div>

      

      {/* old */}

      {/* <div className="d-flex flex-md-row flex-column justify-content-between align-items-center col-12 my-2"> */}
      {/* <h5 className="mb-4">Products List</h5> */}
      {/* <div className="col-12 col-md-4"></div> */}
      {/* <div className="col-12 col-md-4 text-end mt-3 mt-md-0">
          <Button
            onClick={() => setAddProduct(true)}
            className=" col-12 col-md-4  hvr-sweep-to-bottom"
          >
            Add New
          </Button>
        </div> */}
      {/* </div> */}

      {/* <div>
        <Row className="mt-5">
          {ProductsList?.map((item, idx) => (
            <Col
              key={idx}
              md={3}
              sm={4}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card style={{ width: '18rem' }} className="shadow-sm">
                <Card.Img variant="top" height={130} src={item.image} />
                <Card.Body className="text-center">
                  <Card.Title>
                    Brand:
                    <span style={{ color: '#969696' }}>{item.brand_name}</span>
                  </Card.Title>
                  <Card.Title>
                    category:
                    <span style={{ color: '#969696' }}>
                      {item.category_name}
                    </span>
                  </Card.Title>
                  <Card.Title>
                    Product Code:
                    <span style={{ color: '#969696' }}>
                      {item.product_code}
                    </span>
                  </Card.Title>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger"
                    style={{
                      paddingLeft: '8px',
                      paddingRight: '8px',
                      paddingTop: '2px',
                      paddingBottom: '2px',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      style={{ cursor: 'pointer' }}
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="  ms-5 btn btn-warning"
                    style={{
                      paddingLeft: '8px',
                      paddingRight: '8px',
                      paddingTop: '2px',
                      paddingBottom: '2px',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div> */}
      {/* {ProductsList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <NodataAnimation />
        </div>
      )} */}
      {/* <Row className="ms-5">
        <Col>
          <div className="mt-5 me-5 d-flex justify-content-end">
            <PaginationComponent
              itemsCount={ProductCount}
              itemsPerPage={limit}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Col>
      </Row> */}
    </>
  )
}

export default ProductList
