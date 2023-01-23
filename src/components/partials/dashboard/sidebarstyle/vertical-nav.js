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
            location.pathname === `/staff`
              ? { background: "#eff8fb", borderRadius: "6px" }
              : {}
          }
          className={`${
            location.pathname === `/staff` ? "active" : ""
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname === `/staff` ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/staff"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Staff</Tooltip>}
            >
              <i className="icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="#018EC5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.2167 0.0360807C6.36945 0.115744 5.28484 0.425062 4.48506 0.815077C3.7121 1.19202 2.80456 1.8501 2.24621 2.43856C0.158186 4.63903 -0.530143 7.68669 0.417851 10.5337C1.21475 12.9269 3.07566 14.7885 5.46604 15.5837C8.874 16.7175 12.5626 15.4823 14.5966 12.5261C16.4647 9.81137 16.4647 6.19239 14.5966 3.47762C12.9389 1.06837 10.1364 -0.238524 7.2167 0.0360807ZM5.90317 2.90064C6.18398 2.95389 6.48132 3.11032 6.67563 3.30706C7.41228 4.05288 7.19503 5.2635 6.24477 5.70817C5.85779 5.88927 5.33412 5.87254 4.92957 5.66616C4.69598 5.54698 4.44075 5.27721 4.30856 5.00974C4.19586 4.78169 4.18298 4.72763 4.17111 4.43235C4.16031 4.16345 4.17061 4.06878 4.2302 3.88981C4.46379 3.18788 5.18116 2.76369 5.90317 2.90064ZM10.668 4.23831C11.1305 4.4603 11.4268 4.86145 11.5064 5.37334C11.5389 5.58232 11.5361 5.65935 11.4885 5.87334C11.3567 6.46566 10.9325 6.88992 10.3402 7.02171C9.68424 7.16763 9.01856 6.83407 8.70677 6.20323C8.58649 5.95984 8.58389 5.94633 8.58389 5.56762C8.58389 5.18754 8.58613 5.1762 8.70924 4.92704C8.89344 4.55433 9.2134 4.279 9.61762 4.14534C9.70142 4.11763 9.87498 4.1044 10.0845 4.10976C10.3898 4.11753 10.439 4.12837 10.668 4.23831ZM6.41333 6.79885C6.75099 6.88749 7.12967 7.05148 7.3836 7.21901C7.57367 7.34443 8.16707 7.886 8.16707 7.93405C8.16707 7.94656 8.06079 8.02936 7.93094 8.11809C7.64734 8.3119 7.25268 8.69951 7.05268 8.98075C6.64032 9.56057 6.41743 10.1887 6.37052 10.903L6.34971 11.2198L5.74948 11.2301C4.32717 11.2545 3.18114 10.9734 2.68655 10.4788C2.46036 10.2526 2.41731 10.1115 2.44175 9.67645C2.52249 8.24057 3.61413 7.02777 5.07729 6.74847C5.41228 6.68451 6.07264 6.70942 6.41333 6.79885ZM10.8344 8.02309C12.2019 8.36472 13.2214 9.63033 13.2468 11.0179C13.2518 11.2911 13.2438 11.3343 13.1625 11.4727C13.0294 11.6989 12.8284 11.8621 12.4886 12.0199C11.9595 12.2654 11.4537 12.3775 10.5759 12.4437C9.4736 12.5268 8.26904 12.3519 7.55016 12.0043C7.21804 11.8437 7.04187 11.6941 6.91916 11.4687C6.82609 11.2977 6.82425 11.2845 6.8429 10.9232C6.88955 10.0192 7.31434 9.20244 8.03982 8.62181C8.82605 7.99258 9.84154 7.77503 10.8344 8.02309Z"
                    fill="#018EC5"
                  />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: "600" }}
            >
              Staff
            </span>
          </Link>
        </li>
        <li
          style={
            location.pathname === `/barcode/${active_tab}`
              ? { background: "#eff8fb", borderRadius: "6px" }
              : {}
          }
          className={`${
            location.pathname === `/barcode/${active_tab}` ? "active" : ""
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname === `/barcode/${active_tab}` ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/barcode/barcode-list"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>QR Codes</Tooltip>}
            >
              <i className="icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="#018EC5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.424591 0.0433737C0.285304 0.0969345 0.150037 0.217577 0.0727062 0.357176L0.0109164 0.468735L0.00545834 3.80786L0 7.14701L0.0513941 7.19838L0.102768 7.24977H3.62539H7.14801L7.19913 7.19863L7.25027 7.14751V3.62489V0.102268L7.19913 0.0511443L7.14801 0L3.83986 0.00108334C0.595336 0.00214581 0.529671 0.00295825 0.424591 0.0433737ZM8.80137 0.0511443L8.75023 0.102268V3.62489V7.14751L8.80137 7.19863L8.85249 7.24977H12.3751H15.8977L15.9489 7.19863L16 7.14751V3.84536V0.543212L15.9551 0.423299C15.8946 0.261471 15.7385 0.105414 15.5767 0.0448737L15.4568 0H12.1546H8.85249L8.80137 0.0511443ZM5.91698 3.62489V5.91648H3.62539H1.33379V3.62489V1.33329H3.62539H5.91698V3.62489ZM14.6667 3.62489V5.91648H12.3751H10.0835V3.62489V1.33329H12.3751H14.6667V3.62489ZM2.92655 2.92605L2.87541 2.97718V3.62489V4.2726L2.92655 4.32372L2.97768 4.37486H3.62539H4.2731L4.32422 4.32372L4.37536 4.2726V3.62489V2.97718L4.32422 2.92605L4.2731 2.87491H3.62539H2.97768L2.92655 2.92605ZM11.6763 2.92605L11.6251 2.97718V3.62489V4.2726L11.6763 4.32372L11.7274 4.37486H12.3751H13.0228L13.0739 4.32372L13.1251 4.2726V3.62489V2.97718L13.0739 2.92605L13.0228 2.87491H12.3751H11.7274L11.6763 2.92605ZM0.0513941 8.80112L0 8.85249L0.00545834 12.1916L0.0109164 15.5308L0.0672272 15.6375C0.139121 15.7738 0.286074 15.9031 0.430487 15.9571C0.542587 15.9991 0.57667 15.9995 3.84586 15.9995H7.14801L7.19913 15.9484L7.25027 15.8972V12.3746V8.85199L7.19913 8.80087L7.14801 8.74973H3.62539H0.102768L0.0513941 8.80112ZM8.80137 8.80087L8.75023 8.85199V12.3746V15.8972L8.80137 15.9484L8.85249 15.9995H9.41687H9.98125L10.0324 15.9484L10.0835 15.8972V13.3234V10.7497H10.896H11.7085V11.8443V12.939L11.7596 12.9901L11.8107 13.0413H13.8542H15.8977L15.9489 12.9901L16 12.939V10.8955V8.85199L15.9489 8.80087L15.8977 8.74973H15.3334H14.769L14.7179 8.80087L14.6667 8.85199V10.28V11.708H13.8542H13.0418V10.28V8.85199L12.9906 8.80087L12.9395 8.74973H10.896H8.85249L8.80137 8.80087ZM5.91698 12.3746V14.6662H3.62539H1.33379V12.3746V10.083H3.62539H5.91698V12.3746ZM2.92655 11.6758L2.87541 11.7269V12.3746V13.0223L2.92655 13.0734L2.97768 13.1246H3.62539H4.2731L4.32422 13.0734L4.37536 13.0223V12.3746V11.7269L4.32422 11.6758L4.2731 11.6246H3.62539H2.97768L2.92655 11.6758ZM11.7596 14.7174L11.7085 14.7685V15.3329V15.8972L11.7596 15.9484L11.8107 15.9995H12.3751H12.9395L12.9906 15.9484L13.0418 15.8972V15.3329V14.7685L12.9906 14.7174L12.9395 14.6662H12.3751H11.8107L11.7596 14.7174ZM14.7179 14.7174L14.6667 14.7685V15.3329V15.8972L14.7179 15.9484L14.769 15.9995H15.3334H15.8977L15.9489 15.9484L16 15.8972V15.3329V14.7685L15.9489 14.7174L15.8977 14.6662H15.3334H14.769L14.7179 14.7174Z"
                    fill="#018EC5"
                  />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: "600" }}
            >
              QR Codes
            </span>
          </Link>
        </li>
      </Accordion>
    </Fragment>
  );
});

VerticalNav.displayName = "VerticalNav";
export default VerticalNav;
