import { useContext } from "react";
import { Navigate } from "react-router";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoggedIn && anonymous) {
    return <Navigate to="/" replace />;
  }

  return children;
}
