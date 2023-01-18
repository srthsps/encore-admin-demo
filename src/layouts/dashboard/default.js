import { memo, Fragment } from "react";

// header
import Headerpro from "../../components/partials/pro/headerstyle/header-pro";

//sidebar
import Sidebar from "../../components/partials/dashboard/sidebarstyle/sidebar";

//footer
import Footer from "../../components/partials/dashboard/footerstyle/footer";

//default
import DefaultRouter from "../../router/default-router";

//seetingoffCanvas
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

import Loader from "../../components/Loader";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
const Default = memo((props) => {
  const history = useHistory()
  const pageLayout = useSelector(SettingSelector.page_layout);
  const appName = useSelector(SettingSelector.app_name);

  var subHeader = "";
  var commanclass = "";

  return (
    <Fragment>
      <Loader />
      <Sidebar app_name={appName} />
      <main className={`main-content`} style={{backgroundColor:"#EFF8FB"}}>
        <div className={`${commanclass} position-relative `}>
          <Headerpro />
          {subHeader}
        </div>
        <div className={` ${pageLayout} content-inner pb-0 `}>
          <DefaultRouter />
        </div>
        <Footer />
      </main>
      <SettingOffCanvas />
    </Fragment>
  );
});

Default.displayName = "Default";
export default Default;
