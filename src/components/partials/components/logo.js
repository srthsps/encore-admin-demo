import { memo, Fragment } from "react";

const Logo = memo((props) => {
  return (
    <Fragment>
      <div className="logo-main">
        <div className="logo-normal ms-3">
          <h1>Encore</h1>
        </div>
        <div className="logo-mini">
          <h1>EN </h1>
        </div>
      </div>
    </Fragment>
  );
});

Logo.displayName = "Logo";
export default Logo;
