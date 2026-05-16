import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "Email already registered" };

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name,
      email,
      password
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });

    return { success: true };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    });

    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
