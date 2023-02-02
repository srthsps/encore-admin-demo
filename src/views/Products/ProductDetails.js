import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchproductDetails } from "../../store/Product/ProductDetailsSlice";
import EditProduct from "./EditProduct";
import { deleteproduct } from "../../store/Product/ProductDeleteSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [productId, setProductId] = useState()
    const [editProduct, setEditProduct] = useState(false)

    const { editProductSuccess, editProductFetching, editProductError } =
        useSelector((state) => state.EditProductSlice);
    useEffect(() => {
        if (id !== null || id !== undefined) {
            dispatch(fetchproductDetails({ productID: id }));
        }
    }, [id, editProductSuccess, editProductFetching]);

    


    const { ProductsDetails } = useSelector((state) => state.productDetailsSlice);

    const handleEdit = (id) => {
        setProductId(id)
        setEditProduct(true)
        
    }

    //Delete Product
    const handleDelete = (e) => {
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
                dispatch(deleteproduct({ productID: id }));
                history.push("/product");
            }
        });
    };

    return (
        <Fragment>
            <EditProduct
                toggle={editProduct}
                setToggle={setEditProduct}
                productId={productId}
            />
            <Row>
                <Row className="align-items-center">
                    <Col lg="7">
                        <div className="product-vertical-slider">
                            <div className="d-flex justify-content-center">
                                <Image
                                    style={{
                                        width: ProductsDetails?.image === null ? "600px" : "324px",
                                    }}
                                    src={
                                        ProductsDetails?.image === null
                                            ? placeholderImage
                                            : ProductsDetails?.image
                                    }
                                    alt="product"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col className="" lg="5">
                        <div className="border-bottom">
                            <div className="d-flex flex-column align-content-between justify-items-center mb-3">
                                <div className="d-flex justify-content-between">
                                    <h2 className="mb-0">{ProductsDetails?.name}</h2>
                                    <div className="d-flex justify-content-end "></div>
                                </div>
                            </div>
                            <div className="d-flex my-4">
                                <h4 className="mb-0"> Price:</h4>
                                <h4 className="text-primary mb-0 ms-2">
                                    ₹ {ProductsDetails?.price_without_VAT}
                                </h4>
                            </div>
                        </div>
                        <div className="border-bottom">
                            <p className="py-4 mb-0">
                                {ProductsDetails?.description === ""
                                    ? "No descriptiion added"
                                    : ProductsDetails?.description}
                            </p>
                        </div>
                        <div className="d-flex flex-column py-4">
                            <div className="d-flex align-items-center mb-3">
                                <span className="text-dark">Product Code:</span>
                                <span className="text-primary  ms-2">
                                    {ProductsDetails?.product_code}
                                </span>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <span className="text-dark">Category:</span>
                                <span className="text-primary  ms-2">
                                    {ProductsDetails?.category}
                                </span>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <span className="text-dark">Brand:</span>
                                <span className="text-primary  ms-2">
                                    {ProductsDetails?.brand}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex py-4 flex-wrap gap-4">
                                <Button
                                    onClick={() => handleEdit(ProductsDetails?.id)}
                                    className="btn  btn-warning d-flex align-items-center gap-2"
                                >
                                    <span className="btn-inner d-flex">
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
                                    </span>
                                    Edit
                                </Button>
                                <button
                                    onClick={handleDelete}
                                    className="btn btn-danger d-flex align-items-center cart-btn  gap-2"
                                >
                                    <span className="btn-inner d-flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-trash"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path
                                                fill-rule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                            />
                                        </svg>
                                    </span>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Row>
        </Fragment>
    );
};

export default ProductDetails;
