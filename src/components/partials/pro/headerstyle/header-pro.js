import { useState, useEffect, memo } from "react";

//react-bootstrap
import { Navbar, Container, Nav, Dropdown, Form } from "react-bootstrap";

import { useHistory } from "react-router-dom";

//router
import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

//component
import CustomToggle from "../../../dropdowns";
import Card from "../../../bootstrap/card";

//img

// logo
import Logo from "../../components/logo";

// Redux Selector / Action
import { useSelector, useDispatch } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";

import { theme_scheme_direction } from "../../../../store/setting/reducers";

import RadioBtn from "../../../setting/elements/radio-btn";

const Headerpro = memo((props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const themeFontSize = useSelector(SettingSelector.theme_font_size);
  const headerNavbar = useSelector(SettingSelector.header_navbar);
  const mode = useSelector(SettingSelector.theme_scheme_direction);

  const [lang, setLang] = useState(mode === "rtl" ? "ab" : "en");

  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    if (lang === "en") {
      dispatch(theme_scheme_direction("ltr"));
      changeLanguage("en");
    } else if (lang === "ab") {
      dispatch(theme_scheme_direction("rtl"));
      changeLanguage("ab");
    }
  }, [lang]);

  useEffect(() => {
    if (headerNavbar === "navs-sticky" || headerNavbar === "nav-glass") {
      window.onscroll = () => {
        if (document.documentElement.scrollTop > 50) {
          document.getElementsByTagName("nav")[0].classList.add("menu-sticky");
        } else {
          document
            .getElementsByTagName("nav")[0]
            .classList.remove("menu-sticky");
        }
      };
    }

    document.getElementsByTagName("html")[0].classList.add(themeFontSize);

    //offcanvase code
    const result = window.matchMedia("(max-width: 1200px)");
    window.addEventListener("resize", () => {
      if (result.matches === true) {
        if (show1 === true) {
          document.documentElement.style.setProperty("overflow", "hidden");
        } else {
          document.documentElement.style.removeProperty("overflow");
        }
      } else {
        document.documentElement.style.removeProperty("overflow");
      }
    });
    if (window.innerWidth <= "1200") {
      if (show1 === true) {
        document.documentElement.style.setProperty("overflow", "hidden");
      } else {
        document.documentElement.style.removeProperty("overflow");
      }
    } else {
      document.documentElement.style.removeProperty("overflow");
    }
  });

  const logout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    history.push("/auth/sign-in");
  };

  const [show, setShow] = useState(true);

  const [show1, setShow1] = useState(false);

  //collapse
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [open10, setOpen10] = useState(false);
  const [open11, setOpen11] = useState(false);
  const [open12, setOpen12] = useState(false);
  const [open13, setOpen13] = useState(false);
  const [open14, setOpen14] = useState(false);
  const [open15, setOpen15] = useState(false);
  const [open16, setOpen16] = useState(false);
  const [open17, setOpen17] = useState(false);

  //fullscreen
  const fullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  let location = useLocation();

  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow3(false);
  const handleShow = () => setShow3(true);

  const [show4, setShow4] = useState(false);

  const handleClose1 = () => setShow4(false);
  const handleShow1 = () => setShow4(true);

  return (
    <Navbar expand="xl" className={`nav iq-navbar ${headerNavbar} `}>
      <Container fluid className="navbar-inner">
        <Link to="/dashboard" className="navbar-brand">
          <Logo color={true} />
        </Link>
        <div
          className="sidebar-toggle"
          data-toggle="sidebar"
          data-active="true"
          onClick={minisidebar}
        >
          <i className="icon d-flex">
            <svg width="20px" viewBox="0 0 24 24" className="icon-20">
              <path
                fill="currentColor"
                d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              />
            </svg>
          </i>
        </div>
        <div className="d-flex align-items-center justify-content-between product-offcanvas">
          <div className="breadcrumb-title border-end me-3 pe-3 d-none d-xl-block">
            <small className="mb-0 text-capitalize">{`${
              location.pathname === "/dashboard"
                ? "home"
                : "" || location.pathname.includes("/fitters")
                ? "Fitters"
                : "" || location.pathname.includes("/shops")
                ? "Shops"
                : "" || location.pathname.includes("/products")
                ? "Products"
                : "" || location.pathname.includes("/orders")
                ? "Orders"
                : "" || location.pathname === "/points"
                ? "Points"
                : "" || location.pathname === "/staff"
                ? "Staff"
                : "" || location.pathname === "/barcode"
                ? "Barcode"
                : location.pathname.includes("/settings")
                ? "Settings"
                : ""
            }`}</small>
          </div>
          <div
            className={`offcanvas-backdrop fade  ${
              show1 === true ? "show d-block" : "d-none"
            }`}
            onClick={() => setShow1(false)}
          ></div>
        </div>
        <div
          className={` navbar-collapse ${
            show1 === true ? "collapse show" : "collapse"
          }`}
          id="navbarSupportedContent"
        >
          <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
            <li className="nav-item dropdown me-0 me-xl-3">
              <div
                className="d-flex align-items-center mr-2 iq-font-style"
                role="group"
                aria-label="First group"
              >
                <RadioBtn
                  btnName="theme_font_size"
                  labelclassName="  border-0 btn-icon btn-sm"
                  id="font-size-sm"
                  defaultChecked={themeFontSize}
                  value="theme-fs-sm"
                >
                  <span className="mb-0 h6" style={{ color: "inherit" }}>
                    A
                  </span>
                </RadioBtn>
                <RadioBtn
                  btnName="theme_font_size"
                  labelclassName="  border-0 btn-icon"
                  id="theme-fs-md"
                  defaultChecked={themeFontSize}
                  value="theme-fs-md"
                >
                  <span className="mb-0 h4" style={{ color: "inherit" }}>
                    A
                  </span>
                </RadioBtn>
                <RadioBtn
                  btnName="theme_font_size"
                  labelclassName="  border-0 btn-icon"
                  id="theme-fs-lg"
                  defaultChecked={themeFontSize}
                  value="theme-fs-lg"
                >
                  <span className="mb-0 h2" style={{ color: "inherit" }}>
                    A
                  </span>
                </RadioBtn>
              </div>
            </li>
            <Dropdown
              as="li"
              className="nav-item  iq-responsive-menu border-end d-block d-xl-none"
            >
              <Dropdown.Toggle as={CustomToggle} className="btn btn-sm bg-body">
                <svg
                  className="icon-20"
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="11.7669"
                    cy="11.7666"
                    r="8.98856"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></circle>
                  <path
                    d="M18.0186 18.4851L21.5426 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu
                variant="end"
                aria-labelledby="navbarDropdown-search-11"
                style={{ width: "25rem" }}
              >
                <div className="px-3 py-0">
                  <div className="form-group input-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <span className="input-group-text">
                      <svg
                        className="icon-20"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.7669"
                          cy="11.7666"
                          r="8.98856"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></circle>
                        <path
                          d="M18.0186 18.4851L21.5426 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
           
            <Nav.Item
              className=" iq-full-screen d-none d-xl-block"
              onClick={() => setShow(!show)}
            >
              <Nav.Link id="btnFullscreen" onClick={fullscreen}>
                <div className="btn btn-primary btn-icon btn-sm rounded-pill">
                  <span className="btn-inner">
                    <svg
                      className={`normal-screen ${
                        show === true ? "" : "d-none"
                      } icon-24`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5528 5.99656L13.8595 10.8961"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M14.8016 5.97618L18.5524 5.99629L18.5176 9.96906"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M5.8574 18.896L10.5507 13.9964"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M9.60852 18.9164L5.85775 18.8963L5.89258 14.9235"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <svg
                      className={`full-normal-screen ${
                        show === false ? "" : "d-none"
                      } icon-24`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7542 10.1932L18.1867 5.79319"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.2976 10.212L13.7547 10.1934L13.7871 6.62518"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M10.4224 13.5726L5.82149 18.1398"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.74391 13.5535L10.4209 13.5723L10.3867 17.2755"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Dropdown as="li" className="nav-item iq-tour ps-3 ps-lg-0">
              <Dropdown.Toggle
                as={CustomToggle}
                variant="py-0  d-flex align-items-center nav-link"
              >
                <div className="d-flex flex-row justify-content-center  btn btn-primary btn-icon btn-sm rounded-pill">
                  <span className="btn-inner">
                    <svg
                      width="32"
                      className="icon-32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu variant="end mt-3">
                
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </Container>
    </Navbar>
  );
});

Headerpro.displayName = "Headerpro";
export default Headerpro;
