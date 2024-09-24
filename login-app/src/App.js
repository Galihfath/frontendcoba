import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Tambahkan import untuk BrowserRouter
import Login from './Login';

function App() {
  return (
    <BrowserRouter> {/* Bungkus aplikasi dengan BrowserRouter */}
      <div className="App">
        <Login />
      </div>
    </BrowserRouter>
  );
}

export default App;
