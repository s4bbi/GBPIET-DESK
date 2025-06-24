import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    } else {
      setChecked(true);
    }
  }, [navigate]);

  if (!checked) return null;
  return children;
};

export default AuthRedirect;
