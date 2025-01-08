import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: chưa xác định, true/false: đã xác định

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      setIsAuthenticated(true); // Nếu có token, xác thực thành công
    } else {
      setIsAuthenticated(false); // Nếu không có token, xác thực thất bại
    }
  }, []);

  if (isAuthenticated === null) {
    // Chờ kiểm tra xác thực trước khi quyết định render
    return <div>Loading...</div>;
  }

  // Điều hướng đến login nếu không xác thực
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
