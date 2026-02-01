import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Profile from './Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Profile />
  </StrictMode>
);
