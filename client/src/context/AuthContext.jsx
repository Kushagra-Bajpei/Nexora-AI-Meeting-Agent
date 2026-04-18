import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Simple mock user store in localStorage
const USERS_KEY = "meetmind_users";
const SESSION_KEY = "meetmind_session";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    setLoading(false);

    if (!found) {
      throw new Error("Invalid email or password.");
    }

    const session = { id: found.id, name: found.name, email: found.email, avatar: found.name[0].toUpperCase() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const users = getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      setLoading(false);
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);

    const session = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.name[0].toUpperCase() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    setLoading(false);
    return session;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
