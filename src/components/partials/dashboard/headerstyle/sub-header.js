import { memo } from "react";

//React-bootstrap
import { Row, Col, Container } from "react-bootstrap";

//Router
import { Link } from "react-router-dom";

//Img
import topHeader from "../../../../assets/images/dashboard/top-header.png";
import topHeader1 from "../../../../assets/images/dashboard/top-header1.png";
import topHeader2 from "../../../../assets/images/dashboard/top-header2.png";
import topHeader3 from "../../../../assets/images/dashboard/top-header3.png";
import topHeader4 from "../../../../assets/images/dashboard/top-header4.png";
import topHeader5 from "../../../../assets/images/dashboard/top-header5.png";

const SubHeader = memo((props) => {
  return (
    <div className="iq-navbar-header" style={{ height: "215px" }}>
      <Container fluid className=" iq-container">
        <Row>
          <Col md="12">
            {/* <div className="d-flex justify-content-between flex-wrap">
                            <div>
                                <h1>Hello Hope!</h1>
                            </div>
                        </div> */}
          </Col>
        </Row>
      </Container>
      {/* {{!-- rounded-bottom if not using animation --}} */}
      <div className="iq-header-img">
        <img
          src={topHeader2}
          alt="header"
          className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
          loading="lazy"
        />
        <img
          src={topHeader2}
          alt="header"
          className=" theme-color-purple-img img-fluid w-100 h-100 animated-scaleX"
          loading="lazy"
        />
      </div>
    </div>
  );
});

SubHeader.displayName = "SubHeader";
export default SubHeader;
