import { useState, useEffect, memo, Fragment } from "react";
import { Row, Col } from "react-bootstrap";


import { useSelector, useDispatch } from "react-redux";
//swiper
import SwiperCore, { Navigation } from "swiper";
import { useHistory } from "react-router-dom";

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-3">
            <div className="d-flex flex-column">
              <h4>Quick Insights</h4>
              
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
});

Index.displayName = "Index";
export default Index;
