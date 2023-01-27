import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Image, Badge } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchBarcodeList } from '../../../store/barcode/barcodeListSlice'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../../components/custom/paginationComponent'

import NodataAnimation from '../../../components/custom/NodataAnimation'
import { fetchBrandList } from '../../../store/Product/Brand/BrandListSlice'
import AddBrand from './AddBrand'
import { clearBrandDeleteState, deleteBrand } from '../../../store/Product/Brand/BrandDeleteSlice'
import EditBrand from './EditBrand'

const BrandList = () => {
  const dispatch = useDispatch()
  const [addBarcode, setAddBarcode] = useState(false)
  const [editBrand, setEditBrand] = useState(false)
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const { active_tab } = useParams()
  const { BrandList, BrandListCount } = useSelector((state) => state.BrandListSlice)
  const { BrandDeleteSuccess } = useSelector((state) => state.BrandDeleteSlice)
  const { brandAddSuccess } = useSelector((state) => state.brandAddSlice)
  const [brandId,setBrandId] = useState()


  useEffect(() => {
    dispatch(fetchBrandList({ limit, offset: currentPage }))
    // dispatch(fetchBarcodeList({ limit, offset: currentPage }));
  }, [brandAddSuccess, BrandDeleteSuccess, limit, currentPage])

  const handleDelete = (id) => {
    dispatch(deleteBrand({ BrandID: id }))
    dispatch(clearBrandDeleteState())
  }


  const setAddToggle = useCallback(() => {
    setAddBarcode((v) => !v)
  }, [])

  const handleEdit = (id) => {
    setEditBrand(true)
    setBrandId(id)
  }



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
      <EditBrand toggle={editBrand} setToggle={setEditBrand} BrandId={brandId} />

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
            <Col md={3} sm={4} key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
              <Card style={{ width: '18rem' }} className="shadow-sm text-center">
                <Card.Img variant="top" height={150} src={item.logo} />
                <Card.Body>

                  <Card.Title style={{ color: "#969696" }}>Brand:{item.brand_name}</Card.Title>
                </Card.Body>
                <Col>
                  {
                    item?.is_popular ?
                      <Badge pill bg="success mb-3 me-5" style={{ width: "8rem" }}>Popular Brand</Badge> : null
                  }

                </Col>
                <Col className='pb-3' >
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger" style={{ paddingLeft: "8px", paddingRight: "8px", paddingTop: "2px", paddingBottom: "2px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>

                  </button>
                  <button onClick={() => handleEdit(item.id)} className=' ms-2 btn btn-warning' style={{ paddingLeft: "8px", paddingRight: "8px", paddingTop: "2px", paddingBottom: "2px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>

                  </button>
                </Col>

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
