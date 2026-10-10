import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export const AuthInitializer = ({ children }) => {
  const { isAuthenticated, fetchMenu } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch menu on app initialization
      fetchMenu().catch((error) => {
        console.error("Failed to fetch menu:", error);
      });
    }
  }, [isAuthenticated, fetchMenu]);

  return children;
};

export default AuthInitializer;
