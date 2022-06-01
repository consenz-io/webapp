import authFn from "../auth/auth";
import { Navigate } from "react-router-dom";
export const ProtecedRoute = (props: any) => {
  let path = props.path;
  if (!authFn.getAuth()) {
    path = "/login";
    return <Navigate to={path} />;
  } else {
    return props.el();
  }
};
