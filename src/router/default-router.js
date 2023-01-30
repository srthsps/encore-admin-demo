import { memo, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Loading1 from "../components/custom/loading1";
import BrandList from "../views/Products/Brand/BrandList";
// import ProductList from "../views/Products/Index";

//Dashboard
// const Index = lazy(() => import("../views/dashboard/index"));

//Product
const ProductDashboard = lazy(() => import("../views/Products/Dashboard"));

//Barcode
const OrderDashboard = lazy(() => import("../views/Order/Dashboard"));
//brand
const BrandDashboard = lazy(() => import("../views/Order/Dashboard"));

//Profile
const UserProfile = lazy(() => import("../views/Profile/ProfileDashboard"));

const DefaultRouter = memo(() => {
  return (
    <TransitionGroup>
      <CSSTransition classNames="fadein" timeout={200}>
        <Suspense fallback={<Loading1 />}>
          <Switch>
            {/* <Route path="/dashboard" exact component={Index} /> */}
     
            <Route  path="/product:active_tab?"  component={ProductDashboard  } />

            <Route exact path="/order/:active_tab?" component={OrderDashboard} />
            <Route exact path="/brand/:active_tab?" component={BrandDashboard} />

            <Route path="/staff-profile" component={UserProfile} />
          </Switch>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  );
});

DefaultRouter.displayName = "DefaultRouter";
export default DefaultRouter;
