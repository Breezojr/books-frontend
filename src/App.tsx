import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './providers/UserProvider';
import { routes } from './routes';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Router>
    </UserProvider>


  );
}

export default App;
