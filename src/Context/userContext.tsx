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
  const Logout = () => {
    localStorage.setItem("isUserLoggedIn", "false");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_check");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserContext);
