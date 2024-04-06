// App.jsx

import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import { router } from './Router/index.jsx';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
