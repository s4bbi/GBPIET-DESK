import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage.js';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // Flag to avoid early rendering

  useEffect(() => {
    const token = storage.getToken();
    const user = storage.getUser();

    if (token && user) {
      // ✅ Redirect if already authenticated
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      // ✅ Render children (login/signup) if not authenticated
      setChecked(true);
    }
  }, [navigate]);

  // Avoid rendering login/signup page before auth check completes
  if (!checked) return null;

  return children;
};

export default AuthRedirect;
