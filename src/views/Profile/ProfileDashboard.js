import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Nav, Row, Col } from "react-bootstrap";

import Profile from "./Profile";
import MyAccount from "./MyAccount";

function ProfileDashboard() {
  const screenWidth = screen.width;
  const [selected, setSelected] = useState("1");
  const tabs = [
    {
      name: "Profile",
      eventKey: "1",
      content: <Profile />,
    },
    // {
    //   name: "My Account",
    //   eventKey: "2",
    //   content: <MyAccount />,
    // },
    // {
    //   name: "Notifications  ",
    //   eventKey: "3",
    //   content: "Hello",
    // },
  ];
  return (
    <div>
      <div className="">
        <p>
          <Link to="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
            Back to Dashboard
          </Link>
        </p>
      </div>
      <div className="m-5 ">
        <Tab.Container defaultActiveKey="1">
          <Row>
            <Col lg="2" md="4" className="px-0" style={{ borderRight: "" }}>
              <Nav
                as="ul"
                className="d-flex nav-fills col mb-0 text-center profile-tab"
                data-toggle="slider-tab"
                id="profile-pills-tab"
                role="tablist"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "50px",
                  background: "#b3c3f3",
                }}
                tabs
              >
                {tabs.map((tab, key) => (
                  <Nav.Link
                    key={key}
                    className="p-3"
                    eventKey={tab.eventKey}
                    style={{
                      borderLeft:
                        selected === tab.eventKey ? "3px solid #018EC5" : "",
                      borderRadius: "2px",
                      borderBottom: "1px solid #b3c3f3",
                    }}
                    href="#v-pills-basicinfo-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-basicinfo-tab"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(tab.eventKey);
                    }}
                  >
                    <div className="text-start">
                      <p>{tab.name}</p>
                    </div>
                  </Nav.Link>
                ))}
              </Nav>
            </Col>
            <Col
              lg="8"
              md="8"
              style={{}}
              className="d-flex justify-content-center align-items-center"
            >
              <Tab.Content className="iq-tab-fade-up">
                {tabs.map((tab, key) => (
                  <Tab.Pane
                    key={key}
                    eventKey={tab.eventKey}
                    id="v-pills-basicinfo-tab"
                    role="tabpanel"
                    aria-labelledby="v-pills-basicinfo-tab"
                  >
                    {tab.content}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default ProfileDashboard;
