import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on mount
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await getMe();
      setUser(data);
    } catch {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await registerUser({ username, email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update bookmarks in context after toggle
  const updateBookmarks = (bookmarks) => {
    setUser((prev) => ({ ...prev, bookmarks }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateBookmarks }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
