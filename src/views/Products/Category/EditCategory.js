import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearCategoryAddState, fetchCategoryAdd } from '../../../store/Product/Categories/AddCategorySlice';
import { fetchCategoryList } from '../../../store/Product/Categories/CategoriesListSlice';
import { clearCategoryState, editCategory } from '../../../store/Product/Categories/EditCategorySlice';

const EditCategory = (props) => {

    const dispatch = useDispatch()


    const [category_name, setCategoryName] = useState(props.catData.category_name)
    console.log("asx", category_name);
    const handleEdit = () => {
        dispatch(editCategory({ payload: category_name, categoryID: props.id }))
        dispatch(clearCategoryState())
    }

    const { CategoryAddSuccess, CategoryAddFetching, CategoryAddError, CategoryAddErrorMessage, } = useSelector((state) => state.CategoryAddSlice)

    useEffect(() => {
        if (props?.toggle) {


        }
    }, [props?.toggle]);

    useEffect(() => {
        dispatch(fetchCategoryList())
    }, [CategoryAddSuccess, CategoryAddFetching])


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
            let payload = data;

            dispatch(fetchCategoryAdd({ payload }));
        }
    };
    useEffect(() => {
        if (CategoryAddSuccess) {
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
        } else if (CategoryAddError) {
            if (CategoryAddErrorMessage.includes("Email already exists")) {
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
            dispatch(clearCategoryAddState());
        }
    }, [CategoryAddSuccess, CategoryAddError]);

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
                            onClick={handleEdit}
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