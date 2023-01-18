import { memo, Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CustomHeaderCard2 = memo((props) => {
  const history = useHistory();
  return (
    <Fragment>
      <Card
        className="shadow-lg mb-5 "
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (props.link) {
            history.push(props.link);
          }
        }}
      >
        <Card.Body className="p-0">
          <Row className="">
            <Col
              className="rounded-3 d-flex justify-content-center align-items-center py-1"
              lg="2"
              style={{ background: "#018EC5" }}
            >
              <div>{props.svg}</div>
            </Col>
            <Col>
              <div
                className="d-flex justify-content-between"
                style={{ padding: "11px" }}
              >
                <div>
                  <h2>{props.content}</h2>
                  <p className="text-black">{props.text}</p>
                </div>
                <div className="pe-2 pt-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 22 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.69647 0.0502268C3.42213 0.10153 3.00529 0.24632 2.77015 0.372014C2.12359 0.717884 0.460217 2.47517 0.21111 3.07556C-0.0704887 3.75419 -0.0703463 4.90054 0.211395 5.5786C0.360175 5.93687 2.19356 7.87329 5.87358 11.5594L11.3157 17.0104L5.87358 22.4614C2.19356 26.1476 0.360175 28.084 0.211395 28.4423C-0.0703463 29.1203 -0.0704887 30.2667 0.21111 30.9453C0.485583 31.607 2.15565 33.3239 2.89927 33.7091C3.64887 34.0975 4.88613 34.0969 5.63374 33.7078C6.45132 33.2823 20.5844 19.0814 20.8639 18.4045C21.1681 17.6677 21.1405 16.2253 20.8082 15.4936C20.4526 14.7105 6.59454 0.783581 5.76285 0.373439C5.07681 0.0352635 4.36982 -0.0753241 3.69647 0.0502268Z"
                      fill="#018EC5"
                    />
                  </svg>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Fragment>
  );
});

CustomHeaderCard2.displayName = "CustomHeaderCard2";
export default CustomHeaderCard2;
