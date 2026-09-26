import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  logout as logoutAction,
  switchRole as switchRoleAction,
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectActiveRole,
} from "@/store/slices/authSlice";
import { useLoginMutation, useRegisterMutation, useLogoutApiMutation } from "@/store/api/apiSlice";
import { initSocket, disconnectSocket } from "@/services/socket";
import toast from "react-hot-toast";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const reduxUser = useSelector(selectCurrentUser);
  const reduxToken = useSelector(selectCurrentToken);
  const reduxIsAuthenticated = useSelector(selectIsAuthenticated);
  const reduxActiveRole = useSelector(selectActiveRole);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegistering }] = useRegisterMutation();
  const [logoutApiMutation] = useLogoutApiMutation();

  const [user, setUser] = useState(reduxUser);
  const [role, setRole] = useState(reduxActiveRole || "INVESTIGATOR");

  useEffect(() => {
    setUser(reduxUser);
    if (reduxUser?.role) {
      setRole(reduxActiveRole || reduxUser.role);
    }
  }, [reduxUser, reduxActiveRole]);

  // Manage real-time telemetry socket connection on authentication
  useEffect(() => {
    if (reduxToken && reduxIsAuthenticated) {
      initSocket(reduxToken);
    } else {
      disconnectSocket();
    }
  }, [reduxToken, reduxIsAuthenticated]);

  const login = async (emailOrCredentials, password) => {
    let email = "";
    let pass = "";

    if (typeof emailOrCredentials === "string") {
      email = emailOrCredentials;
      pass = password;
    } else if (emailOrCredentials && typeof emailOrCredentials === "object") {
      email = emailOrCredentials.email || emailOrCredentials.badgeNumber;
      pass = emailOrCredentials.password || password;
    }

    try {
      const response = await loginMutation({ email, password: pass }).unwrap();
      if (response.success && response.data) {
        dispatch(
          setCredentials({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        toast.success(`Access Granted: ${response.data.user.name} (${response.data.user.role})`);
        return true;
      }
    } catch (err) {
      const errorMsg = err?.data?.message || err?.error || "Authentication failed. Invalid clearance credentials.";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerMutation(userData).unwrap();
      if (response.success && response.data) {
        dispatch(
          setCredentials({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        toast.success(`Dossier Registered: ${response.data.user.name}`);
        return true;
      }
    } catch (err) {
      const errorMsg = err?.data?.message || err?.error || "Registration rejected. Please verify operational data.";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const logout = async () => {
    try {
      await logoutApiMutation().unwrap();
    } catch {}
    dispatch(logoutAction());
    disconnectSocket();
    toast.success("Operational session terminated.");
  };

  const switchRole = (newRole) => {
    const formatted = newRole.toUpperCase();
    setRole(formatted);
    dispatch(switchRoleAction(formatted));
    toast(`Clearance context switched to ${formatted}`, { icon: "🛡️" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: reduxToken,
        isAuthenticated: reduxIsAuthenticated,
        role: role.toUpperCase(),
        activeRole: role.toUpperCase(),
        isLoggingIn,
        isRegistering,
        login,
        register,
        logout,
        switchRole,
        setRole: switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
