import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    console.log('Login attempt:', { email: trimmedEmail, password: trimmedPassword });

    // Standard admin credentials
    if (trimmedEmail === 'admin@twoelephants.com' && trimmedPassword === 'admin123') {
      const adminData = { email: trimmedEmail, name: 'Administrator', role: 'admin' };
      setAdmin(adminData);
      localStorage.setItem('admin', JSON.stringify(adminData));
      return { success: true };
    }
    
    // User requested alternate credentials
    if ((trimmedEmail === 'd1234@gmail.com' || trimmedEmail === 'd123@gmail.com') && trimmedPassword === 'admin') {
      const adminData = { email: trimmedEmail, name: 'Support Admin', role: 'admin' };
      setAdmin(adminData);
      localStorage.setItem('admin', JSON.stringify(adminData));
      return { success: true };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
