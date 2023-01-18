import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";

import { fetchStaffDetails } from "../../store/usermanagement/staff/staffDetailsSlice";

import {
  editStaff,
  clearEsdsState,
} from "../../store/usermanagement/staff/staffEditSlice";

import { toast } from "react-toastify";

const EditUser = ({ toggle, setToggle, userID }) => {
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (userID !== undefined && userID !== null) {
      dispatch(fetchStaffDetails({ userID }));
    }
  }, [toggle, userID]);

  const { staffDetails } = useSelector((state) => state.staffDetailsSlice);

  useEffect(() => {
    if (toggle || staffDetails) {
      setUserName(staffDetails.username);
      setName(staffDetails.name);
      setMobile(staffDetails.mobile);
      setEmail(staffDetails.email);
      setPassword(staffDetails.password);
      setNewPassword(staffDetails.newPassword);
    }
  }, [staffDetails, toggle]);

  const handleSave = (e) => {
    e.preventDefault();
    let payload = {
      username,
      name,
      mobile,
      email,
      password,
    };

    let error = undefined;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (payload.username.trim() === "") {
      error = "Please enter a username";
    } else if (payload.username.length > 15) {
      error = "Username should be maximum 15 characters";
    } else if (!/^\S{3,}$/.test(payload.username)) {
      error = "Username cannot contain whitespaces";
    } else if (payload.name.trim() === "") {
      error = "Please enter a name";
    } else if (payload.mobile.length > 12 || payload.mobile.length < 10) {
      error = "Mobile number should be 10-12 digits";
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
      dispatch(editStaff({ userID, payload }));
    }
  };
  const { esdsSuccess, esdsError, esdsErrorMessage } = useSelector(
    (state) => state.staffEditSlice
  );

  useEffect(() => {
    if (esdsSuccess) {
      toast.success("Updated successfully", {
        toastId: "addLawyer",
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
      dispatch(clearEsdsState());
      setToggle(false);
    } else if (esdsError) {
      if (esdsErrorMessage.includes("Email already exists")) {
        toast.error("Email already exists", {
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
        toast.error(esdsErrorMessage, {
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
      dispatch(clearEsdsState());
    }
  }, [esdsSuccess, esdsError]);

  return (
    <div className="modal" id="modal">
      <Modal size="lg" centered show={toggle} onHide={setToggle}>
        <Modal.Body className="mb--2">
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "34px" }}
          >
            <Col xl={12}>
              <h5 className="ms-2 text-black">
                <strong>Edit Staff</strong>
              </h5>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Body className="px-4 mx-3 mb-3">
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">
                Username<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="text"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></Form.Control>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">
                Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">Email</Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">
                Mobile<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="text"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">
                Password<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">
                Confirm Password<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="select"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              ></Form.Control>
            </Col>
          </Row>
        </Modal.Body>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end align-items-center my-1 me-3 ">
            <Button
              onClick={() => setToggle(false)}
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
              Update
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default React.memo(EditUser);
