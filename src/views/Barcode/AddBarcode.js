import React, { memo, useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addBarcode,
  clearAddBarcodeState,
} from "../../store/barcode/barcodeAddSlice";
import Select from "react-select";

const AddBarcode = memo(({ toggle, setToggle }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [point, setPoint] = useState(null);
  const [count, setCount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //Add Barcode Action
  const saveChanges = (e) => {
    e.preventDefault();
    let payload = {
      product: selectedProduct,
      point,
      count,
    };

    let error = undefined;

    if (payload.product === null) {
      error = "Please select product";
    } else if (payload.point === null) {
      error = "Please select point";
    } else if (payload.count === 0) {
      error = "Please enter count";
    } else if (payload.count > 150) {
      error = "Count cannot be more than 150";
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
      dispatch(addBarcode({ payload }));
    }
  };

  useEffect(() => {
    if (toggle) {
      setProduct(null);
      setPoint(null);
      setCount(null);
    }
  }, [toggle]);

  //Response Handler
  const { addBarcodeSuccess, addBarcodeError, addBarcodeErrorMessage } =
    useSelector((state) => state.barcodeAddSlice);

  useEffect(() => {
    if (addBarcodeSuccess) {
      toast.success("QR Code Added Successfully", {
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
      setToggle(false);
      dispatch(clearAddBarcodeState());
    }
    if (addBarcodeError) {
      toast.error(addBarcodeErrorMessage, {
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
      dispatch(clearAddBarcodeState());
    }
  }, [addBarcodeSuccess, addBarcodeError]);

  //Product List


  const productList =[]

  //Product dropdown options
  const productOptions = productList.map((item) => ({
    value: item.id,
    label: `${item.name} -- ${item.product_code}`,
  }));

  return (
    <div className="modal" id="modal">
      <Modal show={toggle} onHide={setToggle} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Add QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 px-4">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Row>
              <Col>
                <Form.Label className="text-black">
                  Product <span className="text-danger">*</span>
                </Form.Label>

                <Select
                  options={productOptions}
                  onChange={(value) => setSelectedProduct(value.value)}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Label className="text-black">
                  Point <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #b3c3f3" }}
                  type="number"
                  name="point"
                  value={point}
                  onChange={(e) => setPoint(Number(e.target.value))}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Label className="text-black">
                  QR Code Count <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #b3c3f3" }}
                  type="number"
                  name="count"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                />
              </Col>
            </Row>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setToggle(false)}
              className="btn btn-md me-3"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default memo(AddBarcode);
