import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button, Modal } from 'react-bootstrap'

import { toast } from 'react-toastify'
import { fetchBrandList } from '../../../store/Product/Brand/BrandListSlice'
import { fetchCategoryList } from '../../../store/Product/Categories/CategoriesListSlice'
import {
    clearbrandAddState,
    fetchbrandAdd,
} from '../../../store/Product/Brand/AddBrandSlice'
import { fetchBrandDetails } from '../../../store/Product/Brand/BrandDetails'
import { fetchbrandEdit } from '../../../store/Product/Brand/EditBrandSlice'

const EditBrand = (props) => {

    const [brand_name, setBrandName] = useState('')
    const [is_popular, setIspopular] = useState(null)
    const [logo, setSelectedImage] = useState(null)
    const { BrandId } = props
    const dispatch = useDispatch()
    const { BrandDetails } = useSelector((state) => state.BrandDetailsSlice)
    console.log(BrandDetails);

    useEffect(() => {
        dispatch(fetchBrandDetails({ BrandID: props.BrandId }))
        setBrandName(BrandDetails?.brand_name)
        setIspopular(BrandDetails?.is_popular)
    }, [BrandId])


    useEffect(() => {
        dispatch(fetchBrandList())
        dispatch(fetchCategoryList())
        // dispatch(fetchBarcodeList({ limit, offset: currentPage }));
    }, [])

    const {
        brandEditFetching,
        brandEditSuccess,
        brandEditError,
        brandEditErrorMessage,
    } = useSelector((state) => state.brandEditSlice)

    useEffect(() => {
        if (props?.toggle) {
            setBrandName(''), setIspopular(null), setSelectedImage(null)
        }
    }, [props?.toggle])

    const handleSave = () => {
        let data = {
            logo,
            is_popular,
            brand_name,
        }

        let error = undefined

        if (data.logo === '') {
            error = 'Please add image'
        } else if (data.brand_name === '') {
            error = 'Please enter brand name'
        } else if (data.is_popular === '') {
            error = 'Please select popularity'
        }
        if (error) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                type: 'error',
                theme: 'light',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            let payload = data

            dispatch(fetchbrandEdit({ payload, brandId : BrandId}))
        }
    }
    useEffect(() => {
        if (brandEditSuccess) {
            toast.success('Updated successfully', {
                toastId: 'addUser',
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                type: 'success',
                theme: 'light',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            dispatch(clearbrandAddState())
            props?.setToggle(false)
        } else if (brandEditError) {
            if (brandEditErrorMessage) {
                toast.error('Email already exists', {
                    toastId: 'addLawyer',
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    type: 'error',
                    theme: 'light',
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                toast.error({
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    type: 'error',
                    theme: 'light',
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            dispatch(clearbrandAddState())
        }
    }, [brandEditSuccess, brandEditError])

    return (
        <div className="modal" id="modal">
            <Modal size="lg" centered show={props.toggle} onHide={props.setToggle}>
                <Modal.Body className="mb--2">
                    <Row
                        className="justify-content-center align-items-center"
                        style={{ height: '34px' }}
                    >
                        <Col xl={12}>
                            <h5 className="ms-2 text-black">
                                <strong>Edit Brand</strong>
                            </h5>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Body className="px-4 mx-3 mb-3">
                    <Row>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">
                                Image<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <input
                                style={{ border: '1px solid #CCDBE1' }}
                                type="file"
                                className="form-control"
                                name="pic-2"
                                accept="image/*"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />
                        </Col>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">
                                Brand Name<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Control
                                style={{ border: '1px solid #b3c3f3' }}
                                className="form-control-md"
                                type="text"
                                value={brand_name}
                                onChange={(e) => {
                                    setBrandName(e.target.value)
                                }}
                            ></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">
                                Is popular<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Select onChange={(e) => setIspopular(e.target.value)}>
                                <option value="">Select --</option>
                                <option value={true}>Is popular</option>
                                <option value={false}>Is not popular</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-end align-items-center my-1 me-3 ">
                        <Button
                            onClick={() => props.setToggle(false)}
                            className="btn btn-md me-2"
                            style={{ backgroundColor: 'white', color: 'black' }}
                            outline
                        >
                            Cancel
                        </Button>
                        <Button
                            className="btn btn-md me-2 btn-primary text-white"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}
export default React.memo(EditBrand)
