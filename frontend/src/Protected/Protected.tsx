import authFn from "../auth/auth";
import { Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
export const ProtecedRoute = (props: any) => {
  let path = props.path;
  if (!authFn.getAuth()) {
    path = "/login";
    return <Navigate to={path} />;
  } else {
    return props.el();
  }
};
