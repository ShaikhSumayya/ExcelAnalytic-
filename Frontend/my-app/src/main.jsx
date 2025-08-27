// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import React from 'react';

// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom';
// import './index.css'; // Tailwind CSS or your custom CSS

// createRoot(document.getElementById('root')).render(
//  <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';

import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // ✅ Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
