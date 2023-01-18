import React, { memo, useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store/profile/userProfileSlice";
import image from '../../assets/images/user.jpeg'

function Profile() {
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [username ,setUserName]=useState('')

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);
  const { userProfile } = useSelector((state) => state.userProfileSlice);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile?.name)
      setEmail(userProfile?.email)
      setMobile(userProfile?.mobile)
      setUserName(userProfile?.username)
    }
  }, [userProfile]);

  return (
    <div>
      <Card style={{ border: "1px solid #b3c3f3" }}>
        <Card.Body>
          <h6 className="text-start mb-3">Personal Info</h6>
          <p className="mb-3">Avatar</p>
          <div className="d-flex justify-content-start align-items-center">
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#b3c3f3",
                borderRadius: "90px",
              }}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                className="img-fluid "
                style={{
                  width: "80px",
                  height: "80px",
                  background: "#b3c3f3",
                  borderRadius: "90px",
                }}
                src={image}
                alt=""
              />{" "}
            </div>
            {/* <div className="ms-3">
              <Button className="btn ">Upload</Button>
              <Button
                style={{
                  backgroundColor: "white",
                  color: "#018EC5",
                  border: "1px solid #b3c3f3",
                }}
                className="btn-md ms-3"
              >
                Remove
              </Button>
            </div> */}
          </div>
          <hr className="mt-5" />
          <div className="mt-5">
            <Row>
              <Col>
                <Form.Label className="text-black">
                  Display Name{" "}
                  <span className="text-muted" style={{ fontSize: "11px" }}>
                    (Visible to others)
                  </span>
                </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #b3c3f3" }}
                  className="form-control-md"
                  type="text"
                  value={username}
                  disabled
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label className="text-black">
                  Name{" "}
                  <span className="text-muted" style={{ fontSize: "11px" }}>
                    {" "}
                    (Your given name)
                  </span>
                </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #b3c3f3" }}
                  className="form-control-md"
                  type="text"
                  value={name}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row className="mt-4 mb-4">
              <Col>
                <Form.Label className="text-black">Mobile Number </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #b3c3f3" }}
                  className="form-control-md"
                  type="number"
                  value={mobile}
                  disabled
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label className="text-black">Email </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #b3c3f3" }}
                  className="form-control-md"
                  type="email"
                  value={email}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
          </div>
          {/* <Button className="float-end">Save Changes</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
