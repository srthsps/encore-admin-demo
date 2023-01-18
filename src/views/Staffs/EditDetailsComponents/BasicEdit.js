import React, { useState, useEffect } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  editStaff,
  clearEdstState,
} from "../../../store/usermanagement/staff/staffEditSlice";

import {
  editManager,
  clearEdmaState,
} from "../../../store/usermanagement/managers/managerEditSlice";

import {
  editAdmin,
  clearEdadState,
} from "../../../store/usermanagement/admins/adminEditSlice";
import {
  editOwner,
  clearEdowState,
} from "../../../store/usermanagement/owners/ownerEditSlice";

import { toast } from "react-toastify";

import { fetchStaffDetails } from "../../../store/usermanagement/staff/staffDetailsSlice";
import { fetchAdminDetails } from "../../../store/usermanagement/admins/adminDetailsSlice";
import { fetchOwnerDetails } from "../../../store/usermanagement/owners/ownerDetailsSlice";
import { fetchManagerDetails } from "../../../store/usermanagement/managers/managerDetailsSlice";

function BasicEdit({ toggle, setToggle, basicDetails ,userType}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [userID ,setUserID] =useState(null)

  useEffect(() => {
    if (basicDetails) {
      setName(basicDetails?.name);
      setMobile(basicDetails?.mobile);
      setEmail(basicDetails?.email);
      setUserID(basicDetails?.id)
    }
  }, [basicDetails]);

  const handleSave = () => {
    let data = {
      name,
      mobile,
      email,
    };

    let error = undefined;

    if (data.name.trim() === "") {
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

      switch (userType) {
        case "staff":
          dispatch(editStaff({ payload, userID }));
          break;
        case "manager":
          dispatch(editManager({ payload, userID }));
          break;
        case "admin":
          dispatch(editAdmin({ payload, userID }));
          break;
        case "owner":
          dispatch(editOwner({ payload ,userID }));
          break;
      }
    }
  };
  
  const { edstSuccess, edstError, edstErrorMessage } = useSelector(
    (state) => state.staffEditSlice
  );

  const { edmaSuccess, edmaError, edmaErrorMessage } = useSelector(
    (state) => state.managerEditSlice
  );

  const { edadSuccess, edadError, edadErrorMessage } = useSelector(
    (state) => state.adminEditSlice
  );

  const { edowSuccess, edowError, edowErrorMessage } = useSelector(
    (state) => state.ownerEditSlice
  );
  useEffect(() => {
    if (edstSuccess) {
      toast.success("Staff Updated successfully", {
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
      setToggle(false);
      dispatch(fetchStaffDetails({userID}))
      dispatch(clearEdstState());
    } else if (edmaSuccess) {
      toast.success("Manager Updated successfully", {
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
      setToggle(false);
      dispatch(fetchManagerDetails({userID}))
      dispatch(clearEdmaState());
    } else if (edadSuccess) {
      toast.success("Admin Updated successfully", {
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
      setToggle(false);
      dispatch(fetchAdminDetails({userID}))
      dispatch(clearEdadState());
    } else if (edowSuccess) {
      toast.success("Owner Updated successfully", {
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
      setToggle(false);
      dispatch(fetchOwnerDetails({userID}))
      dispatch(clearEdowState());
    } else if (edstError) {
      toast.error(edstErrorMessage, {
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
      dispatch(clearEdstState());
    } else if (edmaError) {
      toast.error(edmaErrorMessage, {
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
      dispatch(clearEdmaState());
    } else if (edadError) {
      toast.error(edadErrorMessage, {
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
      dispatch(clearEdadState());
    }else if (edowError) {
      toast.error(edowErrorMessage, {
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
      dispatch(clearEdowState());
    }
  }, [
    edstSuccess,
    edstError,
    edmaSuccess,
    edmaError,
    edadSuccess,
    edadError,
    edowSuccess,
    edowError,
  ]);

  return (
    <div className="modal" id="modal">
      <Modal size="md" centered show={toggle} onHide={setToggle}>
        <Modal.Body className="mb--2">
          <Modal.Header closeButton>
            <Modal.Title>Edit Basic Details</Modal.Title>
          </Modal.Header>
        </Modal.Body>
        <Modal.Body className="px-4 mx-3 mb-3">
          <Row>
            <Col className="d-flex flex-column">
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
          </Row>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Form.Label className="text-black">Profile Photo</Form.Label>
              <Form.Control
                style={{ border: "1px solid #b3c3f3" }}
                className="form-control-md"
                type="file"
                // value={country}
                // onChange={(e) => {
                //   setCountry(e.target.value);
                // }}
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
              onClick={handleSave}
              className="btn btn-md me-2 btn-primary text-white"
            >
              Save
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default BasicEdit;
