import { memo, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Loading1 from "../components/custom/loading1";

// auth

const SignIn = lazy(() => import("../views/auth/sign-in"));
const SignUp = lazy(() => import("../views/auth/sign-up"));
// errors
const Error404 = lazy(() => import("../views/errors/error404"));
const Error500 = lazy(() => import("../views/errors/error500"));
const Maintenance = lazy(() => import("../views/errors/maintenance"));

const SimpleRouter = memo(() => {
  return (
    <Suspense fallback={<Loading1 />}>
      <Switch>
        {/* auth */}
       
        <Route exact path="/auth/sign-in" component={SignIn} />
        <Route exact path="/auth/sign-up" component={SignUp} />


        {/* error */}
        <Route exact path="/errors/error404" component={Error404} />
        <Route exact path="/errors/error500" component={Error500} />
        <Route exact path="/errors/maintenance" component={Maintenance} />
      </Switch>
    </Suspense>
  );
});

SimpleRouter.displayName = "SimpleRouter";
export default SimpleRouter;
