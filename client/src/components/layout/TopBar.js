import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="button">
        Sign In
      </Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button button-secondary">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <Link to="/" className="menu-title">
              burgerBONANZA
            </Link>
          </li>
          <li>
            <Link to="/orders" className="menu-link">
              View Orders
            </Link>
          </li>
          <li>
            <Link to="/orders/new" className="menu-link">
              Place Order
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
