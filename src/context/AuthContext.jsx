import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Seed data
const SEED_USERS = [
  { id: "admin1", name: "Admin User", email: "admin@lexconsult.com", password: "admin123", role: "admin", phone: "08000000000", avatar: "A" },
  { id: "user1", name: "Chukwuemeka Obi", email: "emeka@gmail.com", password: "user123", role: "client", phone: "08012345678", avatar: "C" },
];

function getUsers() {
  const stored = localStorage.getItem("lc_users");
  if (!stored) {
    localStorage.setItem("lc_users", JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
  return JSON.parse(stored);
}

function saveUsers(users) {
  localStorage.setItem("lc_users", JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("lc_current_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password.");
    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem("lc_current_user", JSON.stringify(safe));
    return safe;
  };

  const register = ({ name, email, password, phone }) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) throw new Error("Email already registered.");
    const newUser = {
      id: "user_" + Date.now(),
      name, email, password, phone,
      role: "client",
      avatar: name[0].toUpperCase(),
    };
    saveUsers([...users, newUser]);
    const { password: _, ...safe } = newUser;
    setUser(safe);
    localStorage.setItem("lc_current_user", JSON.stringify(safe));
    return safe;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lc_current_user");
  };

  const updateProfile = (updates) => {
    const users = getUsers();
    const updated = users.map(u => u.id === user.id ? { ...u, ...updates } : u);
    saveUsers(updated);
    const { password: _, ...safe } = updated.find(u => u.id === user.id);
    setUser(safe);
    localStorage.setItem("lc_current_user", JSON.stringify(safe));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
