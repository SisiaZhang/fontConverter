import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './Login.less'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该调用实际的登录 API
    login({
      id: '1',
      username: username
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="用户名"
          className="form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
          className="form-input"
        />
        <button type="submit" className="login-button">登录</button>
      </form>
    </div>
  );
};

export default Login; 