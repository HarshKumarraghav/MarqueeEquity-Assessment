import { createContext, useContext, useEffect, useState } from "react";
interface User {
  name: string;
  email: string;
  password: string;
}

interface UserContextProps {
  user: User | null;
  Logout: () => void;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  Logout: () => {},
  setUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (isUserLoggedIn === "true") {
      const user = localStorage.getItem("user_check");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, []);
  const Logout = () => {
    localStorage.setItem("isUserLoggedIn", "false");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserContext);
