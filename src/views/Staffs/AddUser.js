import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";

import {
  addStaff,
  clearAsaState,
} from "../../store/usermanagement/staff/staffAddSlice";

import { toast } from "react-toastify";

const AddUser = (props) => {
  const dispatch = useDispatch();

  const { asaFetching, asaSuccess, asaError, asaErrorMessage } = useSelector(
    (state) => state.staffAddSlice
  );

  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [web_login, setWebLogin] = useState(false);

  useEffect(() => {
    if (props?.toggle) {
      setUserName("");
      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setNewPassword("");
    }
  }, [props?.toggle]);

  const handleSave = () => {
    let data = {
      username,
      name,
      mobile,
      email,
      password,
    };

    let error = undefined;

    if (data.username.trim() === "") {
      error = "Please enter a username";
    } else if (data.username.length > 15) {
      error = "Username should be maximum 15 characters";
    } else if (!/^\S{3,}$/.test(data.username)) {
      error = "Username cannot contain whitespaces";
    } else if (data.name.trim() === "") {
      error = "Please enter a name";
    } else if (data.mobile.length > 12 || data.mobile.length < 10) {
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
      let payload = data;

      dispatch(addStaff({ payload }));
    }
  };
  useEffect(() => {
    if (asaSuccess) {
      toast.success("Updated successfully", {
        toastId: "addUser",
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
      dispatch(clearAsaState());
      props?.setToggle(false);
    } else if (asaError) {
      if (asaErrorMessage.includes("Email already exists")) {
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
        toast.error(asaErrorMessage, {
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
      dispatch(clearAsaState());
    }
  }, [asaSuccess, asaError]);

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
                <strong>Add Staff</strong>
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
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">Confirm Password</Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="password"
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
              onClick={() => props.setToggle(false)}
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
              Add Staff
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default React.memo(AddUser);
