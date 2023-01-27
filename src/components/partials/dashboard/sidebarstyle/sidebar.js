import { useEffect, memo, Fragment, useState } from 'react'

//router
import { Link } from 'react-router-dom'

//components
import VerticalNav from './vertical-nav'
import Logo from '../../components/logo'

import { useDispatch } from 'react-redux'

//scrollbar
import Scrollbar from 'smooth-scrollbar'

// Import selectors & action from setting store
import * as SettingSelector from '../../../../store/setting/selectors'

import { sidebar_type } from '../../../../store/setting/reducers'

// Redux Selector / Action
import { useSelector } from 'react-redux'

const Sidebar = memo((props) => {
  const dispatch = useDispatch()

  const sidebarColor = useSelector(SettingSelector.sidebar_color)
  const sidebarType = useSelector(SettingSelector.sidebar_type) // array
  const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style)

  useEffect(() => {
    if (window.innerWidth < 1025) {
      document
        .getElementsByTagName('ASIDE')[0]
        ?.classList.toggle('sidebar-mini')
    }
  }, [window?.innerWidth])

  const minisidebar = () => {
    document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    const side = document
      .getElementsByTagName('ASIDE')[0]
      .classList.contains('sidebar-mini')
    if (side) {
      dispatch(sidebar_type('sidebar-mini'))
    } else {
      dispatch(sidebar_type(''))
    }
  }

  // const resizePlugins = () => {
  //     // For sidebar-mini & responsive

  //   }

  const [sideType, setSideType] = useState(false)

  useEffect(() => {
    Scrollbar.init(document.querySelector('#my-scrollbar'))

    window.addEventListener('resize', () => {
      const tabs = document.querySelectorAll('.nav')
      const sidebarResponsive = document.querySelector(
        '[data-sidebar="responsive"]',
      )
      if (window.innerWidth < 1025) {
        Array.from(tabs, (elem) => {
          if (
            !elem.classList.contains('flex-column') &&
            elem.classList.contains('nav-tabs') &&
            elem.classList.contains('nav-pills')
          ) {
            elem.classList.add('flex-column', 'on-resize')
          }
          return elem.classList.add('flex-column', 'on-resize')
        })
        if (sidebarResponsive !== null) {
          if (!sidebarResponsive.classList.contains('sidebar-mini')) {
            sidebarResponsive.classList.add('sidebar-mini', 'on-resize')
          }
        }
      } else {
        Array.from(tabs, (elem) => {
          if (elem.classList.contains('on-resize')) {
            elem.classList.remove('flex-column', 'on-resize')
          }
          return elem.classList.remove('flex-column', 'on-resize')
        })
        if (sidebarResponsive !== null) {
          if (
            sidebarResponsive.classList.contains('sidebar-mini') &&
            sidebarResponsive.classList.contains('on-resize')
          ) {
            sidebarResponsive.classList.remove('sidebar-mini', 'on-resize')
          }
        }
      }
    })
  })

  return (
    <Fragment>
      <aside
        className={`${sidebarColor} ${sidebarType} ${sidebarMenuStyle} sidebar sidebar-default  `}
        data-sidebar="responsive"
      >
        <div className="sidebar-header ps-0">
          <Link to="/product/:active_tab?" className="navbar-brand">
            <Logo />
          </Link>

          <div
            className="sidebar-toggle"
            data-toggle="sidebar"
            data-active="true"
            onClick={minisidebar}
          >
            <i className="icon">
              <svg
                width="20"
                className="icon-20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2744L19.25 12.2744"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </i>
          </div>
        </div>
        <div
          className="pt-0 sidebar-body data-scrollbar"
          data-scroll="1"
          id="my-scrollbar"
        >
          {/* sidebar-list class to be added after replace css */}
          <div className="sidebar-list navbar-collapse mb-5 pb-5" id="sidebar">
            <VerticalNav />
          </div>
        </div>
      </aside>
    </Fragment>
  )
})

Sidebar.displayName = 'Sidebar'
export default Sidebar
