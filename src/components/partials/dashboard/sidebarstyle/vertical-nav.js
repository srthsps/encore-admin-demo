import { useState, useContext, memo, Fragment, useEffect } from 'react'
//Router
import { Link, useLocation, useParams } from 'react-router-dom'

//React-bootstrap
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Nav,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey }),
  )

  const isCurrentEventKey = activeEventKey === eventKey

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? 'true' : 'false'}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey)
      }}
    >
      {children}
    </Link>
  )
}

const VerticalNav = memo(() => {
  const dispatch = useDispatch()

  const [userID, setUserID] = useState(localStorage.getItem('userID'))

  const { t } = useTranslation()
  const { active_tab, propertyID } = useParams()
  const [activeMenu, setActiveMenu] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [show1, setShow1] = useState(false)

  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)
  const [active, setActive] = useState('')

  //location
  let location = useLocation()

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
            location.pathname === `/product`
              ? { background: '#eff8fb', borderRadius: '6px' }
              : {}
          }
          className={`${
            location.pathname === `/product` ? 'active' : ''
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname === `/product` ? 'active' : ''
            } nav-link `}
            aria-current="page"
            to="/product"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Product</Tooltip>}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#22D3EE"
                  class="bi bi-basket3-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: '600' }}
            >
              Product
            </span>
          </Link>
        </li>
        {/* //brand */}
        <li
          style={
            location.pathname.includes('/brand-list')
              ? { background: '#eff8fb', borderRadius: '6px' }
              : {}
          }
          className={`${
            location.pathname.includes('/brand-list') ? 'active' : ''
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname.includes('/brand-list') ? 'active' : ''
            } nav-link `}
            aria-current="page"
            to="/brand-list"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Brand list</Tooltip>}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#22D3EE"
                  class="bi bi-file-earmark-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: '600' }}
            >
              Brand list
            </span>
          </Link>
        </li>

        {/* //category */}
        <li
          style={
            location.pathname.includes('/category')
              ? { background: '#eff8fb', borderRadius: '6px' }
              : {}
          }
          className={`${
            location.pathname.includes('/category') ? 'active' : ''
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname.includes('/category') ? 'active' : ''
            } nav-link `}
            aria-current="page"
            to="/category"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Category</Tooltip>}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#22D3EE"
                  class="bi bi-bookmarks-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" />
                  <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: '600' }}
            >
              Category
            </span>
          </Link>
        </li>

        {/* //order */}
        <li
          style={
            location.pathname.includes('/carts')
              ? { background: '#eff8fb', borderRadius: '6px' }
              : {}
          }
          className={`${
            location.pathname.includes('/carts') ? 'active' : ''
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname.includes('/carts') ? 'active' : ''
            } nav-link `}
            aria-current="page"
            to="/carts"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Orders</Tooltip>}
            >
              <i className="icon">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="#22D3EE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 0.824184V1.64833L0.810694 1.65841L1.62139 1.66853L3.04034 4.66012C3.82076 6.30549 4.4593 7.66914 4.4593 7.69038C4.4593 7.71167 4.21509 8.17124 3.91658 8.71164C3.61811 9.25208 3.34699 9.7586 3.31412 9.83726C3.01546 10.5521 3.35703 11.4734 4.05156 11.8263C4.46773 12.0377 4.23124 12.0289 9.52754 12.0294L14.4272 12.0298V11.2242V10.4185H9.76175C5.10751 10.4185 5.09616 10.4183 5.01949 10.3416C4.91932 10.2415 4.92374 10.2293 5.33576 9.47429L5.67718 8.84864L8.80618 8.83673C11.6641 8.82582 11.9519 8.81915 12.1281 8.75946C12.4035 8.66619 12.7535 8.42025 12.903 8.21505C13.0282 8.04327 15.796 3.05301 15.9313 2.75529C16.1266 2.32543 15.8878 1.7887 15.4419 1.65508C15.3375 1.62382 13.697 1.61232 9.34138 1.61232H3.38371L3.0092 0.816015L2.6347 0.0197109L1.31733 0.00985545L0 0V0.824184ZM4.36562 12.8693C3.92572 13.0088 3.55609 13.331 3.36303 13.7433C3.13586 14.2285 3.18683 14.8754 3.4865 15.311C4.19856 16.3459 5.73226 16.2114 6.27087 15.0669C6.58208 14.4055 6.35151 13.5522 5.74388 13.1171C5.36716 12.8473 4.77224 12.7404 4.36562 12.8693ZM12.3039 12.8921C12.0532 12.9738 11.7446 13.1851 11.5746 13.3913C10.9096 14.1982 11.181 15.4113 12.1268 15.8585C12.7435 16.1501 13.4066 16.041 13.9046 15.5661C14.7173 14.7908 14.5127 13.4778 13.5013 12.9779C13.2477 12.8526 13.1851 12.8375 12.8771 12.8277C12.6133 12.8193 12.4818 12.8341 12.3039 12.8921Z"
                    fill="#22D3EE"
                  />
                </svg>
              </i>
            </OverlayTrigger>
            <span
              className="item-name text-black"
              style={{ fontWeight: '600' }}
            >
              Orders
            </span>
          </Link>
        </li>
      </Accordion>
    </Fragment>
  )
})

VerticalNav.displayName = 'VerticalNav'
export default VerticalNav
