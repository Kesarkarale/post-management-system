import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  function register(name, email, password) {
    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    const exists = users.find((u) => u.email === cleanEmail);

    if (exists) {
      return {
        success: false,
        message: "This email is already registered. Please login."
      };
    }

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: name.trim(),
      email: cleanEmail,
      password
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    return {
      success: true,
      message: "Registration successful. Please login."
    };
  }

  function login(email, password) {
    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    const foundUser = users.find((u) => u.email === cleanEmail);

    if (!foundUser || foundUser.password !== password) {
      return {
        success: false,
        message: "Invalid email or password"
      };
    }

    const loggedUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    };

    setUser(loggedUser);

    return {
      success: true,
      message: "Login successful"
    };
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
