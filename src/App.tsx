import React from 'react';
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';
import Login from './components/Login/Login';
import FontConverter from './components/FontConverter/FontConverter';
import History from './components/History/History';
import './App.less';

const AppContent: React.FC = () => {
  const { user } = useUser();
  
  console.log("user", user);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {!user ? (
          <div className="login-section">
            <Login />
          </div>
        ) : (
          <div className="main-content">
            <div className="font-converter">
              <FontConverter />
            </div>
            <div className="history-section">
              <History history={[]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;