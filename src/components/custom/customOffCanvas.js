import React from "react";
import { Row, Col, Button, Modal, Offcanvas, Form } from "react-bootstrap";

const CustomOffCanvas = ({ toggle, setToggle, data }) => {
  return (
    <Offcanvas
      show={toggle}
      onHide={setToggle}
      responsive="lg"
      placement="end"
      backdrop={true}
      keyboard={true}
      className="ps-2"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Staff Details</Offcanvas.Title>
      </Offcanvas.Header>
      <hr />
      <Offcanvas.Body>
        <Row className="my-3">
          <Col>Name</Col>
          <Col className="text-black">{data?.name}</Col>
        </Row>
        <Row className="my-3">
          <Col>Designation</Col>
          <Col className="text-black">{data?.destination}</Col>
        </Row>
        <Row className="my-3">
          <Col>Mobile</Col>
          <Col className="text-black">{data?.mobile}</Col>
        </Row>
        <Row className="my-3">
          <Col>Email</Col>
          <Col className="text-black">{data?.email}</Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CustomOffCanvas;
