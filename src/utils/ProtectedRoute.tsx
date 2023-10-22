import { Navigate } from "react-router-dom";
import { authenticateFirebase } from "../firebase.config";
import { ReactNode } from "react";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = authenticateFirebase();
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
