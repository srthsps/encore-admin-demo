import React, { useRef, memo, useState, useEffect, useCallback } from 'react'
import { Button, Card, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import NodataAnimation from '../../../components/custom/NodataAnimation'
import PaginationComponent from '../../../components/custom/paginationComponent'
import { fetchCategoryList } from '../../../store/Product/Categories/CategoriesListSlice'
import {
  clearcategoryDeleteState,
  deletecategory,
} from '../../../store/Product/Categories/CategoryDeleteSlice'
import AddProducts from '../AddProducts'
import AddCategory from './AddCategory'

const Category = () => {
  const [limit, setLimit] = useState(36)
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useDispatch()

  const { CategoryList, CategoryCount, categorySuccess } = useSelector(
    (state) => state.CategoryListSlice,
  )
  console.log('dc', CategoryList)
  const { categoryDeleteSuccess, categoryDeleteFetching } = useSelector(
    (state) => state.categoryDeleteSlice,
  )

  const handleDelete = (id) => {
    dispatch(deletecategory({ categoryID: id }))
    dispatch(clearcategoryDeleteState())
  }

  useEffect(() => {
    dispatch(fetchCategoryList({ limit, offset: currentPage }))
  }, [categorySuccess, categoryDeleteSuccess])

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
                  <svg
                    onClick={() => handleDelete(item.id)}
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
