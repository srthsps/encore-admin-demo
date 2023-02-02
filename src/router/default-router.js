import { memo, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Loading1 from "../components/custom/loading1";
// import ProductList from "../views/Products/Index";

//Dashboard
// const Index = lazy(() => import("../views/dashboard/index"));

//Product
const ProductList = lazy(() => import("../views/Products/Index.js"));
const ProductDetails = lazy(() => import("../views/Products/Dashboard"));

// orders
const Carts = lazy(() => import("../views/Order/Index"));
const Orders = lazy(() => import("../views/Order/Orders"));
const OrderDetails = lazy(() => import("../views/Order/OrderDetails"));

// brand 
const brand = lazy(() => import("../views/Products/Brand/BrandList"));
// category 
const category = lazy(() => import("../views/Products/Category/Category"));

//Profile
const UserProfile = lazy(() => import("../views/Profile/ProfileDashboard"));

const DefaultRouter = memo(() => {
  return (
    <TransitionGroup>
      <CSSTransition classNames="fadein" timeout={200}>
        <Suspense fallback={<Loading1 />}>
          <Switch>
            {/* <Route path="/dashboard" exact component={Index} /> */}

            <Route exact path="/product" component={ProductList} />
            <Route exact path="/products/:id/:active_tab?" component={ProductDetails} />

            <Route exact path="/carts" component={Carts} />
            <Route exact path="/category" component={category} />
            <Route exact path="/carts/:id/orders" component={Orders} />
            <Route path="/carts/:id/orders/:id/details/:slId" component={OrderDetails} />

            <Route exact path="/brand-list" component={brand} />


            <Route path="/staff-profile" component={UserProfile} />
          </Switch>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  );
});

DefaultRouter.displayName = "DefaultRouter";
export default DefaultRouter;
