import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";



import { toast } from "react-toastify";
import { fetchBrandList } from "../../store/Product/Brand/BrandListSlice";
import { fetchCategoryList } from "../../store/Product/Categories/CategoriesListSlice";
import { fetchproductDetails } from "../../store/Product/ProductDetailsSlice";
import { cleareditProductState, editProduct } from "../../store/Product/EditProductSlice";

const EditProduct = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchproductDetails({ productID: props.productId }))
    }, [props.productId])


    useEffect(() => {
        dispatch(fetchBrandList())
        dispatch(fetchCategoryList())
        // dispatch(fetchBarcodeList({ limit, offset: currentPage }));
    }, [])


    const { BrandList } = useSelector((state) => state.BrandListSlice)
    const { CategoryList } = useSelector((state) => state.CategoryListSlice)
    const { ProductsDetails } = useSelector((state) => state.productDetailsSlice)

    const { addProductFetching, editProductSuccess, editProductError } = useSelector(
        (state) => state.EditProductSlice
    );

    const [product_code, setProductCode] = useState("");
    const [description, setDescription] = useState("");
    const [unit_of_measure, setUnitOfMeasure] = useState("");
    const [minimum_quantity, setMinimumQuantity] = useState("");
    const [price_without_VAT, setPriceWithoutVAT] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategories] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);




console.log(ProductsDetails);
    useEffect(() => {
        if (props?.productId) {
            setBrand(ProductsDetails?.brand),
                setCategories(ProductsDetails?.category),
                setDescription(ProductsDetails?.description),
                setMinimumQuantity(ProductsDetails?.minimum_quantity),
                setPriceWithoutVAT(ProductsDetails?.price_without_VAT),
                setProductCode(ProductsDetails?.product_code),
                setUnitOfMeasure(ProductsDetails?.unit_of_measure)
        }
    }, [props?.productId]);

    const handleSave = () => {
        let data = {
            product_code,
            description,
            unit_of_measure,
            minimum_quantity,
            price_without_VAT,
            brand,
            category,
            selectedImage,
        };

        let error = undefined;

        if (data.brand === "") {
            error = "Please select brand";
        } else if (data.category === "") {
            error = "Please select category";
        } else if (data.description === "") {
            error = "Please enter description";
        } else if (data.minimum_quantity === "") {
            error = "Please enter minimum quantity";
        } else if (data.price_without_VAT === "") {
            error = "Please enter price";
        } else if (data.product_code === "") {
            error = "Please enter product code";
        } else if (data.unit_of_measure === "") {
            error = "Please enter unit of measure";
        }
        if (error) {
            toast.error(error, {
                position: "top-center",
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

            dispatch(editProduct({ payload, productID:props.productId }));
        }
    };
    useEffect(() => {
        if (editProductSuccess) {
            toast.success("Updated successfully", {
                toastId: "addUser",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                type: "success",
                theme: "light",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(cleareditProductState());
            props?.setToggle(false);
        } else if (editProductError) {
            if (editProductError) {
                toast.error(editProductError, {
                    toastId: "addLawyer",
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
                toast.error(editProductError, {
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
            dispatch(cleareditProductState());
        }
    }, [editProductSuccess, editProductError]);

    const handleCancel =()=>{
        props.setToggle(false)
        setBrand(""),
        setCategories(""),
        setDescription(""),
        setMinimumQuantity(""),
        setPriceWithoutVAT(""),
        setProductCode(""),
        setUnitOfMeasure("")

    }

    return (
        <div className="modal" id="modal">
            <Modal size="lg" centered show={props.toggle} onHide={props.setToggle}>
                <Modal.Body className="mb--2">
                    <Row
                        className="justify-content-center align-items-center"
                        style={{ height: "34px" }}
                    >
                        <Col xl={12}>
                            <h5 className="ms-2 text-black">
                                <strong>Edit Products</strong>
                            </h5>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Body className="px-4 mx-3 mb-3">
                    <Row>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">
                                Image<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <input
                                style={{ border: "1px solid #CCDBE1" }}
                                type="file"
                                className="form-control"
                                name="pic-2"
                                accept="image/*"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />
                        </Col>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">
                                Product Code<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                style={{ border: "1px solid #b3c3f3" }}
                                className="form-control-md"
                                type="text"
                                value={product_code}
                                onChange={(e) => {
                                    setProductCode(e.target.value);
                                }}
                            ></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">Description<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                style={{ border: "1px solid #b3c3f3" }}
                                className="form-control-md"
                                type="email"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></Form.Control>
                        </Col>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">
                                Unit of Measure<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                style={{ border: "1px solid #b3c3f3" }}
                                className="form-control-md"
                                type="number"
                                value={unit_of_measure}
                                onChange={(e) => {
                                    setUnitOfMeasure(e.target.value);
                                }}
                            ></Form.Control>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">
                                Minimum Quantity<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                style={{ border: "1px solid #b3c3f3" }}
                                className="form-control-md"
                                type="number"
                                value={minimum_quantity}
                                onChange={(e) => {
                                    setMinimumQuantity(e.target.value);
                                }}
                            ></Form.Control>
                        </Col>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">Price Without VAT<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                style={{ border: "1px solid #b3c3f3" }}
                                className="form-control-md"
                                type="number"
                                value={price_without_VAT}
                                onChange={(e) => {
                                    setPriceWithoutVAT(e.target.value);
                                }}
                            ></Form.Control>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">Categories<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Select onChange={(e) => setCategories(e.target.value)}>
                                <option value="" >Select Categories --</option>
                                {
                                    CategoryList?.map((item) => {
                                        return (

                                            <option value={item.id}>{item.category_name}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Col>

                        <Col className="mt-3 d-flex flex-column">
                            <Form.Label className="text-black">Brand<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Select onChange={(e) => setBrand(e.target.value)} >
                                <option value="">Select Brand --</option>
                                {
                                    BrandList?.map((item) => {
                                        return (

                                            <option value={item.id}>{item.brand_name}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-end align-items-center my-1 me-3 ">
                        <Button
                            onClick={() => handleCancel()}
                            className="btn btn-md me-2"
                            style={{ backgroundColor: "white", color: "black" }}
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
    );
};
export default React.memo(EditProduct);
