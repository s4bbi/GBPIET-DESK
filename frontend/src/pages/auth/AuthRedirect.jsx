import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../../utils/storage.js';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = storage.getToken();
    const user = storage.getUser();

    if (token && user) {
      const currentPath = location.pathname;
      if (user.role === 'admin' && currentPath !== '/admin/dashboard') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'student' && currentPath !== '/dashboard') {
        navigate('/dashboard', { replace: true });
      } else {
        setChecked(true);
      }
    } else {
      setChecked(true);
    }
  }, [navigate, location]);

  if (!checked) return null;

  return children;
};

export default AuthRedirect;
