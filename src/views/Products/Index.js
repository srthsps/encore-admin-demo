import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchBarcodeList } from '../../store/barcode/barcodeListSlice'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/custom/paginationComponent'
// import AddBarcode from "./AddBarcode";
import QRCode from 'react-qr-code'
import NodataAnimation from '../../components/custom/NodataAnimation'
import { fetchProductList } from '../../store/Product/ProductListSlice'
import AddBarcode from '../Order/OrderDetails'
import AddProducts from './AddProducts'

const ProductList = () => {
  const dispatch = useDispatch()
  const [addProduct, setAddProduct] = useState(false)
  const [limit, setLimit] = useState(15)
  const [currentPage, setCurrentPage] = useState(0)
  const { active_tab } = useParams()


  useEffect(() => {
    dispatch(fetchProductList({ limit, offset: currentPage }))
    // dispatch(fetchBarcodeList({ limit, offset: currentPage }));
  }, [])

  const { ProductsList, ProductCount } = useSelector((state) => state.ProductListSlice)
  const { addProductFetching, addProductSuccess } = useSelector(
    (state) => state.productAddSlice
  );

  useEffect(() => {
    dispatch(fetchProductList({ limit, offset: currentPage }))
  }, [addProductFetching, addProductSuccess])




  // useEffect(() => {
  //   if (ProductsList.length > 0) {
  //     let barcodes = ProductsList.map((item, idx) => {
  //       return {
  //         ...item,
  //         sl: idx + 1,
  //       };
  //     });
  //     setData({ ...data, rows: barcodes });
  //   } else {
  //     setData({ ...data, rows: [] });
  //   }
  // }, [ProductsList]);

  return (
    <>
      <AddProducts toggle={addProduct} setToggle={setAddProduct} />

      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center col-12 my-2">
        {/* <h5 className="mb-4">Products List</h5> */}
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4 text-end mt-3 mt-md-0">
          <Button
            onClick={() => setAddProduct(true)}
            className=" col-12 col-md-4  hvr-sweep-to-bottom"
          >
            Add New
          </Button>
        </div>
      </div>

      <div>
        <Row className="mt-5">
          {ProductsList?.map((item, idx) => (
            <Col key={idx} md={3} sm={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Card style={{ width: '18rem' }} className="shadow-sm">
                <Card.Img variant="top" height={160} src={item.image} />
                <Card.Body>
                  <Card.Title>Brand:<span style={{ color: "#969696" }} >{item.brand_name}</span></Card.Title>
                  <Card.Title>category:<span style={{ color: "#969696" }} >{item.category_name}</span></Card.Title>
                  <Card.Title>Product Code:<span style={{ color: "#969696" }} >{item.product_code}</span></Card.Title>
                  <Card.Title>Price <span style={{ color: "#969696" }} >₹{item.price_without_VAT}</span></Card.Title>
                  <Card.Text>
                    <span className='text-black' >Description :</span >{item.description}
                  </Card.Text>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {ProductsList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <NodataAnimation />
        </div>
      )}
      <Row className="ms-5">
        <Col>
          <div className="mt-5 me-5 d-flex justify-content-end">
            <PaginationComponent
              itemsCount={ProductCount}
              itemsPerPage={limit}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ProductList
