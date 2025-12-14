import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyOrganizerRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return currentUser && currentUser.safeUser.role == "organizer" ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth"} />
  );
};

export default OnlyOrganizerRoute;
