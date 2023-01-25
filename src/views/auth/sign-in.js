import { memo, Fragment, useState, useEffect } from "react";

//react-bootstrap
import { Row, Col, Image, Form, Button, ListGroup } from "react-bootstrap";

//router
import { Link, useHistory } from "react-router-dom";

//components
import Card from "../../components/bootstrap/card";

// img
// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useSelector, useDispatch } from "react-redux";

import { loginUser, clearLoginState } from "../../store/login/loginSlice";

import { toast } from "react-toastify";

const SignIn = memo(() => {
  const appName = useSelector(SettingSelector.app_name);
  let history = useHistory();
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");



  const { loginSuccess, loginError, loginErrorMessage } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    dispatch(clearLoginState());
  }, []);

  const login = (e) => {
    
    e.preventDefault();
    let error = undefined;

    if (username === "") {
      error = "Please enter username";
    } else if (password === "") {
      error = "Please enter password";
    }

    if (error) {
      toast.error(error);
    } else {
      dispatch(loginUser({ username, password }));
    };
  }
  
  if (loginSuccess) {
    history.push("/product/Product-list");
    toast.success("login success");

  }



  useEffect(() => {
    if (loginError) {
      toast.error(loginErrorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearLoginState());
    }

    if (loginSuccess) {
      dispatch(clearLoginState());

    }
  }, [loginError, loginSuccess]);

  return (
    <Fragment>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <Link
                      to="/dashboard"
                      className="navbar-brand col-12 d-flex align-items-center justify-content-center mb-3"
                    >
                      <div className="mb-4">
                        <div className="logo-normal">
                          <h1>Encore Powers</h1>
                        </div>
                      </div>
                    </Link>
                    <h2 className="mb-2 text-center">Sign In</h2>
                    <p className="text-center">Login to stay connected.</p>
                    <Form   >
                      <Row>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email" className="">
                              Username
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className=""
                              value={username}
                              onChange={(e) => setUserName(e.target.value)}
                              id="text"
                              aria-describedby="email"
                              placeholder=" "
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12" className="">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password" className="">
                              Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              className=""
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="password"
                              aria-describedby="password"
                              placeholder=" "
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12" className="d-flex justify-content-between">
                          <Form.Check className="form-check mb-3">
                            <Form.Check.Input
                              type="checkbox"
                              id="customCheck1"
                            />
                            <Form.Check.Label htmlFor="customCheck1">
                              Remember Me
                            </Form.Check.Label>
                          </Form.Check>
                          <Link to="/auth/recoverpw">Forgot Password?</Link>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button
                          onClick={(e) => login(e)}
                          type="submit"
                          variant="btn btn-primary"
                        >
                          Sign In
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg">
              <svg
                width="280"
                height="230"
                viewBox="0 0 431 398"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.05">
                  <rect
                    x="-157.085"
                    y="193.773"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 -157.085 193.773)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="7.46875"
                    y="358.327"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 7.46875 358.327)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="61.9355"
                    y="138.545"
                    width="310.286"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 61.9355 138.545)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="62.3154"
                    y="-190.173"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 62.3154 -190.173)"
                    fill="#3B8AFF"
                  />
                </g>
              </svg>

            </div>
          </Col>
          <Col
            md="6"
            className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden"
          >
            <Image
              src={''}
              className="Image-fluid gradient-main "
              alt="images"
            />
          </Col>
        </Row>
      </section>
    </Fragment>
  );
});

SignIn.displayName = "SignIn";
export default SignIn;
