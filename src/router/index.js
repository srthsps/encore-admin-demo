import React, { memo, lazy, Suspense } from "react";

//router
import { Switch, Redirect } from "react-router";

import Loader from "../components/Loader";
//layoutpages
import Default from "../layouts/dashboard/default";
import Simple from "../layouts/dashboard/simple";
import Authmiddleware from "../router/Authmiddleware";

import ScrollTop from "../components/ScrollTop";

const userRoutes = [
  { path: "/dashboard", component: Default },
  { path: "/", component: () => <Redirect to="/dashboard" /> },
  { path: "/staff", component: Default },
  { path: "/barcode/:active_tab?", component: Default },

  {
    path: "/errors/error404",
    component: Simple,
  },
];

const authRoutes = [
  { path: "/auth", component: Simple },
  { path: "/index", component: Simple },
];

const IndexRouters = memo(() => {
  return (
    <ScrollTop>
      <Switch>
        {authRoutes.map((route, idx) => (
          <Authmiddleware
            path={route.path}
            component={route.component}
            key={idx}
            isAuthProtected={false}
          />
        ))}
        {userRoutes.map((route, idx) => (
          <Authmiddleware
            path={route.path}
            component={route.component}
            key={idx}
            isAuthProtected={true}
            exact
          />
        ))}
      </Switch>
    </ScrollTop>
  );
});

IndexRouters.displayName = "IndexRouters";
export default IndexRouters;
