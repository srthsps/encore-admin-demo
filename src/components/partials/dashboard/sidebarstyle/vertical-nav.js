import { useState, useContext, memo, Fragment, useEffect } from "react";
//Router
import { Link, useLocation, useParams } from "react-router-dom";

//React-bootstrap
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Nav,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = memo(() => {
  const dispatch = useDispatch();

  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  const { t } = useTranslation();
  const { active_tab, propertyID } = useParams();
  const [activeMenu, setActiveMenu] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [active, setActive] = useState("");

  //location
  let location = useLocation();

  return (
    <Fragment className="">
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li className="nav-item static-item">
          {/* <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">{t("sidebar.title")}</span>
            <span className="mini-icon">-</span>
          </Link> */}
        </li>
        {/* <li
          style={
            location.pathname === "/dashboard"
              ? { background: "#eff8fb", borderRadius: "6px" }
              : {}
          }
          className={`${
            location.pathname === "/dashboard" ? "active" : ""
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname === "/dashboard" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboard"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Dashboard</Tooltip>}
            >
              <i className="icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="#018EC5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M9.71701 0.333252H11.9743C12.9092 0.333252 13.6667 1.09715 13.6667 2.03989V4.31627C13.6667 5.25901 12.9092 6.02291 11.9743 6.02291H9.71701C8.78216 6.02291 8.02466 5.25901 8.02466 4.31627V2.03989C8.02466 1.09715 8.78216 0.333252 9.71701 0.333252Z"
                    fill="#018EC5"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.02569 0.333252H4.283C5.21785 0.333252 5.97535 1.09715 5.97535 2.03989V4.31627C5.97535 5.25901 5.21785 6.02291 4.283 6.02291H2.02569C1.09085 6.02291 0.333344 5.25901 0.333344 4.31627V2.03989C0.333344 1.09715 1.09085 0.333252 2.02569 0.333252ZM2.02569 7.97693H4.283C5.21785 7.97693 5.97535 8.74083 5.97535 9.68357V11.9599C5.97535 12.902 5.21785 13.6666 4.283 13.6666H2.02569C1.09085 13.6666 0.333344 12.902 0.333344 11.9599V9.68357C0.333344 8.74083 1.09085 7.97693 2.02569 7.97693ZM11.9743 7.97693H9.71702C8.78217 7.97693 8.02467 8.74083 8.02467 9.68357V11.9599C8.02467 12.902 8.78217 13.6666 9.71702 13.6666H11.9743C12.9092 13.6666 13.6667 12.902 13.6667 11.9599V9.68357C13.6667 8.74083 12.9092 7.97693 11.9743 7.97693Z"
                    fill="#018EC5"
                  />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: "600" }}
            >
              Dashboard
            </span>
          </Link>
        </li> */}
        <li
          style={
            location.pathname === `/product/${active_tab}`
              ? { background: "#eff8fb", borderRadius: "6px" }
              : {}
          }
          className={`${location.pathname === `/product/${active_tab}` ? "active" : ""
            } nav-item `}
        >
          <Link
            className={`${location.pathname === `/product/${active_tab}` ? "active" : ""
              } nav-link `}
            aria-current="page"
            to="/product/Product-list"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Product</Tooltip>}
            >
              <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                  <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: "600" }}
            >
              Product
            </span>
          </Link>
        </li>
        <li
          style={
            location.pathname === `/order/${active_tab}`
              ? { background: "#eff8fb", borderRadius: "6px" }
              : {}
          }
          className={`${location.pathname === `/order/${active_tab}` ? "active" : ""
            } nav-item `}
        >
          <Link
            className={`${location.pathname === `/order/${active_tab}` ? "active" : ""
              } nav-link `}
            aria-current="page"
            to="/order/order-list"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Order</Tooltip>}
            >
              <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: "600" }}
            >
              Order
            </span>
          </Link>
        </li>
      </Accordion>
    </Fragment>
  );
});

VerticalNav.displayName = "VerticalNav";
export default VerticalNav;
