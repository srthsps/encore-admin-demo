import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearStatusUpdateState, orderStatusUpdate } from "../../store/order/OrderStatusSlice";



const UpdateStatus = ({ toggle, setToggle, orderID }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(null);

  const {
    orderStatusUpdateSuccess,
    orderStatusUpdateError,
    orderStatusUpdateErrorMessage,
  } = useSelector((state) => state.orderStatusUpdateSlice);

  useEffect(() => {
    if (toggle) {
      setStatus("");
    }
  }, [toggle]);



  const saveChanges = (e) => {
    e.preventDefault();
    let payload = {
      status,
    };
    dispatch(orderStatusUpdate({ payload, orderID }));
  };

  useEffect(() => {
    if (orderStatusUpdateSuccess) {
      toast.success("Updated successfully", {
        toastId: "editCase",
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
      dispatch(clearStatusUpdateState());
      setToggle(false);
    } else if (orderStatusUpdateError) {
      toast.error(orderStatusUpdateErrorMessage, {
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
      dispatch(clearStatusUpdateState());
    }
  }, [orderStatusUpdateSuccess, orderStatusUpdateError]);

  return (
    <div className="modal" id="modal">
      <Modal size="md" centered show={toggle} onHide={setToggle}>
        <Modal.Body className="">
          <Modal.Header closeButton>
            <Modal.Title>Edit Order</Modal.Title>
          </Modal.Header>
        </Modal.Body>
        <Modal.Body className="mx-3">
          <Row>
            <Col xl={12} className=" d-flex flex-column">
              <Form.Label className="text-black">Status</Form.Label>
              <select
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option disabled value="" >Select status</option>
                <option value={1}>Processing</option>
                <option value={2}>Shipped</option>
                <option value={3}>Delivered</option>
                <option value={4}>Canceled</option>
              </select>
            </Col>
          </Row>
        </Modal.Body>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end align-items-center mt-3 me-3">
            <Button
              onClick={() => setToggle(false)}
              className="btn btn-md "
              outline
              style={{ backgroundColor: "white", color: "black" }}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-md ms-3 btn-primary text-white"
              onClick={saveChanges}
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default React.memo(UpdateStatus);
