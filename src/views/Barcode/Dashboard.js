import React, { useState, useEffect, memo } from "react";
//react-bootstrap
import { Nav, Tab ,Card } from "react-bootstrap";

import { useHistory, useParams } from "react-router-dom";

//components
import Barcode from "./Index";
import LatestBarcode from "./LatestBarcode";

const BarcodeDashboard = memo(() => {
  const history = useHistory();
  let { active_tab } = useParams();
  const tabs = [
    {
      title: "Latest QR Code",
      route: "latest-barcode",
      eventKey: "first",
      content: <LatestBarcode />,
    },
    {
      title: "QR Code",
      route: "barcode-list",
      eventKey: "second",
      content: <Barcode />,
    },
   
  ];
  useEffect(() => {
    const defaultTab = tabs[0].route;
    if (tabs.find((tab) => tab.eventKey === "first")) {
      history.replace(`./${defaultTab}`);
    }
  }, []);
  const toggle = (tabRoute) => {
    if (active_tab !== tabRoute) {
      history.push(`${tabRoute}`);
    }
  };
  const [selected, setSelected] = useState("first");
  return (
    <React.Fragment>
      <div className="">
        <h5 className="mb-4">QR Codes</h5>
        <Tab.Container defaultActiveKey="first">
          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <Nav
                  as="ul"
                  className="d-flex mb-0 text-center profile-tab"
                  data-toggle="slider-tab"
                  id="profile-pills-tab"
                  role="tablist"
                >
                  {tabs.map((item, idx) => (
                    <Nav.Item key={idx} as="li">
                      <Nav.Link
                        style={{
                          borderBottom:
                            selected === item.eventKey
                              ? "3px solid #018EC5"
                              : "",
                          color: selected === item.eventKey ? "" : "black",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelected(item.eventKey);
                          toggle(item.route);
                        }}
                        role="button"
                        eventKey={item.eventKey}
                      >
                        {item.title}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Tab.Content className="profile-content">
                {tabs.map((tabs) => (
                  <Tab.Pane eventKey={tabs.eventKey} key={tabs.title}>
                    {tabs.content}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </div>
    </React.Fragment>
  );
});

export default BarcodeDashboard;
