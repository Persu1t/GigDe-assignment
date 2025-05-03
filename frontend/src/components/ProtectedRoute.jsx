import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.authReducer);

  if (user.currentUser === null) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
