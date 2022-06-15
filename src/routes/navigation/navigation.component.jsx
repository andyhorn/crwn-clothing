import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";
import { signOutUser } from "../../services/firebase.service";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              Sign out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
