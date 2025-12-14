import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return currentUser?.safeUser ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default PrivateRoute;
