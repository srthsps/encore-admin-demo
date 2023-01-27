import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearCategoryAddState, fetchCategoryAdd } from '../../../store/Product/Categories/AddCategorySlice';
import { fetchCategoryList } from '../../../store/Product/Categories/CategoriesListSlice';
import { fetchcategoryDetailsList } from '../../../store/Product/Categories/CategoryDetailsSlice';
import { clearCategoryState, editCategory } from '../../../store/Product/Categories/EditCategorySlice';

const EditCategory = (props) => {

    const { categoryDetailsList, categoryDetailsSuccess, categoryDetailsError, categoryDetailsFetching, categoryDetailsErrorMessage } = useSelector((state) => state.categoryDetailsListSlice)
    const dispatch = useDispatch()
    // const [catData, setCatData] = useState(categoryDetailsList.category_name)

    const [category_name, setCategoryName] = useState("")

    useEffect(() => {

        dispatch(fetchcategoryDetailsList({ DetailsID: props.id }))
        setCategoryName(categoryDetailsList?.category_name)



    }, [props.id])


    console.log(categoryDetailsList);
    const handleEdit = () => {

        dispatch(clearCategoryState())
        setCatData("")

    }

    const { CategoryAddSuccess, CategoryAddFetching, CategoryAddError, CategoryAddErrorMessage, } = useSelector((state) => state.CategoryAddSlice)

    useEffect(() => {
        if (props?.toggle) {


        }
    }, [props?.toggle]);

    useEffect(() => {
        dispatch(fetchCategoryList())
    }, [categoryDetailsSuccess, categoryDetailsFetching])


    const handleSave = () => {
        let data = {
            category_name
        };

        let error = undefined;

        if (data.category_name === "") {
            error = "Please enter category name";
        }
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                type: "error",
                theme: "light",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {


            dispatch(editCategory({ payload: category_name, categoryID: props.id }))
        }
    };
    useEffect(() => {
        if (categoryDetailsSuccess) {
            toast.success("Updated successfully", {
                toastId: "EditCategory",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                type: "success",
                theme: "light",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(clearCategoryAddState());
            props?.setToggle(false);
        } else if (categoryDetailsError) {
            if (categoryDetailsErrorMessage.includes("Email already exists")) {
                toast.error("Email already exists", {
                    toastId: "EditCategory",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    type: "error",
                    theme: "light",
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error({
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    type: "error",
                    theme: "light",
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            dispatch(clearCategoryState());
        }
    }, [categoryDetailsSuccess, categoryDetailsError]);

    return (
        <div className="modal" id="modal">
            <Modal show={props.toggle} onHide={props.setToggle} size="md">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-3 px-4">
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Row className="mt-3">
                            <Col>
                                <Form.Label className="text-black">Category Name<span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    style={{ border: "1px solid #b3c3f3" }}
                                    className="form-control-md"
                                    type="text"
                                    value={category_name}
                                    onChange={(e) => {
                                        setCategoryName(e.target.value);
                                    }}
                                ></Form.Control>

                            </Col>
                        </Row>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => props.setToggle(false)}
                            className="btn btn-md me-3"
                            style={{ backgroundColor: "white", color: "black" }}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditCategory