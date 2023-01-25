import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Image, Badge } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchBarcodeList } from '../../../store/barcode/barcodeListSlice'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../../components/custom/paginationComponent'

import NodataAnimation from '../../../components/custom/NodataAnimation'
import { fetchBrandList } from '../../../store/Product/Brand/BrandListSlice'
import AddBrand from './AddBrand'

const BrandList = () => {
  const dispatch = useDispatch()
  const [addBarcode, setAddBarcode] = useState(false)
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const { active_tab } = useParams()
  useEffect(() => {
    dispatch(fetchBrandList({limit,offset: currentPage}))
    // dispatch(fetchBarcodeList({ limit, offset: currentPage }));
  }, [])

  const { BrandList,BrandListCount } = useSelector((state) => state.BrandListSlice)

  const setAddToggle = useCallback(() => {
    setAddBarcode((v) => !v)
  }, [])


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
      <AddBrand toggle={addBarcode} setToggle={setAddToggle} />

      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center col-12 my-2">
        {/* <h5 className="mb-4">Products List</h5> */}
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4 text-end mt-3 mt-md-0">
          <Button
            onClick={() => setAddBarcode(true)}
            className=" col-12 col-md-4  hvr-sweep-to-bottom"
          >
            Add New
          </Button>
        </div>
      </div>

      <div>
        <Row className="mt-5">
          {BrandList?.map((item, idx) => (
            <Col md={3}  sm={4} key={idx} style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
              <Card style={{ width: '18rem' }} className="shadow-sm text-center d-flex align-items-center justify-content-center">
                <Card.Img variant="top" height={150} src={item.logo} />
                <Card.Body>
                  <Card.Title style={{ color: "#969696" }}>Brand:{item.brand_name}</Card.Title>
                </Card.Body>
                {
                  item?.is_popular ? 
                  <Badge pill bg="success mb-3" style={{width:"8rem"}}>Popular Brand</Badge>: null
                }
              
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {BrandList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <NodataAnimation />
        </div>
      )}
      <Row className="ms-5">
        <Col>
          <div className="mt-5 me-5 d-flex justify-content-end">
            <PaginationComponent
            itemsCount={BrandListCount}
            itemsPerPage={limit}
            setCurrentPage={setCurrentPage}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default BrandList
