import { memo, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Loading1 from "../components/custom/loading1";

//Dashboard
const Index = lazy(() => import("../views/dashboard/index"));

//Staffs
const Staffs = lazy(() => import("../views/Staffs/UserList"));

//Barcode
const BarcodeDashboard = lazy(() => import("../views/Barcode/Dashboard"));

//Profile
const UserProfile = lazy(() => import("../views/Profile/ProfileDashboard"));

const DefaultRouter = memo(() => {
  return (
    <TransitionGroup>
      <CSSTransition classNames="fadein" timeout={200}>
        <Suspense fallback={<Loading1 />}>
          <Switch>
            {/* <Route path="/dashboard" exact component={Index} /> */}
     
            <Route exact path="/product " component={Staffs} />

            <Route exact path="/barcode/:active_tab?" component={BarcodeDashboard} />

            <Route path="/staff-profile" component={UserProfile} />
          </Switch>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  );
});

DefaultRouter.displayName = "DefaultRouter";
export default DefaultRouter;
