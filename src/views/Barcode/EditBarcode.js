import React, { memo, useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditBarcode = memo(({ toggle, setToggle }) => {
  const dispatch = useDispatch();

  const [barcode, setBarcode] = useState({
    product: null,
    point: null,
    count: 0,
  });

  const saveChanges = (e) => {
    e.preventDefault();
    let payload = {
      ...barcode,
    };
    let error = undefined;

    if (payload.product === null) {
      error = "Please select product";
    } else if (payload.point === null) {
      error = "Please select point";
    } else if (payload.count === 0) {
      error = "Please enter count";
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
      console.log(payload);
    }
  };

  return (
    <div className="modal" id="modal">
      <Modal show={toggle} onHide={setToggle} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Edit QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 px-4">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Row>
              <Col>
                <Form.Label className="text-black">
                  Product <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  style={{ border: "1px solid #b3c3f3" }}
                  type="text"
                >
                  <option value={null}>Select Product</option>
                </Form.Select>
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
                />
              </Col>
            </Row>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setToggle(false)}
              className="btn btn-md me-3"
              outline
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

export default memo(EditBarcode);
