import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import NodataAnimation from '../../../components/custom/NodataAnimation'
import PaginationComponent from '../../../components/custom/paginationComponent'
import { fetchCategoryList } from '../../../store/Product/Categories/CategoriesListSlice'
import AddProducts from '../AddProducts'
import AddCategory from './AddCategory'

const Category = () => {
  const [limit, setLimit] = useState(36)
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useDispatch()

  const { CategoryList, CategoryCount, categoryFetching, categorySuccess } = useSelector(
    (state) => state.CategoryListSlice
  )
  useEffect(() => {
    dispatch(fetchCategoryList({ limit, offset: currentPage }))
  }, [categorySuccess])


  const [addBarcode, setAddBarcode] = useState(false)

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
      <AddCategory toggle={addBarcode} setToggle={setAddToggle} />

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
          {CategoryList?.map((item, idx) => (
            <Col
              key={idx}
              md={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card style={{ width: '18rem' }} className="shadow-sm">
                <Card.Body>
                  <Card.Title>
                    {' '}
                    Category :{' '}
                    <span style={{ color: '#969696' }}>
                      {item.category_name}
                    </span>
                  </Card.Title>
                  <Card.Title>
                    {' '}
                    Id : <span style={{ color: '#969696' }}>{item.id}</span>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {CategoryList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <NodataAnimation />
        </div>
      )}
      <Row className="ms-5">
        <Col>
          <div className="mt-5 me-5 d-flex justify-content-end">
            <PaginationComponent
              itemsCount={CategoryCount}
              itemsPerPage={limit}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Category
